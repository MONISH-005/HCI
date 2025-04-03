from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse

def home(request):
    return render(request, 'home.html')

from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib import messages

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        # Check if passwords match
        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return render(request, 'registration/register.html')

        # Validate email address
        try:
            validate_email(email)
        except ValidationError:
            messages.error(request, "Invalid email address.")
            return render(request, 'registration/register.html')

        # Check if username or email already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return render(request, 'registration/register.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return render(request, 'registration/register.html')

        # Create user (password is hashed automatically)
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        messages.success(request, "Registration successful. Please log in.")
        return redirect('login')
    
    return render(request, 'registration/register.html')
def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'})

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('preference')
        else:
            return JsonResponse({'error': 'Invalid username or password'})

    return render(request, 'registration/login.html')


def user_logout(request):
    logout(request)
    return redirect('home')

def preference_view(request):
    return render(request, 'preference.html')

def main_page(request):
    return render(request, 'main_page.html')

def news_page(request):
    return render(request, 'news.html')

def songs(request):
    return render(request, 'songs.html')

def matches(request):
    return render(request, 'matches.html')

def education(request):
    return render(request, 'education.html')

def health(request):
    return render(request, 'health.html')
def feedback(request):
    return render(request, 'feedback.html')

from django.http import JsonResponse
import json

from django.shortcuts import render, redirect
from django.http import JsonResponse

def set_preference(request):
    if request.method == "POST":
        # Process user preference here
        return redirect("main_page")  # Redirect to main page after setting preference
    return JsonResponse({"error": "Invalid request"}, status=400)
    
from django.shortcuts import render

def main_page(request):
    return render(request, 'main_page.html')  # ✅ Ensure correct path

import requests
from django.http import JsonResponse
import os
from dotenv import load_dotenv

load_dotenv()

CRIC_API_KEY = os.getenv("CRIC_API_KEY")

def get_matches(request):
    url = f"https://api.cricapi.com/v1/matches?apikey={CRIC_API_KEY}"
    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)
