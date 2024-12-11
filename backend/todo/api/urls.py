from django.urls import path, include
from . import views
urlpatterns = [
    path('createTodo/', views.CreateTodoView.as_view(), name='createTodo'),
    path('getTodos/', views.GetTodoView.as_view(), name='getTodo'),
    path('updateTodo/<int:pk>', views.UpdateTodoView.as_view(), name='updateTodo'),
    path('deleteTodo/<int:pk>', views.DeleteTodoView.as_view(), name='deleteTodo'),
]
