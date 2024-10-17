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


from rest_framework import serializers
from .models import User

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'office', 'role', 'password', 'birthdate']

    def create(self, validated_data):
        password = validated_data.pop('password')
        role = validated_data.pop('role')  # Явно забираем роль из данных
        user = User(**validated_data)
        user.set_password(password)  # Устанавливаем пароль
        user.role = role  # Явно устанавливаем роль
        user.save()
        return user



from rest_framework import serializers
from .models import User, Role

class UserRoleAssignSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())

    class Meta:
        model = User
        fields = ['role']

    def update(self, instance, validated_data):
        instance.role = validated_data['role']
        instance.save()
        return instance













class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = ['id', 'title', 'phone', 'contact']