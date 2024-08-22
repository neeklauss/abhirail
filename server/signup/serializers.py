# signup/serializers.py

from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import User
from django.contrib.auth.hashers import make_password, check_password

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

        # Try to find the user with the given email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        # Manually check if the password matches
        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid email or password.")

        # Optionally, return user data in validated data
        data['user'] = user
        return data
