from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class HomePage(TemplateView):
    template_name = 'formulas/index.html'
    extra_context = {'title': 'Домашняя страница'}