from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Hotel, Room, Reservation, Payment
class UserAdmin(BaseUserAdmin):
    ordering = ('email',)  # Use 'email' instead of 'username'
    list_display = ('email', 'full_name', 'is_staff')  # Only use fields that exist in your model
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('full_name', 'phone', 'address', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'phone', 'address', 'role', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'full_name', 'phone')
    filter_horizontal = ('groups', 'user_permissions')
    
admin.site.register(User, UserAdmin)
admin.site.register(Hotel)
admin.site.register(Room)
admin.site.register(Reservation)
admin.site.register(Payment)

