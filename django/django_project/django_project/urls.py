"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from amonic.views import custom_login, get_users, toggle_user_active, change_user_role
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("admin/", admin.site.urls),
    path('login/', custom_login, name='custom_login'),
    path('api/users/', get_users, name='get_users'),
    path('api/token/', obtain_auth_token, name='api_token_auth'),
    path('api/users/<int:user_id>/toggle-active/', toggle_user_active, name='toggle_user_active'),
    path('api/users/<int:user_id>/change-role/', change_user_role, name='change_user_role'),
]


