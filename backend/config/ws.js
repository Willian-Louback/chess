import { WebSocketServer } from "ws";
import verifyNewPlayer from "../utils/checkers/verifyNewPlayer.js";
import verifyPlayerColor from "../utils/checkers/verifyPlayerColor.js";

const connectWebSocket = (server) => {
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
};

export default connectWebSocket;