import { Router } from "express";
import { deleteCar, listCars, registerCar, updateParkingSpace } from "../controllers/carControllers.js";

export const routes = Router();

routes.get("/list", listCars);

routes.post("/register", registerCar);

routes.patch("/parking/update/:car", updateParkingSpace);

routes.delete("/delete/:id", deleteCar);
