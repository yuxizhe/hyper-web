from hyperdb import HypergraphDB

hg = HypergraphDB(storage_file="hypergraph_wukong.hgdb")

# 声明函数
def get_hypergraph():
    # 声明变量 赋值 hg.all_v
    all_v = hg.all_v
    # 声明变量 赋值 hg.all_e
    all_e = hg.all_e

    return get_all_detail(all_v, all_e)

def get_vertices():
    """
    获取vertices列表
    """
    all_v = hg.all_v
    return all_v

def get_vertice(vertex_id: str):
    """
    获取指定vertex的json
    """
    vertex = hg.v(vertex_id)
    return vertex

def get_hyperedges():
    """
    获取hyperedges列表
    """
    all_e = hg.all_e

    hyperedges = []
    for e in all_e:
        hyperedges.append('|*|'.join(e))

    return hyperedges

def get_hyperedge(hyperedge_id: str):
    """
    获取指定hyperedge的json
    """
    hyperedge = hg.e(hyperedge_id)

    return hyperedge

def get_vertice_neighbor_inner(vertex_id: str):
    """
    获取指定vertex的neighbor

    todo: 查不到会报错 CLERGYMAN
    """
    try:
        n = hg.nbr_v(vertex_id)
    
        n.add(vertex_id)

        e = hg.nbr_e_of_v(vertex_id)
    except Exception:
        # 如果报错，返回空列表
        n = []
        e = []

    return (n,e)

def get_vertice_neighbor(vertex_id: str):
    """
    获取指定vertex的neighbor

    todo: 查不到会报错 CLERGYMAN
    """
    n, e = get_vertice_neighbor_inner(vertex_id)

    return get_all_detail(n, e)


def get_all_detail(all_v, all_e):
    """
    获取所有详情
    """
    # 循环遍历 all_v 每个元素 赋值为 hg.v
    nodes = {}
    for v in all_v:
        nodes[v] = hg.v(v)

    hyperedges = {}
    for e in all_e:
        hyperedges['|#|'.join(e)] = hg.e(e)

    return { "vertices": nodes , "edges": hyperedges }

def get_hyperedge_neighbor_server(hyperedge_id: str):
    """
    获取指定hyperedge的neighbor
    """
    nodes = hyperedge_id.split("|#|")
    print(hyperedge_id)
    vertices = set()
    hyperedges = set()
    for node in nodes:
        n, e = get_vertice_neighbor_inner(node)
        # 这里的 n 是一个集合
        # 这里的 e 是一个集合
        # vertexs 增加n
        # hyperedges 增加e
        vertices.update(n)
        hyperedges.update(e)

    return get_all_detail(vertices, hyperedges)