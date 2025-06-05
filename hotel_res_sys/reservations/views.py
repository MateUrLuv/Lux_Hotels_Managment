from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


from .models import Hotel, Room, Reservation, Payment
from .serializers import (
    UserSerializer, HotelSerializer, RoomSerializer,
    ReservationSerializer, PaymentSerializer
)
from .permissions import IsAdminUserOrReadOnly  # Make sure this exists in permissions.py

# ========== Authentication Views ==========

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        full_name = request.data.get("full_name")
        phone = request.data.get("phone")
        address = request.data.get("address", "")
        role = request.data.get("role", "")

        if User.objects.filter(email=email).exists():
            return Response({"email": ["Email already registered."]}, status=400)
        user = User.objects.create_user(
            email=email,
            password=password,
            full_name=full_name,
            phone=phone,
            address=address,
            role=role,
        )
        return Response({"detail": "Registration successful!"}, status=201)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user_id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
            })
        return Response({"detail": "Invalid credentials."}, status=400)


# ========== User CRUD (admin only) ==========
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

# ========== Hotel CRUD ==========
class HotelListCreate(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class HotelRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAdminUserOrReadOnly]

# ========== Room CRUD ==========
class RoomListCreate(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class RoomRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAdminUserOrReadOnly]

# ========== Reservation CRUD ==========
class ReservationListCreate(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReservationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow users to access their own reservations
        return Reservation.objects.filter(user=self.request.user)

# ========== Payment CRUD (optional, for completeness) ==========
class PaymentListCreate(generics.ListCreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(reservation__user=self.request.user)

    def perform_create(self, serializer):
        payment = serializer.save()
        if payment.payment_status == "paid":
            payment.reservation.status = "confirmed"
            payment.reservation.save()
            payment.reservation.room.availability_status = False
            payment.reservation.room.save()

class PaymentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(reservation__user=self.request.user)

