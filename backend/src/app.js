import express from "express";
import cors from "cors";
import { portEnv } from "./lib/env.js";
import { routes as userRoutes } from "./routes/userRoutes.js";
import { routes as carRoutes } from "./routes/carRoutes.js";
import { routes as parkingRoutes } from "./routes/parkingRoutes.js";

const app = express();

const port = portEnv ?? 3333;

app.use(cors())
app.use(express.json());

app.all("/", (req, res) => {
    return res.send("Hello, World");
});
app.use("/user", userRoutes);
app.use("/car", carRoutes);
app.use("/parking", parkingRoutes);

app.listen(port, () => console.log(`Server running ${port}`));