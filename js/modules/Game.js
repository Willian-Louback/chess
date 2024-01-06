import generateBoard from "./generateBoard.js";
import generatePieces from "./generatePieces.js";
import clickPieceEvent from "../events/clickPieceEvent.js";

export class Game {
    constructor() {
        this.pieces;
        this.piecesToMove;
        this.turnMove = "white";
        this.resolvePromise;
        this.game;
    }

    init(game) {
        this.game = game;
        generateBoard();
        this.pieces = generatePieces();
        this.nextTime();
    }

    async nextTime() {
        this.turnMove == "white" ?
            document.querySelector(".turnMove").innerText = "Vez das: Brancas" :
            document.querySelector(".turnMove").innerText = "Vez das: Pretas";

        this.piecesToMove = document.querySelectorAll(`.${this.turnMove}`);

        await this.playerMove();

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
