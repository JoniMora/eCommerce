from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_products),
    path('search/', views.search),
    path('get/<slug:slug>/', views.get_product),
    path('get/admin/<int:id>/', views.get_product_admin),
    path('post/', views.create_product),
    path('edit/<int:pk>/', views.edit_product),
    path('delete/<int:pk>/', views.delete_product),
    path('category/<str:category>/', views.get_products_category),

    path('review/<int:pk>/', views.create_review),
]