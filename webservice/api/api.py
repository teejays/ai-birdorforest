from fastapi import FastAPI, File, UploadFile
from fastai.vision.all import *

app = FastAPI()

# Load a fastai model from file
learn = load_learner("trained_model.pkl")
print("Model loaded successfully!")


# Add CORS middleware to allow cross-origin requests
@app.middleware("http")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


# Define the API routes


# Define the root route
@app.get("/", tags=["Root"])
def read_root():
    return {"Hello": "World"}


# Define the echo route
@app.get("/echo/{id}")
def read_item(id: str = None, q: str = None):
    return {"id": id, "q": q}


# Define the classify route
@app.post("/classify/")
def classify_image(image: UploadFile = File(...)):
    img = PILImage.create(image.file)
    pred, pred_idx, probs = learn.predict(img)
    return {"prediction": pred, "probability": probs[pred_idx].item()}
