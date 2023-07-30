import os
import ovmsclient
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
import base64
import io
from flask_cors import CORS
import logging


# Note: model server needs to be live

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('api.log')
    ]
)

# Define a logger for your app
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Set the directory where uploaded files will be stored
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Ensure the 'uploads' directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def array_to_base64_image(image_array):
    """
    Convert a NumPy array to a base64 encoded image.
    """
    try:
        # Ensure the image array is in uint8 format (0-255)
        if image_array.dtype != np.uint8:
            image_array = np.clip(image_array, 0, 255).astype(np.uint8)

        # Create a PIL image from the NumPy array
        pil_image = Image.fromarray(image_array)

        # Create a BytesIO object to simulate a file-like object
        image_io = io.BytesIO()

        # Save the PIL image to the BytesIO object in PNG format
        pil_image.save(image_io, format='PNG')

        # Encode the image data in base64
        image_base64 = base64.b64encode(image_io.getvalue()).decode('utf-8')

        return image_base64
    except Exception as e:
        # Handle any potential exceptions, e.g., invalid image array format
        print(f"Error converting array to base64 image: {str(e)}")
        return None

def save_image(image, file_path):
    try:
        # Save the image to the specified file path
        image.save(file_path)
        logger.info(f"Image saved successfully to {file_path}")
    except Exception as e:
        logger.info(f"Error saving the image: {e}")

@app.route('/style_transfer', methods=['POST'])
def style_transfer():
    """
    Handle the style transfer request.
    """
    logger.info("Start of style transfer (post) endpoint.")

    try:
        # Check if the 'image' key exists in the files dictionary
        if 'image' not in request.form or 'filename' not in request.form:
            return jsonify({'error': 'No file part in the request.'}), 400

        logger.debug(f"Request Data: {request.form['filename']}")

        image_base64 = request.form['image']
        filename = request.form['filename']
        image = Image.open(io.BytesIO(base64.b64decode(image_base64.split(',')[-1])))
        
        # Save the uploaded file to the designated folder
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        save_image(image, file_path)

        # Send a POST request to OVMS for style transfer
        logger.info("Making ovms client connection to the server.")
        client = ovmsclient.make_grpc_client("ovms:8080")
        model_metadata = client.get_model_metadata(model_name="fast-neural-style-mosaic")
        input_name = next(iter(model_metadata["inputs"]))

        height = 224
        width = 224

        # Resize the image to the model's input shape
        logger.info("Image preprocessing.")
        image = Image.open(file_path)
        image = image.resize((width, height))
        image_array = np.array(image)
        image_array_nchw = np.transpose(image_array, (2, 0, 1))
        image_array_nchw = np.expand_dims(image_array_nchw, axis=0)
        image_array_nchw = image_array_nchw.astype(np.float32)
        inputs = {input_name: image_array_nchw}

        logger.info("Calling fast-neural-style-mosaic model for style transfer.")
        style_transferred_image = client.predict(inputs=inputs, model_name="fast-neural-style-mosaic")

        # Check if the OVMS request was successful
        if style_transferred_image is None:
            logger.error(f"Error during style transfer: {str(e)}")
            return jsonify({'error': "Style transfer failed. The output is None."}), 400

        logger.info("Style transfer successfull.")
        # Get the style transferred image from OVMS response
        style_transferred_image = np.transpose(style_transferred_image, (0, 2, 3, 1))[0]

        # Return the style transferred image to the frontend as base64
        logger.info("Converting returned image to base64 to send back to the frontend.")
        base64_image = array_to_base64_image(style_transferred_image.copy(order='C'))
        response = {
            'status': 'success',
            'image_base64': 'data:image/png;base64,' + base64_image
        }

        return jsonify(response), 200

    except Exception as e:
        # Handle the error gracefully
        logger.error(f"Error during style transfer: {str(e)}")
        return jsonify({'error': 'Style transfer failed'+str(e)}), 500

