from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
import ollama
import os
import base64
from dotenv import load_dotenv


load_dotenv()

flag = False

print(os.listdir("C:/Users/bhuva/OneDrive/Desktop/projects/64.Neural_Knights/Uploads/image"))
image_id = os.listdir("C:/Users/bhuva/OneDrive/Desktop/projects/64.Neural_Knights/Uploads/image")
image_path = f"C:/Users/bhuva/OneDrive/Desktop/projects/64.Neural_Knights/Uploads/image/" + image_id[0]

print(image_path)
app = FastAPI()

@app.post("/generate")
async def generate(prompt: str = Form(...)):
    # Read the uploaded image file
    
    flag = True
    # Encode the image to base64
   
    response = ollama.chat(
        model="llava-llama3",
        messages=[
            {
                'role': 'user',
                'content': prompt,
                'images': [image_path],
            }
        ]
    )
     
    return {"response": response["message"]["content"]}

