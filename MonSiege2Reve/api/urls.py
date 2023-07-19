from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterUser, LoginUser, isAuth, RoomViewSet, SessionViewSet, PurchaseViewSet, PriceViewSet

router = DefaultRouter()
router.register('rooms', RoomViewSet)
router.register('sessions', SessionViewSet)
router.register('purchases', PurchaseViewSet)
router.register('prices', PriceViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUser.as_view()),
    path('login/', LoginUser.as_view()),
    path('isAuth/', isAuth.as_view()),
]
