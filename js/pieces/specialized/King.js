import Piece from "../generic/Piece.js";
import verifyMoves from "../../utils/checkers/verifyMoves.js";

class King extends Piece {
    constructor(column, line, color, name, id, moves, defendedPieces) {
        super(column, line, color, name, id, moves, defendedPieces);
        this.orientation = "kingCastling";
        this.first = true;
    }

    generateMoves() {
        this.moves.push(
            [
                this.column + 1,
                this.line + 1
            ],
            [
                this.column - 1,
                this.line + 1
            ],
            [
                this.column - 1,
                this.line - 1
            ],
            [
                this.column + 1,
                this.line - 1
            ],
            [
                this.column + 1,
                this.line
            ],
            [
                this.column - 1,
                this.line
            ],
            [
                this.column,
                this.line - 1
            ],
            [
                this.column,
                this.line + 1
            ],
            [
                this.column + 2,
                this.line
            ],
            [
                this.column - 2,
                this.line
            ]
        );
    }

    calculateMoves(resolve, pieces, checkDangerous, game) {
        this.moves = [];

        this.generateMoves();

        const filteredSquares = this.moves.filter(value => {
            const verify = verifyMoves(
                value[0],
                value[1],
                this.color,
                [this.column, this.line],
                this.block,
                this.orientation,
                pieces,
                this.id,
                this.defendedPieces,
                checkDangerous
            );

            if(!verify) {
                return false;
            }

            return true;
        });

        this.block = [];
        this.defendedPieces = [[ null, null, null, null ], [ null, null, null, null ]];

        if(!checkDangerous) {
            this.addSquareMove(filteredSquares, resolve, pieces, game);
        } else {
            this.addDangerousSquares(filteredSquares);
        }
    }
}

export default King;