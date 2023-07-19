from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MemberViewSet, RoomViewSet, SessionViewSet, PurchaseViewSet, PriceViewSet

router = DefaultRouter()
router.register('members', MemberViewSet)
router.register('rooms', RoomViewSet)
router.register('sessions', SessionViewSet)
router.register('purchases', PurchaseViewSet)
router.register('prices', PriceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
