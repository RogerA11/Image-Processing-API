import express from "express";
import routes from "./routes/index";

// create an instance of the express application
const app = express();

// set the port number for the server
const port = 3000;

// mount the router object
app.use(routes);

// start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// export the app object
export default app;
