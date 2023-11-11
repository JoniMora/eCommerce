from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('search/', views.search),
    path('register/', views.register),
    path('login/', views.LoginView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('get/', views.getUsers),
    path('delete/<int:pk>/', views.deleteUser),
    path('edit/<str:email>/', views.edit_profile),

]
