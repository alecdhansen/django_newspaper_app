# Generated by Django 4.1.2 on 2022-10-19 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.CharField(choices=[('WORLD', 'World'), ('SPORTS', 'Sports'), ('LOCAL', 'Local')], default='WORLD', max_length=10),
        ),
    ]
