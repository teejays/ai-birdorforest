# Bird or Forest

This directory represents the web server that takes in an image and classifies it. The server is built using Python and Fastapi.

## Usage

### Local Development

If you haven't done so, activate the Python virtual environment.
```bash
source venv-labbirdorforest-webservice/bin/activate
```

Start the local server using:
```bash
python main.py
```

Access http://localhost:8000 to make sure the server is up and running.

### Vercel Development

Assuming you have vercel setup, you can deploy the server on Vercel using:
```bash
vercel .
```

This should output a URL at which the server can be accessed.

### Verify & Test

Make a POST call to http://localhost:8000/classify (or the Vercel URL) with a multipart-form body, with a key named `image` which corresponds to an image file. The server will classify that image and respond with the result.

**Bruno**: You can also use [Bruno](https://www.usebruno.com) to test. A collection of HTTP test calls is stored in the folder [httptest_birdorforest](./httptest_birdorforest/).