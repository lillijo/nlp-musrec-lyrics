# Generated by Django 3.2.4 on 2021-06-03 09:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0003_alter_song_words'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='genre',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='back.genre'),
        ),
    ]