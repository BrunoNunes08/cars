import { Router } from "express";
import { listParking, registerParking } from "../controllers/parkingControllers.js";

export const routes = Router();

routes.post("/register", registerParking);

routes.get("/list", listParking);