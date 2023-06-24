import express, { Application, Request, Response, NextFunction } from "express";
import { createServer } from "http";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";

const app: Application = express();
const port: number = 3000;

// Logging
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms"),
);

// Primary app routes
app.get("/", (req: Request, res: Response) => {
    res.send(`
    <h1>Express + TypeScript Server</h1>
    <p>Test</p>
  `);
});

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createError.NotFound(`The requested resource couldn't be found.`));
});

// Error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

// Create server instance
const server = createServer(app);

// Start the server
server.listen(port, () => {
    console.log(
        `[🚀] ~ Server started: \x1b[36mhttp://localhost:${port}\x1b[0m\nTo stop: Ctrl + C`,
    );
});
