from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
urlpatterns = [

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('list-stocks/<str:stock>/',views.list_stocks,name="stocks"),
    path('user-stocks/',views.user_stocks,name="user-stocks"),
    path('register/',views.register,name="regsiter"),
    path('watch-list/',views.watch_list,name="watch-list"),
    path('user-stock-watch-list/<str:type>/',views.user_stocks_watch_list,name="user-stocks-watch-list"),
    path('user-stocks-inside-particular-watch-list/<str:type>/',views.user_stocks_inside_particular_watch_list,name="user-stocks-inside-particular-watch-list"),
    path('all-stocks/',views.all_stocks,name="all-stocks"),
    
]