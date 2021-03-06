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
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, blank=True, null=True)
    words = models.ManyToManyField(Word, blank=True)
    tsne_vector = models.CharField(max_length=100)



