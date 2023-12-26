import removeElement from "../utils/removeElement.js";

const clickPieceEvent = (e, pieces, resolve, game) => {
    const squareClicked = e.target;
    const positionColor = squareClicked.classList[2] == "white" ? 0 : 1;

    if(localStorage.pieceId) {
        removeElement(pieces[positionColor][localStorage.pieceId]);
    }

    localStorage.pieceId = pieces[positionColor][squareClicked.id].id;

    pieces[positionColor][squareClicked.id].calculateMoves(resolve, pieces, false, game);
};

export default clickPieceEvent;