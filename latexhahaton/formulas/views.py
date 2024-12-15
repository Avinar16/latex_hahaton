from django.shortcuts import render
from django.views.generic import TemplateView, CreateView
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import FormulaSerializer
from .utils import find_coincidence


# Create your views here.
class HomePage(TemplateView):
    template_name = 'formulas/index.html'
    extra_context = {'title': 'Домашняя страница'}


class FormulaAnalysisView(APIView):
    def post(self, request):
        serializer = FormulaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        match = find_coincidence(serializer.data['formula'])

        return Response(match)

# class FormulaFromFile(CreateView):
#     model = Formula
#     form_class = AddTaskForm
#     template_name = 'Tasks/profile.html'
#
#     extra_context = {
#         'title': 'Профиль',
#         'default_image': settings.DEFAULT_PROFILE_IMAGE,
#     }
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         tasks = Task.objects.filter(worker=self.request.user)
#         hours = 0
#         if tasks:
#             hours = tasks.aggregate(total=Sum('spent'))['total']
#         context = {
#             **context,
#             'tasks_count': tasks.count(),
#             'hours_count': hours
#         }
#         return context
#
#     def get_success_url(self):
#         return reverse_lazy('profile')
#
#     def get_object(self, queryset=None):
#         return self.request.user
#
#     def form_valid(self, form):
#         t = form.save(commit=False)
#         t.worker = self.request.user
#         return super().form_valid(form)
