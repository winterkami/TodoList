# Step 1: Use an official Python runtime as a base image
FROM python:3.13-slim
# FROM python:3.12.7

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the current directory contents into the container at /app
COPY . /app

# Step 4: Install necessary Python packages
RUN pip install --no-cache-dir flask flask-cors

# Step 5: Expose the port that the Flask application will run on
EXPOSE 5000

# Step 6: Run the Flask application
CMD ["python", "app.py"]