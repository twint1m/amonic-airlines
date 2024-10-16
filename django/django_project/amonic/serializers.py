from rest_framework import serializers
from .models import User, Office
from datetime import date

from rest_framework import serializers
from .models import User, Role

class UserSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()
    office = serializers.CharField(source='office.title', allow_null=True)
    role = serializers.CharField(source='role.title')

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'office', 'role', 'active', 'birthdate', 'age']

    def get_age(self, obj):
        if obj.birthdate:
            today = date.today()
            return today.year - obj.birthdate.year - ((today.month, today.day) < (obj.birthdate.month, obj.birthdate.day))
        return None


class UserCreateSerializer(UserSerializer):
    password = serializers.CharField(write_only=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['password']

    def create(self, validated_data):
        password = validated_data.pop('password')

        role = validated_data.pop('role', None)
        if role:
            validated_data['role'] = Role.objects.get(id=role['id'])  # Изменено здесь
        else:
            # Получаем объект роли с ID = 2
            default_role = Role.objects.get(id=2)
            validated_data['role'] = default_role


        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user





class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = ['id', 'title', 'phone', 'contact']