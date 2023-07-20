from rest_framework import viewsets
from .models import Room, Session, Purchase, Price, Movie
from .serializers import UserSerializer, RoomSerializer, SessionSerializer, PurchaseSerializer, PriceSerializer, MovieSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username= serializer.data['username'])
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'status':200,'données': serializer.data, 'token': str(token)})
        return Response({'status': 403, 'errors': serializer.errors})

class LoginUser(ObtainAuthToken):
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        print(serializer.validated_data['user'])
        return Response({'status':200, 'token': str(token),"user":user.is_staff})

class isAuth(APIView):
    def post(self,request):
        token = request.data['token']
        try:
            token = Token.objects.get(key=token)
            user = token.user
            if user:
                return Response({'user': user},status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Accès refusé.'}, status=status.HTTP_403_FORBIDDEN)
        except token.DoesNotExist :
            return Response({'message': 'Token invalide.'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist :
            return Response({'message': 'Utilisateur introuvable.'}, status=status.HTTP_404_NOT_FOUND)

class IsGetOrIsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user and request.user.is_authenticated

class RoomViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsGetOrIsAuthenticated]
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class SessionViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsGetOrIsAuthenticated]
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class PurchaseViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsGetOrIsAuthenticated]
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class PriceViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsGetOrIsAuthenticated]
    queryset = Price.objects.all()
    serializer_class = PriceSerializer

class MovieViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsGetOrIsAuthenticated]
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
