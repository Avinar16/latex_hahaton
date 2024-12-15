from django import forms
from .models import Formula


# class AddTaskForm(forms.Form):
#
#     class Meta:
#         fields = ['category', 'spent', 'comment', 'report']
#         widgets = {
#             'spent': forms.NumberInput(attrs={'class': 'form__input', 'min': 1, 'max': 24}),
#             'comment': forms.Textarea(attrs={'class': 'form__input'}),
#             'report': forms.FileInput(attrs={'class': 'form__file'}),
#         }
#         labels = {
#             'spent': 'Затраченное время',
#             'comment': 'Комментарий (опционально)',
#             'report': 'Отчёт (опционально)'
#         }
