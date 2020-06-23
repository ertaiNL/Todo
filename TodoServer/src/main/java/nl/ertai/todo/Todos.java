package nl.ertai.todo;

import nl.ertai.todo.models.Todo;

import java.time.LocalDate;
import java.util.*;
import java.util.function.Predicate;

public class Todos {

    private final Set<Todo> todos = new HashSet<>();
    private long lastId;

    public Todos() {
        todos.add(new Todo(getNextId(), "First", null));
        todos.add(new Todo(getNextId(), "Second", LocalDate.now().minusDays(30)));
        todos.add(new Todo(getNextId(), "Third", LocalDate.now().plusDays(30)));
    }

    public Set<Todo> get() {
        return new HashSet<>(todos);
    }

    public Optional<Todo> get(long id) {
        return todos.stream().filter(c -> c.getId() == id).findFirst();
    }

    public Todo add(Todo todo) {
        todo.setId(getNextId());
        todos.add(todo);
        return todo;
    }

    public Optional<Todo> update(Todo updated) {
        Predicate<Todo> current = c -> c.getId() == updated.getId();
        if (todos.removeIf(current)) {
            todos.add(updated);
            return Optional.of(updated);
        }
        return Optional.empty();
    }

    public boolean delete(long id) {
        Predicate<Todo> todo = c -> c.getId() == id;
        return todos.removeIf(todo);
    }

    public long getNextId() {
        return ++lastId;
    }
}
