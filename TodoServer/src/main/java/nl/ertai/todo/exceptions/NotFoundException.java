package nl.ertai.todo.exceptions;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


public class NotFoundException extends WebApplicationException {

    private static final String NOT_FOUND = "Todo %s not found";

    /**
     * Create a HTTP 404 (Not Found) exception.
     * @param message the String that is the entity of the 404 response.
     */
    public NotFoundException(String message) {
        super(Response.status(Response.Status.NOT_FOUND).entity(message).type(MediaType.TEXT_PLAIN).build());
    }

    public NotFoundException(long id) {
        this(String.format(NOT_FOUND, id));
    }

}
