from hyperdb import HypergraphDB

hg = HypergraphDB(storage_file="hypergraph_A_Christmas_Carol.hgdb")

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

def get_vertice_neighbor(vertex_id: str):
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

    return get_all_detail(n, e)


def get_all_detail(all_v, all_e):
    """
    获取指定vertex的详细信息
    """
    # 循环遍历 all_v 每个元素 赋值为 hg.v
    nodes = {}
    for v in all_v:
        nodes[v] = hg.v(v)

    hyperedges = {}
    for e in all_e:
        hyperedges['|#|'.join(e)] = hg.e(e)

    return { "vertices": nodes , "edges": hyperedges }