# Bird or Forest

This directory represents the web server that takes in an image and classifies it. The server is built using Python and Fastapi.

## Usage

### Local Development

If you haven't done so, activate the Python virtual environment.

```bash
source venv-labbirdorforest-webservice/bin/activate
```

Install the dependencies (in the provided order). This is done to cutdown on the size of packages that are installed.

```bash
pip install -r requirements-torch.txt
pip install -r requirements.txt
```

Start the local server using:

```bash
uvicorn --reload main:app
```

Access http://localhost:8000 to make sure the server is up and running.

### Verify & Test

Make a POST call to http://localhost:8000/classify with a multipart-form body, with a key named `image` which corresponds to an image file. The server will classify that image and respond with the result.

**Bruno**: You can also use [Bruno](https://www.usebruno.com) to test. A collection of HTTP test calls is stored in the folder [httptest_birdorforest](./httptest_birdorforest/).

## Deployment

### Vercel

After trying for a day, I have come to the conclusion that fastai based Python apps cannot be deployed on Vercel. There are some ~4yr old community posts that support that. The main reason being that the size of the fastai library (which includes PyTorch, and is used to load and use the model) is bigger than what Vercel can handle.

There is a potential work around, where we save the ml model as a standard PyTorch compatible file and then use torch to load and use it. However, the code around using torch directly is not very simply for newbie like me. Hence, we're not taking that approach for now.
