from mongoengine import Document, StringField, EmailField

class User(Document):
    # Define the fields
    name = StringField(max_length=100, required=True)
    email = EmailField(unique=True, required=True)
    phone = StringField(max_length=15, unique=True, required=True)
    password = StringField(max_length=255, required=True)  # Store hashed passwords

    def __str__(self):
        return self.email
