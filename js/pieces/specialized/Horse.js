import Piece from "../generic/Piece.js";
import verifyMoves from "../../utils/checkers/verifyMoves.js";
import verifySpiked from "../../utils/checkers/verifySpiked.js";

class Horse extends Piece {
    constructor(column, line, color, name, id, moves, defendedPieces, spiked) {
        super(column, line, color, name, id, moves, defendedPieces, spiked);
        this.orientation = null;
    }

    generateMoves() {
        this.moves.push(
            [
                this.column + 2,
                this.line + 1
            ],
            [
                this.column + 2,
                this.line - 1
            ],
            [
                this.column - 2,
                this.line + 1
            ],
            [
                this.column - 2,
                this.line - 1
            ],
            [
                this.column + 1,
                this.line + 2
            ],
            [
                this.column + 1,
                this.line - 2
            ],
            [
                this.column - 1,
                this.line + 2
            ],
            [
                this.column - 1,
                this.line - 2
            ]
        );
    }

    calculateMoves(resolve, pieces, checkDangerous, game) {
        this.moves = [];

        this.generateMoves();

        if(!checkDangerous) {
            this.spiked = verifySpiked(
                this.color == "white" ? pieces[0][this.id] : pieces[1][this.id],
                this.color == "white" ? pieces[0].kingW1 : pieces[1].kingB1,
                pieces
            );
        }

        const filteredSquares = this.moves.filter(value => {
            const verify = verifyMoves(
                value[0],
                value[1],
                this.color,
                [this.column, this.line],
                "noBlock",
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

        this.defendedPieces = [[ null, null, null, null ], [ null, null, null, null ]];
        this.spiked = null;

        if(!checkDangerous) {
            this.addSquareMove(filteredSquares, resolve, pieces, game);
        } else {
            this.addDangerousSquares(filteredSquares);
        }
    }
}

export default Horse;