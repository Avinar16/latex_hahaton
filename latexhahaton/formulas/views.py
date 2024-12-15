from django.shortcuts import render
from django.views.generic import TemplateView, CreateView, View
from rest_framework.response import Response
from rest_framework.views import APIView

from latexhahaton import settings
from .models import Formula
from .serializers import FormulaSerializer
from .utils import find_coincidence
from .forms import FileUploadForm

import os, sys
from .parser_word import convert_docx_to_tex, extract_math_from_tex
import uuid
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
class HomePage(TemplateView):
    template_name = 'formulas/index.html'
    extra_context = {'title': 'Домашняя страница'}


class FormulaAnalysisView(APIView):
    @csrf_exempt
    def post(self, request):
        serializer = FormulaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(request.data, file=sys.stderr)
        match = find_coincidence(serializer.data['formula'])

        return Response(match)


class FileUploadView(View):
    template_name = 'formulas/add_formulas.html'

    def get(self, request):
        form = FileUploadForm()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_file = form.cleaned_data['file']

            extension = os.path.splitext(uploaded_file.name)[1]

            # Путь для сохранения файла
            temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
            os.makedirs(temp_dir, exist_ok=True)  # Создаём папку, если её нет

            unique_id = uuid.uuid4().hex

            # Полный путь сохранённого файла
            file_path = os.path.join(temp_dir, f'{unique_id}{extension}')
            tex_path = os.path.join(temp_dir, f'{unique_id}.tex')

            # Сохранение файла
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            # Обработка файла
            try:
                if extension == '.docx':
                    convert_docx_to_tex(file_path, tex_path)
                    math_expressions = extract_math_from_tex(tex_path)
                    # Создаём объекты Formula для каждой формулы
                    formula_objects = [Formula(formula=f.strip('\n ')) for f in math_expressions if f.strip('\n ')]
                else:
                    formula_objects = []
                    with open(file_path, 'rt') as txt_file:
                        formula_objects = [Formula(formula=f.strip('\n ')[3:-3]) for f in txt_file if f.strip('\n ')]

                # Добавляем все объекты в базу данных за один запрос
                Formula.objects.bulk_create(formula_objects)

            finally:
                # Удаляем файл после обработки
                if os.path.exists(file_path):
                    os.remove(file_path)
                if os.path.exists(tex_path):
                    os.remove(tex_path)

        return render(request, self.template_name, {'form': form})
