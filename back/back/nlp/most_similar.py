
from gensim.models.doc2vec import Doc2Vec
import os

def most_similar(words):
    model_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../../doc2vecNO_DUPS.model")
    model = Doc2Vec.load(model_path)
    inferred_vector = model.infer_vector(words)
    sims = model.docvecs.most_similar([inferred_vector])
    return sims
