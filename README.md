# Introduction 
This is a Java GUI TODO list program. 

## Features
- 

## Implementation
A database is used to store all the data. And the user will interact with the program using a GUI

This project aims to implement a simple To-Do list that allows user to add, edit, delete and mark tasks as completed. The user should also be able to filter tasks by completion status and sort by alphabetical order or by order added. The user is able to interact with the To-Do list through a React API. The motivation behind this project is to provide a simple and easy to use To-Do list that can be used by anyone. The simplicity of the project allows us to focus on the concepts and tools learned throughout the course for designing, developing, testing and deploying a software project.

# Getting Started
1. Run `npm install` in the `./frontend` directory
2. Run `docker-compose up --build` in the project directory
3. Open `http://localhost:80` in the browser

# Build and Test
TODO

## Backend

To build the project, you can use the following command:

First, in the ```backend``` directory, run the following command to build the backend:

```docker build -t todo-frontend .```
    
Then, to run the Docker Container for the backend, run the following command:
    
```docker run -p 5000:5000 todo-frontend```

To test whether the backend is running, you can use the following command in another terminal to send a request:

```Invoke-WebRequest -Uri http://localhost:5000/todos -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"title":"first task"}```

You should see a response with the task you just created.

## Frontend

In the ```frontend``` directory, run the following command to build the frontend:

```docker build -t react-todo-frontend .```

Then, to run the Docker Container for the frontend, run the following command:

```docker run -p 80:80 react-todo-frontend```

Then, you can visit ```http://localhost:80``` to see the frontend.


# Contribute
Every code change should be done through a PR and reviewed by another team member