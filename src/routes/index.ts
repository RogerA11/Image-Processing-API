import { Request, Response, Router } from "express";
import serveImage from "./api/resize";
import path from "path";

// create router
const routes = Router();

// define root route
routes.get("/", (req: Request, res: Response) => {
  res.send(path.resolve("./"));
});

// mount resizeImages router
routes.use("/resize", serveImage);

// export router
export default routes;
