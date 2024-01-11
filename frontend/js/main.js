import { Game } from "./modules/Game.js";
import connectWebSocket from "./services/connectWebSocket.js";

const config = await connectWebSocket();

const game = new Game(config.color, config.socket);

game.init(game);