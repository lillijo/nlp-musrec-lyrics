# Generated by Django 3.2.4 on 2021-06-02 16:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre_id', models.IntegerField()),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word_id', models.IntegerField()),
                ('word', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('title', models.CharField(max_length=200)),
                ('artist', models.CharField(max_length=200)),
                ('music_id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('vector', models.CharField(max_length=800)),
                ('tsne_vector', models.CharField(max_length=100)),
                ('genre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back.genre')),
                ('most_similar', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='back.song')),
                ('words', models.ManyToManyField(to='back.Word')),
            ],
        ),
    ]