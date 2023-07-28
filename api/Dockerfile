# Use the official Python image as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the Flask application to the container
COPY src/app.py app.py
COPY src/server.py server.py

# Expose the port on which the Flask app will run
EXPOSE 5000

# Set the environment variable to run the Flask app in production mode
ENV FLASK_ENV=production

# Start the Flask app
CMD ["python", "app.py"]
