package nl.ertai.todo;

import nl.ertai.todo.exceptions.NotFoundException;
import nl.ertai.todo.models.Todo;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;
import java.util.logging.Logger;

@Path("todo")
public class TodoService extends ResourceConfig {

    private final Todos todos = new Todos();
    private static final Logger LOGGER = Logger.getLogger(TodoService.class.getName());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Todo[] getAll() {
        LOGGER.info("getAll");
        return todos.get().toArray(new Todo[0]);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Todo getTodo(@PathParam("id") long id) {
        LOGGER.info("get " + id);
        Optional<Todo> result = todos.get(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new NotFoundException(id);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Todo addTodo(Todo todo) {
        LOGGER.info("add " + todo.getTitle());
        return todos.add(todo);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Todo updateTodo(Todo todo) {
        LOGGER.info("update " + todo.getTitle());
        Optional<Todo> result = todos.update(todo);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new NotFoundException(todo.getId());
        }
    }

    @DELETE
    @Path("{id}")
    public Response deleteTodo(@PathParam("id") long id) {
        LOGGER.info("delete " + id);
        if (todos.delete(id)) {
            return Response.status(Response.Status.OK).build();
        }else {
            throw new NotFoundException(id);
        }
    }
}
