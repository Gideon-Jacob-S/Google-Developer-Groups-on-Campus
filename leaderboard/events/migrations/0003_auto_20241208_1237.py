# Generated by Django 5.1.2 on 2024-12-08 12:37
from django.db import migrations

def populate_users(apps, schema_editor):
    Participant = apps.get_model('events', 'Participant')  # Replace 'your_app_name' with your actual app name
    User = apps.get_model('auth', 'User')  # The default User model from Django's auth app

    # Example: Assign the first user as a placeholder for all participants
    for participant in Participant.objects.all():
        # You can customize this logic based on how you want to assign users
        participant.user = User.objects.first()  # Or any logic to match users to participants
        participant.save()

class Migration(migrations.Migration):

    dependencies = [
        # Replace with the previous migration file name (e.g., '000X_previous_migration')
        ('events', '0002_participant'),
    ]

    operations = [
        migrations.RunPython(populate_users),
    ]
