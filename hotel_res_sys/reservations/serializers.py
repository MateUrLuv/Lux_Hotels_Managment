from rest_framework import serializers
from .models import User, Hotel, Room, Reservation, Payment

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id',  'email', 'phone', 'address', 'role', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(source='hotel.hotel_name', read_only=True)
    class Meta:
        model = Room
        fields = [
            'id', 'hotel', 'hotel_name', 'room_number', 'room_type',
            'price_per_night', 'availability_status', 'description'
        ]

class ReservationSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(source='room.hotel.hotel_name', read_only=True)
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['user']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'



