from django.db import models


# Create your models here.
class Formula(models.Model):
    formula = models.CharField(
        verbose_name='Формула',
    )
    source = models.CharField(
        verbose_name='Источник',
        max_length=1024,
        null=True,
        blank=True,
        default=None
    )
    time_create = models.DateTimeField(
        verbose_name='Время добавления',
        auto_now_add=True
    )
    time_update = models.DateTimeField(
        verbose_name='Время изменения',
        auto_now=True
    )

    objects = models.Manager()
