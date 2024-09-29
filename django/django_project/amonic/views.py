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

FAILED_ATTEMPTS_LIMIT = 3
BLOCK_TIME = 10
login_attempts = {}

@csrf_exempt
def custom_login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user_block_info = login_attempts.get(email, {})
        if 'block_until' in user_block_info and timezone.now() < user_block_info['block_until']:
            remaining_time = (user_block_info['block_until'] - timezone.now()).seconds
            return JsonResponse({'error': f'Подождите {remaining_time} секунд'}, status=403)

        try:
            user = User.objects.get(email=email)
            if not user.active:
                return JsonResponse({'error': 'Пользователь не активен'}, status=403)

            if user.check_password(password):
                auth_login(request, user, backend='amonic.authentication_backends.CustomUserBackend')

                if email in login_attempts:
                    del login_attempts[email]

                token, created = Token.objects.get_or_create(user=user)

                return JsonResponse({
                    'token': token.key,
                    'redirect_url': '/users/info' if user.role_id == 1 else '/users/activity'
                }, status=200)

            raise User.DoesNotExist
        except User.DoesNotExist:
            if email not in login_attempts:
                login_attempts[email] = {'attempts': 1}
            else:
                login_attempts[email]['attempts'] += 1

            if login_attempts[email]['attempts'] >= FAILED_ATTEMPTS_LIMIT:
                login_attempts[email]['block_until'] = timezone.now() + timezone.timedelta(seconds=BLOCK_TIME)
                return JsonResponse({'error': f'Подождите {BLOCK_TIME} секунд'}, status=403)

            return JsonResponse({'error': 'Неправильный email или пароль'}, status=401)

    return JsonResponse({"error": "Invalid request method"}, status=405)

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


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticated]



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Office
from .serializers import OfficeSerializer

class OfficeListView(APIView):
    def get(self, request):
        offices = Office.objects.all()
        serializer = OfficeSerializer(offices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
