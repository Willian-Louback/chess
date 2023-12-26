import removeElement from "../utils/removeElement.js";
import verifyCheck from "../utils/checkers/verifyCheck.js";
import promotePawn from "../modules/promotePawn.js";

const movePieceEvent = async (e, resolve, pieces, color, game) => {
    const squareToMove = e.target.hasChildNodes() ? e.target : e.target.parentNode;
    const positionColor = color == "white" ? 0 : 1;
    const positionColorReverse = color == "white" ? 1 : 0;
    let promote = false;

    // removendo eventsClick e classe moveSquare

    removeElement(pieces[positionColor][localStorage.pieceId]);
    game.removeClickPieceEvent();

    //

    if(
        (
            pieces[positionColor][localStorage.pieceId].name == "pawnW" ||
            pieces[positionColor][localStorage.pieceId].name == "pawnB"
        ) || (
            pieces[positionColor][localStorage.pieceId].name == "kingW" ||
            pieces[positionColor][localStorage.pieceId].name == "kingB"
        ) || (
            pieces[positionColor][localStorage.pieceId].name == "rookB" ||
            pieces[positionColor][localStorage.pieceId].name == "rookW"
        )
    ) {
        if(pieces[positionColor][localStorage.pieceId].first) {
            pieces[positionColor][localStorage.pieceId].first = false;
        }
    }

    // verificar se o peão precisa ser promovido ou se permite en passant
    if(pieces[positionColor][localStorage.pieceId].name == "pawnW" || pieces[positionColor][localStorage.pieceId].name == "pawnB") {
        if(squareToMove.id[3] == 0 || squareToMove.id[3] == 7) {
            await promotePawn(pieces, positionColor, squareToMove);
            promote = true;
        } else if(
            pieces[positionColor][localStorage.pieceId].line == parseInt(squareToMove.id[3]) + 2 ||
            pieces[positionColor][localStorage.pieceId].line == parseInt(squareToMove.id[3]) - 2
        ) {
            const pawnName = color == "white" ? "pawnB" : "pawnW";

            if(squareToMove.id[1] != 7) {
                if(document.querySelector(`#c${parseInt(squareToMove.id[1]) + 1}l${squareToMove.id[3]}`).hasChildNodes()) {
                    if(document.querySelector(`#c${parseInt(squareToMove.id[1]) + 1}l${squareToMove.id[3]}`).firstChild.classList.contains(pawnName)) {
                        pieces[positionColorReverse][document.querySelector(`#c${parseInt(squareToMove.id[1]) + 1}l${squareToMove.id[3]}`).firstChild.id].enPassant[0] = true;
                    }
                }
            }

            if(squareToMove.id[1] != 0) {
                if(document.querySelector(`#c${parseInt(squareToMove.id[1]) - 1}l${squareToMove.id[3]}`).hasChildNodes()) {
                    if(document.querySelector(`#c${parseInt(squareToMove.id[1]) - 1}l${squareToMove.id[3]}`).firstChild.classList.contains(pawnName)) {
                        pieces[positionColorReverse][document.querySelector(`#c${parseInt(squareToMove.id[1]) - 1}l${squareToMove.id[3]}`).firstChild.id].enPassant[1] = true;
                    }
                }
            }
        }
    }

    //

    // parte relacionada a captura da peça, separar em outro arquivo

    if(
        squareToMove.querySelector(`.piece`) ||
        (
            (
                pieces[positionColor][localStorage.pieceId].name == "pawnW" &&
                squareToMove.id[1] != pieces[positionColor][localStorage.pieceId].column
            ) && (
                !squareToMove.querySelector(`.piece`)
            )
        ) ||
            (
                pieces[positionColor][localStorage.pieceId].name == "pawnB" &&
                squareToMove.id[1] != pieces[positionColor][localStorage.pieceId].column
            ) && (
                !squareToMove.querySelector(`.piece`)
            )
    ) {
        if(squareToMove.querySelector(".piece")) {
            const pieceToRemove = pieces[positionColorReverse][squareToMove.querySelector(".piece").id].id;

            pieces[positionColorReverse][squareToMove.querySelector(`.piece`).id].removePiece();

            pieces[positionColorReverse][pieceToRemove] = null;
            delete pieces[positionColorReverse][pieceToRemove];
        } else {
            const deletePiece = color == "white" ?
                document.querySelector(`#c${squareToMove.id[1]}l${parseInt(squareToMove.id[3]) + 1}`) :
                document.querySelector(`#c${squareToMove.id[1]}l${parseInt(squareToMove.id[3]) - 1}`);

            const pieceToRemove = pieces[positionColorReverse][deletePiece.querySelector(`.piece`).id].id;

            pieces[positionColorReverse][deletePiece.querySelector(`.piece`).id].removePiece();

            pieces[positionColorReverse][pieceToRemove] = null;
            delete pieces[positionColorReverse][pieceToRemove];
        }
    }
    //

    //roque
    if(!localStorage.pieceId.indexOf("king")) {
        const king = color == "white" ? "kingW1" : "kingB1";
        const rookId1 = color == "white" ? "rookW1" : "rookB1";
        const rookId2 = color == "white" ? "rookW2" : "rookB2";

        if(squareToMove.id[1] == parseInt(document.querySelector(`#${king}`).parentNode.id[1]) + 2) {
            pieces[positionColor][rookId2].removePiece();

            pieces[positionColor][rookId2].column = parseInt(squareToMove.id[1]) - 1;
            pieces[positionColor][rookId2].line = parseInt(squareToMove.id[3]);

            pieces[positionColor][rookId2].addPiece();
        } else if(squareToMove.id[1] == parseInt(document.querySelector(`#${king}`).parentNode.id[1]) - 2) {
            pieces[positionColor][rookId1].removePiece();

            pieces[positionColor][rookId1].column = parseInt(squareToMove.id[1]) + 1;
            pieces[positionColor][rookId1].line = parseInt(squareToMove.id[3]);

            pieces[positionColor][rookId1].addPiece();
        }
    }

    //

    if(!promote) {
        pieces[positionColor][localStorage.pieceId].removePiece();
    }

    // mover peça

    pieces[positionColor][localStorage.pieceId].column = parseInt(squareToMove.id[1]);
    pieces[positionColor][localStorage.pieceId].line = parseInt(squareToMove.id[3]);

    pieces[positionColor][localStorage.pieceId].addPiece();

    //

    // remover classes dangerous, estruturar melhor depois
    document.querySelectorAll(".dangerousSquareW").forEach(element => {
        element.classList.remove("dangerousSquareW");
    });

    document.querySelectorAll(".dangerousSquareB").forEach(element => {
        element.classList.remove("dangerousSquareB");
    });

    document.querySelectorAll(".blockCheck").forEach(element => {
        element.classList.remove("blockCheck");
    });

    document.querySelectorAll(".check").forEach(element => {
        element.classList.remove("check");
    });

    const isCheckW = document.querySelector(".isCheckW");
    const isCheckB = document.querySelector(".isCheckB");

    if(isCheckW) {
        isCheckW.classList.remove("isCheckW");
    }

    if(isCheckB) {
        isCheckB.classList.remove("isCheckB");
    }

    //

    // adicionar os dangerous
    const whitePiecesArr = Object.values(pieces[0]);
    const blackPiecesArr = Object.values(pieces[1]);

    if(color == "white") {
        whitePiecesArr.forEach(element => {
            element.calculateMoves(null, pieces, true);
        });

        verifyCheck(color, pieces);

        blackPiecesArr.forEach(element => {
            element.calculateMoves(null, pieces, true);
        });
    } else {
        blackPiecesArr.forEach(element => {
            element.calculateMoves(null, pieces, true);
        });

        verifyCheck(color, pieces);

        whitePiecesArr.forEach(element => {
            element.calculateMoves(null, pieces, true);
        });
    }

    //

    resolve();
};

export default movePieceEvent;