from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pdf_store = {}  # {pdf_id: text}

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        reader = PdfReader(file.file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        if not text:
            return {"error": "PDF内容为空或无法提取文本"}
        pdf_id = "demo"  # 实际可用 uuid
        pdf_store[pdf_id] = text
        return {"pdf_id": pdf_id, "message": "PDF uploaded and processed."}
    except Exception as e:
        return {"error": f"PDF解析失败: {e}"}

@app.post("/chat")
async def chat(pdf_id: str = Form(...), query: str = Form(...)):
    text = pdf_store.get(pdf_id)
    if not text:
        return {"answer": "请先上传PDF文件。"}
    prompt = f"以下是PDF的内容：\n{text}\n\n基于上面的内容，回答用户的问题：{query}，请标注引用的页码和原文。"
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是一个PDF文档问答助手。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=512,
            temperature=0.2,
        )
        answer = response.choices[0].message.content.strip()
    except Exception as e:
        answer = f"出错了: {e}"
    return {"answer": answer} 