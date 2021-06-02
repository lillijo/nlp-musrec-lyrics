import json
from .models import Song, Genre, Word

with open("../../words_dump.json", "r")  as data_file:
    data = json.loads(data_file.read())
    for word in range(len(data)):
        Word.create({'word': data[word], 'word_id': word})
