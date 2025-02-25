import { Router } from "express";
import dbConnection from "../lib/db.js";

export const routes = Router();

routes.post("/register", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "INSERT INTO parking_spaces (id) VALUES (?)";

    dbConnection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao criar vaga",
                data: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Vaga criada",
            data: results
        })
    });
    
    return res
        .status(201)
        .json({ data: 1, success: true, message: "Vaga registrada" });
});