import { Router } from "express";

export const routes = Router();

routes.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    return res
        .status(201)
        .json({ data: 1, success: true, message: "Usuário criado" });
});

routes.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    return res
        .status(201)
        .json({ data: {email, password}, success: true, message: "Usuário logado" });
});