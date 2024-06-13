# Python script to ping the webserver at https://ai-birdorforest.onrender.com/echo/foo

import requests

response = requests.get("https://ai-birdorforest.onrender.com/echo/foo")
print(response.json())
