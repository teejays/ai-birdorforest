# Load a fastai model from file
# from fastai.vision.all import *

# learn = load_learner("trained_model.pkl")

from fastapi import FastAPI

app = FastAPI()


# Allow CORS for all domains
@app.middleware("http")
async def add_cors_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.get("/", tags=["Root"])
def read_root():
    return {"Hello": "World"}


@app.get("/echo/{id}")
def read_item(id: str = None, q: str = None):
    return {"id": id, "q": q}


# @app.post("/classify/")
# def classify_image(image: UploadFile = File(...)):
#     img = PILImage.create(image.file)
#     pred, pred_idx, probs = learn.predict(img)
#     return {"prediction": pred, "probability": probs[pred_idx].item()}
