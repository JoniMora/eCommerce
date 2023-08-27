from rest_framework import serializers
from . models import Product, Reviews

class ReviewSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(source='user.avatar.url')
    user = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Reviews
        fields = "_all_"

    def get_avatar(self, obj):
        return obj.user.avatar.url


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = "_all_"

    def get_reviews(self, obj):
        reviews = obj.reviews_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
