# Bird or Forest

This directory represents the web server that takes in an image and classifies it. The server is built using Python and Fastapi.

### Usage

If you haven't done so, activate the Python virtual environment.
```bash
source venv-labbirdorforest-webservice/bin/activate
```

Start the server using:
```bash
uvicorn --reload main:app
```

Access http://localhost:8000 to make sure the server is up and running.

Make a POST call to http://localhost:8000/classify with a multipart-form body, with a key named `image` which corresponds to an image file. The server will classify that image and respond with the result.