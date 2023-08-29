from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from . models import Product
from . serializers import ProductSerializer
from backend.pagination import CustomPagination 


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    pagination = CustomPagination()
    paginated_products = pagination.paginate_queryset(products, request)
    seriealizer = ProductSerializer(paginated_products, many=True)
    return pagination.get_paginated_response(seriealizer.data)


@api_view(['GET'])
def get_products(request, name):
    products = Product.objects.get(name=name)
    seriealizer = ProductSerializer(products, many=False)
    return Response(seriealizer.data)


@api_view(['POST'])
def create_product(request):
    if request.user.is_staff:
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['PUT'])
def edit_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['DELETE'])
def delete_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else: 
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
