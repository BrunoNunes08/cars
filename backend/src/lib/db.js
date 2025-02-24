import mysql from "mysql2";
import { dbHostEnv, dbName, dbPasswordEnv, dbUserEnv } from "./env.js";

const dbConnection = mysql.createConnection({
    host: dbHostEnv ?? "localhost",
    user: dbUserEnv ?? "root",
    password: dbPasswordEnv ?? "root",
    database: dbName ?? "cars",
});

dbConnection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("MySQL Conectado");
    }
});

export default dbConnection;
