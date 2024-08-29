import { Router } from "express";
import { ExpressUserController } from "./ExpressUserController";

const ExpressUserRouter = Router();

const userController = new ExpressUserController();

ExpressUserRouter.get("/users", userController.getAll);
ExpressUserRouter.get("/users/:id", userController.getOneById);
ExpressUserRouter.post("/users", userController.create);
ExpressUserRouter.put("/users/:id", userController.edit);
ExpressUserRouter.delete("/users/:id", userController.delete);

export { ExpressUserRouter }