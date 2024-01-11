import express from "express";
import cors from "cors";
// import { WebSocketServer } from "ws";
import connectWebSocket from "./config/ws.js";
import "dotenv/config";

const app = express();
app.use(cors);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Servidor conectado na porta: ${port}`);
});

connectWebSocket(server);