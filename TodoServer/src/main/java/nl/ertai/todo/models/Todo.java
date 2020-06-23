package nl.ertai.todo.models;

import java.time.LocalDate;

public class Todo {

    private long id;
    private String title;
    private Boolean completed;
    private LocalDate completion;
    private LocalDate expiration;

    public Todo() {
    }

    public Todo(long id, String title, LocalDate expiration) {
        this.id = id;
        this.title = title;
        this.expiration = expiration;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public LocalDate getCompletion() {
        return completion;
    }

    public void setCompletion(LocalDate completionDate) {
        this.completion = completionDate;
    }

    public LocalDate getExpiration() {
        return expiration;
    }

    public void setExpiration(LocalDate expiration) {
        this.expiration = expiration;
    }
}
