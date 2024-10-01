package src;

import java.util.Date;

public class Task {

    private int taskID;
    private int priority;
    private String name;
    private String description;
    private Date dueDate;
    private Status status;

    public Task(int taskID, int priority, String name, String description, Date dueDate, Status status) {
        this.taskID = taskID;
        this.priority = priority;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }

    // the taskID is the only property that cannot change
    public int getTaskID() {
        return taskID;
    }

    public int getPriority() {
        return priority;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public Status getStatus() {
        return status;
    }


    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
