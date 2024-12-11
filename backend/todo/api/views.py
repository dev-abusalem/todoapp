from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework import status
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.
class CreateTodoView(APIView):
    
    def post(self, request, format=None):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetTodoView(APIView):
    def get(self, request):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)    
    

class UpdateTodoView(APIView):
    def patch(self, request, pk):
        todo = Todo.objects.get(id=pk)
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteTodoView(APIView):
    def delete(self, request, pk):
        todo = Todo.objects.get(id=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)