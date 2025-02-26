import { Router } from "express";
import { login, registerUser } from "../controllers/userControllers.js";

export const routes = Router();

routes.post("/register", registerUser);

routes.post("/login", login);
