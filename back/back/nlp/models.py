from django.db import models

# Create your models here.

class Genre(models.Model):
    genre_id = models.IntegerField()
    name = models.CharField(max_length=200)

class Word(models.Model):
    word_id = models.IntegerField()
    word = models.CharField(max_length=200)

class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    music_id = models.CharField(max_length=200, primary_key=True)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    words = models.ManyToManyField(Word)
    vector = models.CharField(max_length=800)
    tsne_vector = models.CharField(max_length=100)
    most_similar = models.ForeignKey('self', on_delete=models.PROTECT)



