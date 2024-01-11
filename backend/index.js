import express from "express";
import cors from "cors";
// import connectWebSocket from "./config/ws.js";
import "dotenv/config";

import { WebSocketServer } from "ws";
import verifyNewPlayer from "./utils/checkers/verifyNewPlayer.js";
import verifyPlayerColor from "./utils/checkers/verifyPlayerColor.js";

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Servidor conectado na porta: ${port}`);
});

const wss = new WebSocketServer({ server });
const users = [];

wss.on("connection", (ws) => {
    console.log("Usuário conectado");

    ws.on("message", (data) => {
        data = JSON.parse(data);
        console.log("new message:", data);

        if(verifyNewPlayer(data)) {
            const isWhite = verifyPlayerColor(users);

            if(isWhite) {
                users.push({
                    color: "white",
                    id: data[1],
                    socket: ws
                });
            } else {
                users.push({
                    color: "black",
                    id: data[1],
                    socket: ws
                });
            }

            ws.send(users[users.length - 1].color);
        } else { // Só para testar, depois eu arrumo isso
            users.forEach((user) => {
                if(user.socket != ws) {
                    user.socket.send(JSON.stringify(data));
                    return;
                }
            });

        }
    });

    ws.on("close", () => {
        users.forEach((user, index) => { // Por enquanto o jogador não vai conseguir relogar caso a internet caia ou algo do tipo
            if(user.socket == ws) {
                console.log("user desconectado", user.id);
                users.splice(index, 1);
                return;
            }
        });
    });
});