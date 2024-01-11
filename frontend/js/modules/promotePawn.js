import choicePromote from "../utils/choicePromote.js";

const promotePawn = async (pieces, positionColor, squareToMove) => {
    const promote = await choicePromote(squareToMove, positionColor);

    return new Promise((resolve) => {
        let piece = null;
        let classPromote = null;

        if(promote == "queen") {
            const queens = positionColor == 0 ? document.querySelectorAll(".queenW") : document.querySelectorAll(".queenB");

            piece = positionColor == 0 ? `queenW${queens.length + 1}` : `queenB${queens.length + 1}`;
            classPromote = "Queen";
        } else if(promote == "bishop") {
            const bishops = positionColor == 0 ? document.querySelectorAll(".bishopW") : document.querySelectorAll(".bishopB");

            piece = positionColor == 0 ? `bishopW${bishops.length + 1}` : `bishopB${bishops.length + 1}`;
            classPromote = "Bishop";
        } else if(promote == "horse") {
            const horses = positionColor == 0 ? document.querySelectorAll(".horseW") : document.querySelectorAll(".horseB");

            piece = positionColor == 0 ? `horseW${horses.length + 1}` : `horseB${horses.length + 1}`;
            classPromote = "Horse";
        } else if(promote == "rook") {
            const rooks = positionColor == 0 ? document.querySelectorAll(".rookW") : document.querySelectorAll(".rookB");

            piece = positionColor == 0 ? `rookW${rooks.length + 1}` : `rookB${rooks.length + 1}`;
            classPromote = "Rook";
        }

        pieces[positionColor][piece] = new pieces[positionColor][localStorage.pieceId][classPromote](
            pieces[positionColor][localStorage.pieceId].column,
            pieces[positionColor][localStorage.pieceId].line,
            positionColor == 0 ? "white" : "black",
            piece.replace(piece[piece.length - 1], ""),
            piece
        );

        pieces[positionColor][localStorage.pieceId].removePiece();

        pieces[positionColor][localStorage.pieceId] = null;
        delete pieces[positionColor][localStorage.pieceId];


        localStorage.pieceId = piece;

        resolve();
    });
};

export default promotePawn;