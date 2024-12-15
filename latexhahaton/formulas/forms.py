from django import forms
from .models import Formula

from django import forms


class FileUploadForm(forms.Form):
    file = forms.FileField(
        label="Выберите файл",
        required=True,
        widget=forms.FileInput(attrs={'class': 'form__file'})
    )
