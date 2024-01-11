import generateBoard from "./generateBoard.js";
import generatePieces from "./generatePieces.js";
import clickPieceEvent from "../events/clickPieceEvent.js";
import otherPlayerMove from "../services/otherPlayerMove.js";
import confirmMove from "../services/confirmMove.js";
import movePieceEvent from "../events/movePieceEvent.js";

export class Game {
    constructor(color, socket) {
        this.color = color;
        this.socket = socket;
        this.pieces;
        this.piecesToMove;
        this.turnMove = "white";
        this.resolvePromise;
        this.game;
    }

    init(game) {
        console.log(this.color);
        this.game = game;
        generateBoard();
        this.pieces = generatePieces();
        this.nextTime();
    }

    async nextTime() {
        this.turnMove == "white" ?
            document.querySelector(".turnMove").innerText = "Vez das: Brancas" :
            document.querySelector(".turnMove").innerText = "Vez das: Pretas";

        // this.piecesToMove = document.querySelectorAll(`.${this.turnMove}`); Para jogar offline

        // await this.playerMove();

        // online

        this.piecesToMove = document.querySelectorAll(`.${this.color}`);

        if(this.turnMove == this.color) {
            const pieceMoved = await this.playerMove();
            confirmMove(pieceMoved, this.socket);
        } else {
            const enemyPieceMovedBrute = await otherPlayerMove(this.socket);
            const enemyPieceMoved = JSON.parse(enemyPieceMovedBrute);

            localStorage.pieceId = enemyPieceMoved.piece;
            movePieceEvent([false, enemyPieceMoved], null, this.pieces, this.turnMove, this.game);
        }

        //
        this.turnMove = this.turnMove == "black" ? "white" : "black";

        this.nextTime();
    }

    playerMove() {
        return new Promise((resolve) => {
            this.resolvePromise = resolve;

            this.piecesToMove.forEach(element => {
                element.addEventListener("click", this.initClickPieceEvent);
            });
        });
    }

    initClickPieceEvent = (e) => {
        clickPieceEvent(e, this.pieces, this.resolvePromise, this.game);
    };

    removeClickPieceEvent() {
        this.resolvePromise = "";

        this.piecesToMove.forEach(element => {
            element.removeEventListener("click", this.initClickPieceEvent);
        });
    }
}
