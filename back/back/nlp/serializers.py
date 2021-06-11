from enum import unique
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from back.nlp.models import Song, Word, Genre


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class SongSerializer(serializers.HyperlinkedModelSerializer):
    words = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    genre = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    class Meta:
        model = Song
        fields = ['artist', 'title', 'genre','words', 'music_id']

class WordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Word
        fields = ['word', 'word_id']

class GenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ['name', 'genre_id']
