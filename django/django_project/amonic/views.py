from django.shortcuts import render
from django.contrib.auth import login as auth_login
from django.http import JsonResponse
from .models import User, Role
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import generics
from .serializers import UserCreateSerializer
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.http import JsonResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Office
from .serializers import OfficeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import User
from .serializers import UserCreateSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User, Role
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User, Role
from .serializers import UserSerializer

FAILED_ATTEMPTS_LIMIT = 3
BLOCK_TIME = 10
login_attempts = {}


@csrf_exempt
def custom_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            user = authenticate(request, email=email, password=password)
            if user is not None:
                print(f"User: {user.email}, Role: {user.role}")
                if user.role:
                    return JsonResponse({
                        'redirect_url': '/users/info' if user.role.id == 1 else '/users/activity'
                    }, status=200)
                else:
                    return JsonResponse({'error': 'Пользователь не имеет роли'}, status=400)
            else:
                return JsonResponse({'error': 'Неправильные учетные данные'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Неверный метод запроса'}, status=405)





@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
def toggle_user_active(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.active = not user.active
        user.save()
        return Response({'status': 'success', 'active': user.active}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def change_user_role(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        new_role = request.data.get('role')

        try:
            role = Role.objects.get(id=new_role)
            user.role = role
            user.save()
            return Response({'status': 'success', 'role': user.role.title}, status=status.HTTP_200_OK)
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserCreateSerializer, UserRoleAssignSerializer

class UserCreateView(APIView):
    def post(self, request):
        user_serializer = UserCreateSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()

            # После успешного создания пользователя можно присвоить ему роль
            if 'role' in request.data:
                role_serializer = UserRoleAssignSerializer(user, data={'role': request.data['role']})
                if role_serializer.is_valid():
                    role_serializer.save()
                else:
                    return Response(role_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class OfficeListView(APIView):
    def get(self, request):
        offices = Office.objects.all()
        serializer = OfficeSerializer(offices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)