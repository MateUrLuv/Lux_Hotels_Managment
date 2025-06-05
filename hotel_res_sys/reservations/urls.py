from django.urls import path, include


from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, LoginView,
    UserListCreate, UserRetrieveUpdateDestroy,
    HotelListCreate, HotelRetrieveUpdateDestroy,
    RoomListCreate, RoomRetrieveUpdateDestroy,
    ReservationListCreate, ReservationRetrieveUpdateDestroy,
    PaymentListCreate, PaymentRetrieveUpdateDestroy,
   
)

urlpatterns = [
    # Auth endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),        # JWT login (optional)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),        # JWT refresh (optional)

    # User CRUD (admin)
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroy.as_view(), name='user-detail'),

    # Hotel CRUD
    path('hotels/', HotelListCreate.as_view(), name='hotel-list-create'),
    path('hotels/<int:pk>/', HotelRetrieveUpdateDestroy.as_view(), name='hotel-detail'),

    # Room CRUD
    path('rooms/', RoomListCreate.as_view(), name='room-list-create'),
    path('rooms/<int:pk>/', RoomRetrieveUpdateDestroy.as_view(), name='room-detail'),

    # Reservation CRUD
    path('reservations/', ReservationListCreate.as_view(), name='reservation-list-create'),
    path('reservations/<int:pk>/', ReservationRetrieveUpdateDestroy.as_view(), name='reservation-detail'),

    # Payment CRUD
    path('payments/', PaymentListCreate.as_view(), name='payment-list-create'),
    path('payments/<int:pk>/', PaymentRetrieveUpdateDestroy.as_view(), name='payment-detail'),
]