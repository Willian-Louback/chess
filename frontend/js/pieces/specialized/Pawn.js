import Piece from "../generic/Piece.js";
import Queen from "./Queen.js";
import Horse from "./Horse.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";
import verifySpiked from "../../utils/checkers/verifySpiked.js";
import verifyMoves from "../../utils/checkers/verifyMoves.js";

class Pawn extends Piece {
    constructor(column, line, color, name, id, moves, defendedPieces, spiked) {
        super(column, line, color, name, id, moves, defendedPieces, spiked);
        this.orientation = null;
        this.first = true;
        this.Queen = Queen;
        this.Horse = Horse;
        this.Bishop = Bishop;
        this.Rook = Rook;
        this.enPassant = [false, false];
    }

    generateMoves() {
        this.moves.push(
            [
                this.column,
                this.color == "white" ? this.line - 1 : this.line + 1
            ],
            [
                this.column + 1,
                this.color == "white" ? this.line - 1 : this.line + 1
            ],
            [
                this.column - 1,
                this.color == "white" ? this.line - 1 : this.line + 1
            ],
            [
                this.column,
                this.color == "white" ? this.line - 2 : this.line + 2
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

        if(!checkDangerous) {
            this.block = [];
            this.defendedPieces = [[ null, null, null, null ], [ null, null, null, null ]];
            this.spiked = null;
            this.enPassant = [false, false];
        }

        if(!checkDangerous) {
            this.addSquareMove(filteredSquares, resolve, pieces, game);
        } else {
            this.addDangerousSquares(filteredSquares);
        }
    }
}

export default Pawn;