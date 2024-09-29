from rest_framework import serializers
from .models import User
from datetime import date

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
