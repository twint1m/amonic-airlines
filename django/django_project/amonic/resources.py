from import_export import resources
from .models import User, Role, Office

class UserResource(resources.ModelResource):
    class Meta:
        model = User
        import_id_fields = ('email',)
        fields = ('role', 'email', 'password', 'first_name', 'last_name', 'office', 'birthdate', 'active')

    def before_import_row(self, row, **kwargs):
        if 'role' in row:
            role_title = row['role']
            role = Role.objects.get(title=role_title)
            row['role'] = role.id

        if 'office' in row:
            office_title = row['office']
            office = Office.objects.get(title=office_title)
            row['office'] = office.id
