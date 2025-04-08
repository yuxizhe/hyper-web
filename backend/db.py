# 从本地文件夹HypergraphDB中导入 HypergraphDB 类
from hyperdb import HypergraphDB

# 声明函数
def get_hypergraph():
    # Initialize the hypergraph
    hg = HypergraphDB(storage_file="hypergraph_A_Christmas_Carol.hgdb")

    # 声明变量 赋值 hg.all_v
    all_v = hg.all_v
    # 声明变量 赋值 hg.all_e
    all_e = hg.all_e
    # 循环遍历 all_v 每个元素 赋值为 hg.v
    nodes = {}
    for v in all_v:
        nodes[v] = hg.v(v)

    hyperedges = {}
    for e in all_e:
        hyperedges['|#|'.join(e)] = hg.e(e)

    return { "vertices": nodes , "edges": hyperedges }