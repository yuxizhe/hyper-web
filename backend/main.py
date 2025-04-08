from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import get_hypergraph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hyper-RAG"}

# 查询数据库全部数据
@app.get("/db")
async def db():
    data = get_hypergraph()
    return data