# myproject/urls.py

from django.contrib import admin
from django.urls import path
from signup.views import register_user
from signup.views import login_user

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register_user, name='register_user'),
    path('login/', login_user, name='login'),
]


