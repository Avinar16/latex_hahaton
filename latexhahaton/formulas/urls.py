from django.urls import path

from . import views

urlpatterns = [
    path('', views.HomePage.as_view(), name='home'),
    path('api/analysis/', views.FormulaAnalysisView.as_view(), name='analysis'),
    path('formulas/upload/', views.FileUploadView.as_view(), name='upload_file')
]
