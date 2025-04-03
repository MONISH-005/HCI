from django.urls import path
from . import views
from .views import set_preference
from django.urls import path
from .views import get_matches

urlpatterns = [
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('preference/', views.preference_view, name='preference'),
    path("main_page/", views.main_page, name="main_page"),
    path('news/', views.news_page, name='news'),
    path('songs/', views.songs, name='songs'),
    path('matches/', views.matches, name='matches'),
    path('education/', views.education, name='education'),
    path('health/', views.health, name='health'),
    path('feedback/', views.feedback, name='feedback'),
    path('logout/', views.user_logout, name='logout'),
    path("set_preference/", set_preference, name="set_preference"),
    path('get_matches/', get_matches, name="get_matches"),
]

 


 
 