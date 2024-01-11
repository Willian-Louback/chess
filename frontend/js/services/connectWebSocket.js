import { baseUrl } from "../utils/baseUrl.js";

const connect = async () => {
    return new Promise((resolve) => {
        const socket = new WebSocket(baseUrl);
        let first = true;

        socket.onopen = () => {
            if(!localStorage.idPlayer || first){
                localStorage.idPlayer = Math.floor(Math.random() * 1000); // Arrumar esse método de gerar id
            }

            if(first) {
                first = false;
            }

            console.log(localStorage.idPlayer);
            socket.send(JSON.stringify(["newPlayer", localStorage.idPlayer]));
        };

        const selectPlayer = (event) => {
            socket.removeEventListener("message", selectPlayer);

            return resolve({
                color: event.data,
                socket: socket
            });
        };

        socket.addEventListener("message", selectPlayer);
    });

};
export default connect;