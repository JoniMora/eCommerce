from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.utils.text import slugify

from . models import Product
from . serializers import ProductSerializer
from backend.pagination import CustomPagination 


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all().order_by('id')
    pagination = CustomPagination()
    paginated_products = pagination.paginate_queryset(products, request)
    seriealizer = ProductSerializer(paginated_products, many=True)
    return pagination.get_paginated_response(seriealizer.data)


@api_view(['GET'])
def get_product_admin(request, id):
    products = Product.objects.get(id=id)
    seriealizer = ProductSerializer(products, many=False)
    return Response(seriealizer.data)


@api_view(['GET'])
def get_product(request, name):
    products = Product.objects.get(name=name)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def create_product(request):
    if request.user.is_staff:
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)

'''
@api_view(['PUT'])
def edit_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
'''

@api_view(['PUT'])
def edit_product(request, pk):
    print("Datos de entrada:", request.data)
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'El producto no existe.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.user.is_staff:
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            error_message = "Error en la validación del serializador: {}".format(serializer.errors)
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'No tienes permiso para editar este producto.'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['DELETE'])
def delete_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else: 
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
