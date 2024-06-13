# main.py

from fastapi import FastAPI, File, UploadFile


app = FastAPI()

import os
from fastai.vision.all import PILImage, load_learner

# Load a fastai model from file
# read file name from env variable WEBSERVER_MODEL_FILE_PATH
model_file_path = os.getenv("WEBSERVER_MODEL_FILE_PATH")
if model_file_path is None:
    model_file_path = "trained-model-fastai.pkl"
print(f"Loading model from file: {model_file_path}")
learn = load_learner(model_file_path)
print("Model loaded successfully")


# Add CORS middleware to allow cross-origin requests
@app.middleware("http")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response


# Add a preflight handler to allow OPTIONS requests
@app.options("/{rest_of_path:path}")
async def preflight_handler(*, rest_of_path: str):
    return "Preflight request handled."


# Define the API routes


# Define the root route
@app.get("/", tags=["Root"])
async def read_root():
    return {"Hello": "World"}


# Define the echo route
@app.get("/echo/{id}")
async def read_item(id: str = None, q: str = None):
    return {"id": id, "q": q}


# Define the classify route
@app.post("/classify")
async def classify_image(image: UploadFile = File(...)):
    img = PILImage.create(image.file)
    pred, pred_idx, probs = learn.predict(img)
    return {"prediction": pred, "probability": probs[pred_idx].item()}


# Uncommemnt the following code if you want to run the app using uvicorn from within the main.py file
# if __name__ == "__main__":
#     uvicorn.run("api.api:app", host="0.0.0.0", port=8000, reload=True)
