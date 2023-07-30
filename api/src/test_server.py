import base64
import os
import unittest
from app import app

class StyleTransferTestCase(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def image_to_base64(self, image_path):
        with open(image_path, "rb") as image_file:
            # Read the image file in binary mode
            image_data = image_file.read()
            # Encode the binary data in base64
            image_base64 = base64.b64encode(image_data).decode('utf-8')
            return image_base64
            
    def get_filename_from_path(self, file_path):
        return os.path.basename(file_path)

    def test_style_transfer_success(self):
        # Prepare a sample image and filename to send in the request
        filePath = "src/resources/chicago.jpg"
        image_base64 = self.image_to_base64(filePath)
        filename = self.get_filename_from_path(filePath)

        # Send a POST request to the /style_transfer endpoint
        response = self.app.post('/style_transfer', data={'image': image_base64, 'filename': filename})
        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Assert that the response contains the 'status' key with value 'success'
        data = response.get_json()
        self.assertIn('status', data)
        self.assertEqual(data['status'], 'success')
        # Assert that the response contains the 'image_base64' key with a valid base64 image
        self.assertIn('image_base64', data)
        self.assertTrue(data['image_base64'].startswith('data:image/png;base64,'))

    def test_style_transfer_missing_data(self):
        # Send a POST request with missing 'image' and 'filename' data
        response = self.app.post('/style_transfer')

        # Assert that the response status code is 400 (Bad Request)
        self.assertEqual(response.status_code, 400)

        # Assert that the response contains the 'error' key
        data = response.get_json()
        self.assertIn('error', data)

    # Add more test cases for other scenarios as needed

if __name__ == '__main__':
    unittest.main()
