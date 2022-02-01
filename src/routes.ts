import { request, Router } from "express";
import { CreateUserController } from "./controlers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

router.post("/users", createUserController.handle);

export {router};