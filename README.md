# Brainpool AI Technical Task: Fast Neural Style Transfer Web App

The Docker Compose file is modified with the SPA and API configurations as well.

**How to use: run the following commands:**
> docker-compose up -d
> docker run --rm -v ${PWD}/models:/models -p 9000:9000 -p 8000:8000 openvino/model_server:latest \
--model_path /models/1/ --model_name fast-neural-style-mosaic --port 9000 --rest_port 8000 --log_level DEBUG

## Required Features

Your frontend service must implement the following features:
- [✓] Image file uploading functionality and previewing.
- [✓] State responsivity during file uploading and style transference, e.g. a visual loading state.
- [✓] Styled image viewing and downloading.

Your API service must implement the following features:
- [✓] The API service must be able to communicate with the Model Server with the image input and receive an image output.
- [✓] The API service must expose a multipart/form-upload endpoint in order to accept an uploaded image.
- [✓] This RESTful endpoint must return the styled image as part of the API response.

Whether you choose to implement the following features is entirely up to you. They are considered "nice to haves":
- [✓] A logging system that logs the internal workings of the API service.
- [.] Uploading the original file from the frontend to cloud storage and downloading the original file from cloud storage to the backend.
: I have not implemented it but I can explain it here how to do it. we can use a cloud storage service like Google Cloud Storage or AWS S3. 

- [.] Uploading the styled file from the backend to cloud storage and downloading the styled file from cloud storage to the frontend.

## Programming Language

### SPA
I have used React-JS to implement the frontend (SPA). I already wrote similar code a long time ago, so instead of rewriting it, I modified the old code and integrated it.

### API
I have used Flask / Python to implement the backend.

## Development Tools

You are free to use any development tools you wish, however, we recommend that you use the following:

: I have used all of the below tools to complete this task.

- [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for communicating with the API directly over HTTP and testing its end-to-end functionality.
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for packaging the SPA client, API service, and Model Server into a single stack.
- [ChatGPT](https://chat.openai.com) and [GitHub Copilot](https://github.com/features/copilot/) for AI-enabled productivity boosts.
(Honestly, don't be afraid of using these tools since they will become key requirements of modern programming. Just know that it will be obvious if you have them, and be prepared to defend your use of them.)
