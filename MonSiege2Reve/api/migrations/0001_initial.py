# Generated by Django 4.2.3 on 2023-07-19 10:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('price', models.FloatField()),
                ('isSpecial', models.BooleanField()),
                ('flag', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('nbPlaces', models.IntegerField()),
                ('flag', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('firstname', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=150)),
                ('password', models.CharField(max_length=500)),
                ('flag', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('isSpecial', models.BooleanField()),
                ('language', models.CharField(max_length=5)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('image', models.URLField()),
                ('flag', models.BooleanField()),
                ('roomId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('price', models.FloatField()),
                ('timestamp', models.DateTimeField()),
                ('sessionId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.session')),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
