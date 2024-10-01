package src;

import java.util.Date;

public class Task {

    private int priority;
    private String name;
    private String description;
    private Date dueDate;
    private Status status;

    public Task(int priority, String name, String description, Date dueDate, Status status) {
        this.priority = priority;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
    
}
