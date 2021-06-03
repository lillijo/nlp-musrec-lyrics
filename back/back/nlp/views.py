import json
import os
import pickle
from functools import reduce
from operator import and_
from django.db.models.query_utils import Q

from django.shortcuts import render

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters
import django_filters.rest_framework
from back.nlp.serializers import UserSerializer, GroupSerializer, SongSerializer, WordSerializer, GenreSerializer
from back.nlp.models import Song, Word, Genre


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class GenreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows songs to be viewed or edited.
    """
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['name', 'genre_id', 'id']

    """
    if queryset.first().name == "":
        song_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'newInfos.json')
        with open(song_path, "r")  as data_file:
            infos = json.load(data_file)
            print(infos[Song.objects.first().music_id])
            all_gens = [i['primary_genres']['music_genre_list'] for i in infos.values()]
            genres = {i[0]['music_genre']['music_genre_id']:i[0]['music_genre']['music_genre_name'] for i in all_gens if len(i)}
            print(len(genres.keys()))
            for genre in queryset:
                if genre.genre_id in genres:
                    genre.name = genres[genre.genre_id]
                    genre.save()
            print(len(queryset.filter(name__exact="")))

            for genre in queryset:
                if song.music_id in data:
                    info = data[song.music_id]
                    song.artist = info['artist_name']
                    song.title = info['track_name']
                    song.save()
    if queryset.exists() == False:
        song_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'test_documents1.json')
        with open(song_path, "r")  as data_file:
            data = json.load(data_file)
            genres = []
            for song in data:
                genres.append(song[1][1])
            unique_genres = list(set(genres))
            Genre.objects.bulk_create([Genre(genre_id=i) for i in unique_genres])
    """


class WordViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows songs to be viewed or edited.
    """
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    """
    if queryset.exists() == False:
        word_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'words_dump.json')
        with open(word_path, "r")  as data_file:
            data = json.load(data_file)
            new_words = []
            for word in range(len(data)):
                new_words.append(Word(word= data[word], word_id= int(word +1)))
            Word.objects.bulk_create(new_words)
    """


class SongViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows songs to be viewed or edited.
    """
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['artist', 'title', 'genre', 'words']
    search_fields = ['artist', 'title', 'genre', 'words', 'words_word']

    def get_queryset(self):
        songs = Song.objects.all()
        if self.request.query_params and 'real_words' in self.request.query_params:
            real_words = Word.objects.filter(
                word__in=self.request.query_params['real_words'].split(','))
            for word in real_words:
                songs = songs.filter(words=word)
        return songs

    """
    if queryset.first().artist == "":
        song_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'newInfos.json')
        with open(song_path, "r")  as data_file:
            data = json.load(data_file)
            for song in queryset:
                if song.music_id in data:
                    info = data[song.music_id]
                    song.artist = info['artist_name']
                    song.title = info['track_name']
                    song.save()
            print(len(queryset.filter(artist__exact="")))
    if len(queryset.first().vector) == 0:
        print('here')
        song_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'inferred_vectors')
        data = pickle.load(open(song_path, "rb"))
        for vec in data:
            song = queryset.get(music_id=vec[1][0])
            song.vector = ",".join([str(i) for i in vec[0]])
            song.save()
        print(len(data), data[0])
    if len(queryset) == 4167:
        song_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'test_documents1.json')
        with open(song_path, "r")  as data_file:
            data = json.load(data_file)
            new_songs = []
            for song in data:
                if len(queryset.filter(music_id=song[1][0])) == 0:
                    genre = Genre.objects.all().get(genre_id=int(song[1][1]))
                    new_song = Song(music_id= song[1][0], genre=genre)
                    #print([i.word_id for i in Word.objects.all().filter(word__in=song[0])])
                    new_song.save()         
                    new_song.words.add(*[i.word_id for i in Word.objects.filter(word__in=song[0])])
                    new_song.save()         
    """
