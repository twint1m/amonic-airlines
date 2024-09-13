from django.db import models
from django.contrib.auth.hashers import make_password

class Country(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'Countries'

    def __str__(self):
        return self.name


class Office(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    contact = models.CharField(max_length=250)

    def __str__(self):
        return self.title


class Role(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class User(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50)
    office = models.ForeignKey(Office, null=True, blank=True, on_delete=models.SET_NULL)
    birthdate = models.DateField(null=True, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.password.startswith('md5$'):
            self.password = make_password(self.password, hasher='md5')
        super().save(*args, **kwargs)



