from django.contrib import admin
from .models import Country, Office, Role, User
from import_export.admin import ImportExportModelAdmin
from .resources import UserResource

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'country', 'phone', 'contact')

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')

@admin.register(User)
class UserAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = UserResource
    list_display = ('id', 'email', 'role', 'first_name', 'last_name', 'office', 'birthdate', 'active')
