
from gensim.models.doc2vec import Doc2Vec, KeyedVectors
import gensim.models.keyedvectors as word2vec
import os
import numpy as np

def most_similar(words,mid):
    model_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../../../counted1.model")
    try:
        model = word2vec.KeyedVectors.load_word2vec_format(model_path, binary=False)
        #Doc2Vec.load(model_path)
        #word2vec.KeyedVectors.load_word2vec_format(model_path, binary=False)
        #model.docvecs.init_sims(replace=True)
        model.init_sims(replace=True)
        sim  = model.wmdistance(words, ['i', 'love', 'you'])
        print(sim)
        #inferred_vector = model[[mid]]
        #sims = []
        #sims = model.docvecs.most_similar([inferred_vector])
        #print(sims)
        #sims = model.most_similar(positive=words, topn=5)      
        return sim
    except (RuntimeError, TypeError, NameError, MemoryError) as e:
        print(e)
        return [[['bla'],['9791495']]]
