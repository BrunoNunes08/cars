import { Router } from "express";
import dbConnection from "../lib/db.js";

export const routes = Router();

routes.post("/register", (req, res) => {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "INSERT INTO users (name, email, password, cpf) VALUES (?, ?, ?, ?)";

    dbConnection.query(query, [name, email, password, cpf], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao listar carros",
                data: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Produtos listados",
            data: results
        })
    });
});

routes.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "SELECT id, name, password FROM users WHERE email = ?";

    dbConnection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao fazer login",
                data: err
            });
        }

        if (!results[0]) {
            return res.status(400).json({
                success: false,
                message: "Email ou senha inválidos"
            });
        }

        if (results[0].password === password) {
            return res.status(500).json({
                success: true,
                message: "Login concluído",
                data: {id: results[0].id, name: results[0].name}
            });
        }

        return res.status(400).json({
            success: false,
            message: "Email ou senha inválidos"
        });
    });
});