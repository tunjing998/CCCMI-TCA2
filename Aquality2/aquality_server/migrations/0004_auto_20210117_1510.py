# Generated by Django 3.1.3 on 2021-01-17 15:10

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('aquality_server', '0003_auto_20210117_1456'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='date_captured',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]