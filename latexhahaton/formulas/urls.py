from django.urls import path

from . import views

urlpatterns = [
    path('', views.HomePage.as_view(), name='home'),
    path('analysis', views.FormulaAnalysisView.as_view(), name='analysis')
]
