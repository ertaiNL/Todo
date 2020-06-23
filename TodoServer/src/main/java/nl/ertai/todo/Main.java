package nl.ertai.todo;

import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.io.IOException;
import java.net.URI;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {

    public static final String BASE_URI = "http://localhost:8080";
    public static final String PACKAGE = "nl.ertai.todo";

    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());

    private static ResourceConfig getResourceConfig() {
        ResourceConfig rc = new ResourceConfig();
        rc.packages(PACKAGE);
        rc.register(CORSFilter.class);
        return rc;
    }

    public static void main(String[] args) {
        try {
            GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), getResourceConfig());

            if (LOGGER.isLoggable(Level.INFO)) {
                LOGGER.info(String.format("Jersey app at %s. Press any key to stop the server...", BASE_URI));
            }
            System.in.read();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
