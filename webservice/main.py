# Load a fastai model from file
from fastai.vision.all import *

learn = load_learner("trained_model.pkl")

from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/echo/{id}")
def read_item(id: str = None, q: str = None):
    return {"id": id, "q": q}


@app.post("/classify/")
def classify_image(image: UploadFile = File(...)):
    img = PILImage.create(image.file)
    pred, pred_idx, probs = learn.predict(img)
    return {"prediction": pred, "probability": probs[pred_idx].item()}
