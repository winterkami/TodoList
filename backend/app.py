from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for the to-do list
todo_list = []

@app.route('/todos', methods=['GET'])
def get_todos():
    """Retrieve all to-do items."""
    return jsonify({'todos': todo_list}), 200


# Example post request: Invoke-WebRequest -Uri http://localhost:5000/todos -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"title":"first task"}'    
@app.route('/todos', methods=['POST'])
def create_todo():
    """Create a new to-do item."""
    data = request.get_json()
    title = data.get('title')

    if not title:
        return jsonify({'error': 'Title is required'}), 400

    # Dummy todo item
    todo_item = {
        'id': len(todo_list) + 1,
        'title': title,
        'completed': False
    }
    todo_list.append(todo_item)
    return jsonify(todo_item), 201

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """Update a specific to-do item."""
    data = request.get_json()
    title = data.get('title')
    completed = data.get('completed')

    # Find the to-do item by ID
    todo_item = next((todo for todo in todo_list if todo['id'] == todo_id), None)
    if not todo_item:
        return jsonify({'error': 'To-Do item not found'}), 404

    # Update fields if provided
    if title is not None:
        todo_item['title'] = title
    if completed is not None:
        todo_item['completed'] = completed

    return jsonify(todo_item), 200

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """Delete a specific to-do item."""
    global todo_list
    todo_list = [todo for todo in todo_list if todo['id'] != todo_id]
    return jsonify({'message': 'To-Do item deleted'}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
