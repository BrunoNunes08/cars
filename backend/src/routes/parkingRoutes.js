import { Router } from "express";

export const routes = Router();

routes.post("/register", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    return res
        .status(201)
        .json({ data: 1, success: true, message: "Vaga registrada" });
});