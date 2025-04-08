from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import get_hypergraph, get_vertices,get_vertice, get_vertice_neighbor

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


@app.get("/db")
async def db():
    """
    获取全部数据json
    """
    data = get_hypergraph()
    return data

@app.get("/db/vertices")
async def db():
    """
    获取vertices列表
    """
    data = get_vertices()
    return data

@app.get("/db/vertices/{vertex_id}")
async def get_vertex(vertex_id: str):
    """
    获取指定vertex的json
    """
    vertex_id = vertex_id.replace("%20", " ")
    data = get_vertice(vertex_id)
    return data

@app.get("/db/vertices_neighbor/{vertex_id}")
async def get_vertex_neighbor(vertex_id: str):
    """
    获取指定vertex的neighbor
    """
    vertex_id = vertex_id.replace("%20", " ")
    data = get_vertice_neighbor(vertex_id)
    return data

@app.get("/db/hyperedge_neighbor/{hyperedge_id}")
async def get_hyperedge_neighbor(hyperedge_id: str):
    """
    获取指定hyperedge的neighbor
    """
    data = get_hyperedge_neighbor(hyperedge_id)
    return data