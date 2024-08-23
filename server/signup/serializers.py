# signup/serializers.py

from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import User
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate

class UserSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'phone', 'password']

    def validate_password(self, value):
        return make_password(value)
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

def validate(self, data):
    email = data.get('email')
    password = data.get('password')

    user = authenticate(email=email, password=password)
    if user is None:
        raise serializers.ValidationError("Invalid email or password.")

    data['user'] = user
    return data