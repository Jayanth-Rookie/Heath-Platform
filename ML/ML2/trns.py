from openai import OpenAI
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware


app2= FastAPI()

load_dotenv()
app2.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app2.post("/gen")
# Create a client with your API key and custom base URL
def genarate(prompt: str = Form(...)):
    client = OpenAI(
        api_key="sk-EDj0Uv3wYofgD5GBvQSgmGU8sRYShIiK3PpZU76jESQp1FvE",
        base_url="https://api.chatanywhere.tech/v1"
    )

    # Create a chat completion
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # or "gpt-4" if supported
        messages=[
            {"role": "system", "content": "You are an experienced medical doctor. Based on the following patient description, provide a primary diagnosis along with a brief reasoning. If necessary, list potential differential diagnoses and suggest the next steps for evaluation or treatment."},
            {"role": "user", "content": prompt}
        ]
    )

    # Print the assistant's reply
    print(response.choices[0].message.content)
    return(response.choices[0].message.content)