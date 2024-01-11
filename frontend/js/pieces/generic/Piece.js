import movePieceEvent from "../../events/movePieceEvent.js";

class Piece {
    constructor(column, line, color, name, id) {
        this.color = color;
        this.line = line;
        this.column = column;
        this.name = name;
        this.id = id;
        this.resolvePromise;
        this.pieces;
        this.block = [];
        this.moves = [];
        this.defendedPieces = [[ null, null, null, null ], [ null, null, null, null ]]; // (vertical e horizontal) e diagonal
        this.spiked = null;
        this.game;
    }

    addPiece() {
        const square = document.querySelector(`#c${this.column}l${this.line}`);

        const piece = square.appendChild(document.createElement("div"));

        piece.classList.add("piece");

        piece.classList.add(this.name);

        piece.classList.add(this.color);

        piece.id = this.id;
    }

    removePiece() {
        const square = document.querySelector(`#c${this.column}l${this.line}`);

        square.querySelectorAll("*")[0].remove();
    }

    addCheck() {
        const pieceCheck = document.querySelector(`#c${this.column}l${this.line}`);

        pieceCheck.classList.add("check");
    }

    addDangerousSquares(dangerousSquares) {
        dangerousSquares.forEach(values => {
            const element = document.querySelector(`#c${values[0]}l${values[1]}`);

            if(this.color == "white") {
                element.classList.add("dangerousSquareW");
            } else {
                element.classList.add("dangerousSquareB");
            }
        });
    }

    addSquareMove(squaresToMove, resolve, pieces, game) {
        this.resolvePromise = resolve;

        this.pieces = pieces;

        if(!this.game) {
            this.game = game;
        }

        squaresToMove.forEach(values => {
            const element = document.querySelector(`#c${values[0]}l${values[1]}`);

            element.appendChild(document.createElement("div")).classList.add("moveSquare");

            element.addEventListener("click", this.initEventMove);
        });
    }

    initEventMove = (e) => {
        movePieceEvent(e, this.resolvePromise, this.pieces, this.color, this.game);
    };
}

export default Piece;