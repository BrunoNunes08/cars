import dbConnection from "../lib/db.js";

export const listCars = (_, res) => {
    const query =
        "SELECT license_plate as licensePlate, users.name as driver, users.id as driverId, parking_space as parkingSpace FROM cars INNER JOIN users WHERE users.id = cars.driver";

    dbConnection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao listar carros",
                data: err,
            });
        }

        res.status(200).json({
            success: true,
            message: "Produtos listados",
            data: results,
        });
    });
};

export const registerCar = (req, res) => {
    const { brand, licensePlate, driver } = req.body;

    if (!brand || !licensePlate || !driver) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "INSERT INTO cars (brand, license_plate, driver) VALUES (?, ?, ?);";

    dbConnection.query(query, [brand, licensePlate, driver], (err, results) => {
        if (err?.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                success: false,
                message: "Placa já em uso",
                data: err,
            });
        }

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
};

export const updateParkingSpace = (req, res) => {
    const { parkingSpace } = req.body;
    const licensePlate = req.params.car;
    if (parkingSpace === undefined || !licensePlate) {
        return res
            .status(400)
            .json({ message: "Dados mal formatados", success: false });
    }

    const query = "UPDATE cars SET parking_space = ? WHERE license_plate = ?";

    dbConnection.query(query, [parkingSpace, licensePlate], (err, results) => {
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
};

export const deleteCar = (req, res) => {
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
};