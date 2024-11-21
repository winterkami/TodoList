package src;

import java.util.HashMap;

public class TaskList {

    // Store the Task objects in a HashMap with the taskID as the key
    private HashMap<Integer, Task> tasks;

    public TaskList() {
        tasks = new HashMap<>();
    }

    public void addTask(Task task) {
        tasks.put(task.getTaskID(), task);
    }

    public Task getTask(int taskID) {
        return tasks.get(taskID);
    }

    public void removeTask(int taskID) {
        tasks.remove(taskID);
    }
    
}
