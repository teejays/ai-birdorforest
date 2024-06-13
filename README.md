# AI Bird or Forest

This project fine-tunes a neural network to classify images as either a bird or a forest. It includes a web service to deploy the trained model and provide API endpoints for image classification, as well as a React app for uploading images and receiving classification results.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/teejays/ai-birdorforest.git
    cd ai-birdorforest
    ```

### Machine Learning

2.  1. Navigate to the ml directory (assuming you're currently in the repo root).

    ```bash
    cd ml
    ```

    2. Create a virtual environment (if not aready created)

    ```bash
    python3 -m venv venv-labbirdorforest-ml
    ```

    3. Follow directions in [ml readme](./ml/README.md) to train and export the model.

### Webservice

3.  1. Navigate to the webservice directory (assuming you're currently in the repo root).

    ```bash
    cd webservice
    ```

    2.  Create a virtual environment (if not aready created)

    ```bash
    python3 -m venv venv-labbirdorforest-webservice
    ```

    3.  Follow directions in [webservice readme](./webservice/README.md) to run the server.

### Frontend

4.  1. Navigate to the frontend app directory (assuming you're currently in the repo root).

    ```bash
    cd app/nextjs-app-1
    ```

    2. Follow directions in [frontend app readme](./app/nextjs-app-1/README.md) to run the app.

## Usage

In general, the usage looks like this:

1. Train and export the ml model.
2. Copy the exported model file to the webservice directory.
3. Start + test the webservice.
4. Deploy latest version (new model? new code?) of the webservice to render.com.
5. Deploy the later version of the app to vercel.com.
6. Access the app at https://ai-birdorforest.vercel.app
