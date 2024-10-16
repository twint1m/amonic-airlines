import logging

from django.contrib.auth.backends import BaseBackend
from .models import User
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class CustomUserBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                return JsonResponse({'error': 'Неправильный email или пароль'}, status=401)
        except User.DoesNotExist:
            logger.error(f"User with email {email} does not exist.")
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            logger.error(f"User with id {user_id} does not exist.")
            return None