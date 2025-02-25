import { Router } from "express";
import dbConnection from "../lib/db.js";

export const routes = Router();

routes.get("/list", (req, res) => {
    const query = "SELECT license_plate as licensePlate, users.name as driver, parking_space as parkingSpace FROM cars INNER JOIN users WHERE users.id = cars.driver";

    dbConnection.query(query, (err, results) => {
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

routes.post("/register", (req, res) => {
    const { brand, licensePlate, driver } = req.body;

    if (!brand || !licensePlate || !driver) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "INSERT INTO cars (brand, license_plate, driver) VALUES (?, ?, ?);";

    dbConnection.query(query, [brand, licensePlate, driver], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao cadastrar carro",
                data: err
            });
        }

        return res
            .status(201)
            .json({ data: {insertId: results.insertId}, success: true, message: "Carro registrado" });
    });
});

routes.patch("/parking/update/:car", (req, res) => {
    const { parkingSpace } = req.body;
    const id = req.params.car;
    if (!parkingSpace || !id) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "UPDATE cars SET parking_space = ? WHERE id = ?";

    dbConnection.query(query, [parkingSpace, id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao mudar carro de vaga",
                data: err
            });
        }
        
        return res
            .status(200)
            .json({ success: true, message: "Carro mudou de vaga" });
    });
});

routes.patch("/parking/delete/:car", (req, res) => {
    const id = req.params.car;
    if (!id) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }
    const query = "UPDATE cars SET parking_space = null WHERE id = ?";
    dbConnection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao tirar carro de vaga",
                data: err
            });
        }
        
        return res
            .status(200)
            .json({ success: true, message: "Carro saiu de sua vaga" });
    });
});

routes.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "DELETE FROM cars WHERE id = ?";
    dbConnection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao deletar carro",
                data: err
            });
        }
        return res
            .status(200)
            .json({ success: true, message: "Carro deletado" });
    });
});
