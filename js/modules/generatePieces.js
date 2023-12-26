import Pawn from "../pieces/specialized/Pawn.js";
import Horse from "../pieces/specialized/Horse.js";
import Queen from "../pieces/specialized/Queen.js";
import King from "../pieces/specialized/King.js";
import Bishop from "../pieces/specialized/Bishop.js";
import Rook from "../pieces/specialized/Rook.js";

const generatePieces = () => {
    const whitePieces = {
        "kingW1": new King(4, 7, "white", "kingW", "kingW1"),
        "queenW1": new Queen(3, 7, "white", "queenW", "queenW1"),
        "rookW1": new Rook(0, 7, "white", "rookW", "rookW1"),
        "rookW2": new Rook(7, 7, "white", "rookW", "rookW2"),
        "bishopW1": new Bishop(2, 7, "white", "bishopW", "bishopW1"),
        "bishopW2": new Bishop(5, 7, "white", "bishopW", "bishopW2"),
        "horseW1": new Horse(1, 7, "white", "horseW", "horseW1"),
        "horseW2": new Horse(6, 7, "white", "horseW", "horseW2"),
        "pawnW1": new Pawn(0, 6, "white", "pawnW", "pawnW1"),
        "pawnW2": new Pawn(1, 6, "white", "pawnW", "pawnW2"),
        "pawnW3": new Pawn(2, 6, "white", "pawnW", "pawnW3"),
        "pawnW4": new Pawn(3, 6, "white", "pawnW", "pawnW4"),
        "pawnW5": new Pawn(4, 6, "white", "pawnW", "pawnW5"),
        "pawnW6": new Pawn(5, 6, "white", "pawnW", "pawnW6"),
        "pawnW7": new Pawn(6, 6, "white", "pawnW", "pawnW7"),
        "pawnW8": new Pawn(7, 6, "white", "pawnW", "pawnW8")
    };

    const blackPieces = {
        "kingB1": new King(4, 0, "black", "kingB", "kingB1"),
        "queenB1": new Queen(3, 0, "black", "queenB", "queenB1"),
        "rookB1": new Rook(0, 0, "black", "rookB", "rookB1"),
        "rookB2": new Rook(7, 0, "black", "rookB", "rookB2"),
        "bishopB1": new Bishop(2, 0, "black", "bishopB", "bishopB1"),
        "bishopB2": new Bishop(5, 0, "black", "bishopB", "bishopB2"),
        "horseB1": new Horse(1, 0, "black", "horseB", "horseB1"),
        "horseB2": new Horse(6, 0, "black", "horseB", "horseB2"),
        "pawnB1": new Pawn(0, 1, "black", "pawnB", "pawnB1"),
        "pawnB2": new Pawn(1, 1, "black", "pawnB", "pawnB2"),
        "pawnB3": new Pawn(2, 1, "black", "pawnB", "pawnB3"),
        "pawnB4": new Pawn(3, 1, "black", "pawnB", "pawnB4"),
        "pawnB5": new Pawn(4, 1, "black", "pawnB", "pawnB5"),
        "pawnB6": new Pawn(5, 1, "black", "pawnB", "pawnB6"),
        "pawnB7": new Pawn(6, 1, "black", "pawnB", "pawnB7"),
        "pawnB8": new Pawn(7, 1, "black", "pawnB", "pawnB8")
    };

    const pieces = [ whitePieces, blackPieces ];

    const whitePiecesArr = Object.values(whitePieces);
    const blackPiecesArr = Object.values(blackPieces);

    whitePiecesArr.forEach(element => {
        element.addPiece();
    });

    blackPiecesArr.forEach(element => {
        element.addPiece();
    });

    whitePiecesArr.forEach(element => {
        element.calculateMoves(null, pieces, true);
    });

    blackPiecesArr.forEach(element => {
        element.calculateMoves(null, pieces, true);
    });

    return pieces;
};

export default generatePieces;