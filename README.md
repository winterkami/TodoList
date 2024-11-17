# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

This project aims to implement a simple To-Do list that allows user to add, edit, delete and mark tasks as completed. The user should also be able to filter tasks by completion status and sort by alphabetical order or by order added. The user is able to interact with the To-Do list through a React API. The motivation behind this project is to provide a simple and easy to use To-Do list that can be used by anyone. The simplicity of the project allows us to focus on the concepts and tools learned throughout the course for designing, developing, testing and deploying a software project.

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

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
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)