from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import json

"""Database component"""


# Database connection
def get_connection():
    try:
        config = {
            "user": "root",
            "password": "root",
            "host": "db",
            "port": "3306",
            "database": "mydatabase",
        }
        connection = mysql.connector.connect(**config)
        return connection
    except Error as e:
        print(f"Error connecting to the database: {e}")
        return None


# Creating a table
def create_table():
    query = """
    CREATE TABLE IF NOT EXISTS todotable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    );
    """
    connection = get_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(query)
        connection.commit()
        cursor.close()
        connection.close()


# Delete table
def delete_table():
    connection = get_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute("DROP TABLE todotable")
        connection.commit()
        cursor.close()
        connection.close()


def add_entry(title):
    """
    Adding an entry, return the id of the entry
    """
    query = "INSERT INTO todotable (title) VALUES (%s);"
    values = (title,)
    connection = get_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(query, values)
        # Fetch the ID of the newly inserted row
        new_id = cursor.lastrowid
        connection.commit()
        cursor.close()
        connection.close()
        return new_id


# return a single entry
def get_entry(id):
    query = "SELECT * FROM todotable where id = %s;"
    connection = get_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(query, (id,))
        results = cursor.fetchone()
        cursor.close()
        connection.close()
        return results


# return a list of entries (tuples)
def get_entries():
    query = "SELECT * FROM todotable;"
    connection = get_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        connection.close()
        return results


# Return true if entry exists
def entry_exists(id):
    return get_entry(id) is not None


# Modifying an entry
def modify_entry(id, completed):
    query = "UPDATE todotable SET completed = %s WHERE id = %s;"
    values = (completed, id)
    connection = get_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(query, values)
        connection.commit()
        cursor.close()
        connection.close()


# Deleting an entry
def delete_entry(id):
    query = "DELETE FROM todotable WHERE id = %s;"
    connection = get_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(query, (id,))
        connection.commit()
        cursor.close()
        connection.close()


"""Website component"""
app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return json.dumps({"entries": get_entries()})


@app.route("/todos", methods=["GET"])
def get_todos():
    """Retrieve all to-do items."""
    todos = get_entries()
    todo_list = []
    if todos:
        for todo in todos:
            todo_list.append(
                {
                    "id": todo[0],
                    "title": todo[1],
                    "completed": todo[2],
                }
            )
    return jsonify({"todos": todo_list}), 200


# Example post request: Invoke-WebRequest -Uri http://localhost:5000/todos -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"title":"first task"}'
@app.route("/todos", methods=["POST"])
def create_todo():
    """Create a new to-do item."""
    data = request.get_json()
    title = data.get("title")

    if not title:
        return jsonify({"error": "Title is required"}), 400

    id = add_entry(title)
    todo = get_entry(id)

    return (
        jsonify(
            {
                "id": todo[0],
                "title": todo[1],
                "completed": todo[2],
            }
        ),
        201,
    )


@app.route("/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    """Update a specific to-do item."""
    data = request.get_json()
    completed = bool(data.get("completed"))

    # Check if entry exists
    if not entry_exists(todo_id):
        return jsonify({"error": "To-Do item not found"}), 404

    modify_entry(todo_id, completed)
    todo = get_entry(todo_id)

    return (
        jsonify(
            {
                "id": todo[0],
                "title": todo[1],
                "completed": todo[2],
            }
        ),
        200,
    )


@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    """Delete a specific to-do item."""
    delete_entry(todo_id)
    return jsonify({"message": "To-Do item deleted"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0")
