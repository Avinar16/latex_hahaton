from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import FormulaSerializer
from random import randint


# Create your views here.
class HomePage(TemplateView):
    template_name = 'formulas/index.html'
    extra_context = {'title': 'Домашняя страница'}


class FormulaAnalysisView(APIView):
    def post(self, request):
        serializer = FormulaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response({'coincidence': randint(0, 100)})
