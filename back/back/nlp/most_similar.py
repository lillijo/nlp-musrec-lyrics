
from gensim.models.doc2vec import Doc2Vec, KeyedVectors
import gensim.models.keyedvectors as word2vec
import os
import numpy as np
import pickle

def find_closest(document_id, vector_dict):
    doc_vec = vector_dict.pop(document_id)
    closest = [float('inf'), '']
    for (k,v) in vector_dict.items():
        new_dist = np.linalg.norm(np.array(list(doc_vec))-np.array(list(v)))
        if new_dist < closest[0]:
            closest = [new_dist, k]
    return closest

def find_closest_n(document_id, vector_dict, n=10):
    doc_vec = np.array(list(vector_dict.pop(document_id)))
    vector_array = [[np.linalg.norm(doc_vec-np.array(list(v))), k] for (k,v) in vector_dict.items()]
    return sorted(vector_array, key=lambda x: x[0])[:n]

def most_similar(music_id, sia=False):
    result = []

    d2v_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../../inferred_vectors_dict.p")

    d2v_dict = pickle.load( open( d2v_path, "rb" ) ) #d2v inferred vectors dict
    print(d2v_dict[music_id])
    result = find_closest_n(music_id, d2v_dict)
    if sia: 
        sia_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../../sia_scores.p")

        sia_scores = pickle.load( open( sia_path, "rb" ) ) #sia score dict
        sia_dict = {k: v.values() for (k,v) in sia_scores.items()}
        result.append(find_closest(music_id, sia_dict))

    return result

