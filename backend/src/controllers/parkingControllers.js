import dbConnection from "../lib/db.js";

export const registerParking = (req, res) => {
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

        res.status(201).json({
            success: true,
            message: "Vaga criada",
            data: results.insertId
        })
    });
}

export const listParking = (req, res) => {
    const query = "SELECT * FROM parking_spaces";

    dbConnection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao listar vagas",
                data: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Vagas listadas",
            data: results
        })
    });
};