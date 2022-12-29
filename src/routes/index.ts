import { Request, Response, Router } from "express";
import resizeImages from "./api/resize";
import path from "path";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send(path.resolve("./"));
});

routes.use("/resize", resizeImages);

export default routes;
