import json
from django.shortcuts import render

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
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


class SongViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows songs to be viewed or edited.
    """
    queryset = Song.objects.all()
    serializer_class = SongSerializer

class GenreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows songs to be viewed or edited.
    """
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class WordViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows songs to be viewed or edited.
    """
    queryset = Word.objects.all()
    serializer_class = WordSerializer

    def populate():
        with open("../../../words_dump.json", "r")  as data_file:
            data = json.load(data_file)
            for word in range(len(data)):
                Word.create({'word': data[word], 'word_id': word})