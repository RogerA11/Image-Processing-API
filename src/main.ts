import express from "express";
import logger from "./utilities/logger"

const app = express();
const port = 3000;
const api: string = "/test";

// create an api
app.get(api, logger, (req, res) => {
  // send response
  res.send("API test successful!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});


export default app;