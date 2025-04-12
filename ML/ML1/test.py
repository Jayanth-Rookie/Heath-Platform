from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
import ollama
import os
import base64
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()



print(os.listdir("C:/Users/bhuva/OneDrive/Desktop/projects/64.Neural_Knights/Uploads/image"))
image_id = os.listdir("C:/Users/bhuva/OneDrive/Desktop/projects/64.Neural_Knights/Uploads/image")
image_path = f"C:/Users/bhuva/OneDrive/Desktop/projects/64.Neural_Knights/Uploads/image/" + image_id[0]

print(image_path)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate(prompt: str = Form(...)):
    # Read the uploaded image file
    
    # Encode the image to base64
   
    response = ollama.chat(
        model="llava-llama3",
        messages=[
            {
                'role': 'user',
                'content': "Please summrize this image in detail without leaving anything ",
                'images': [image_path],
            }
        ]
    )
     
    return {"response": response["message"]["content"]}

