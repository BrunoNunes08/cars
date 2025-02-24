import { Router } from "express";

export const routes = Router();

routes.get("/list", (req, res) => {
    return res.status(200).json({
        data: { email, password },
        success: true,
        message: "Carros listados",
    });
});

routes.post("/register", (req, res) => {
    const { brand, licensePlate, driver } = req.body;

    if (!brand || !licensePlate || !driver) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    return res
        .status(201)
        .json({ data: 1, success: true, message: "Carro registrado" });
});

routes.patch("/parking", (req, res) => {
    const { parkingSpace } = req.body;
    if (!parkingSpace) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }
    return res
        .status(200)
        .json({ data: 1, success: true, message: "Vaga de carro alterada" });
});

routes.delete("/delete", (req, res) => {
    return res
        .status(200)
        .json({ success: true, message: "Carro deletado" });
});
