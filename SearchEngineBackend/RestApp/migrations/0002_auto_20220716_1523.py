# Generated by Django 3.2.10 on 2022-07-16 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RestApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='searchurl',
            old_name='id',
            new_name='Id',
        ),
        migrations.AddField(
            model_name='searchurl',
            name='Description',
            field=models.CharField(default='To be filled', max_length=1000),
            preserve_default=False,
        ),
    ]