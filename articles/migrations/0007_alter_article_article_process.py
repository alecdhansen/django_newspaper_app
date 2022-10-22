# Generated by Django 4.1.2 on 2022-10-22 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0006_article_article_process'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='article_process',
            field=models.CharField(choices=[('Drafts', 'Drafts'), ('Submitted', 'Submitted'), ('Published', 'Published'), ('Rejected', 'Rejected')], default='Drafts', max_length=10),
        ),
    ]
