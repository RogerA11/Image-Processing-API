import { Request, Response, Router } from "express";
import resizeImages from "./api/resize";
import path from "path";

// create router
const routes = Router();

// define root route
routes.get("/", (req: Request, res: Response) => {
  res.send(path.resolve("./"));
});

// mount resizeImages router
routes.use("/resize", resizeImages);

// export router
export default routes;
