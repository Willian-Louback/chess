import verifyDirection from "./verifyDirection.js";
import verifyCastling from "./verifyCastling.js";

const verifyMoves = (c, l, color, positionPiece, block, orientation, pieces, pieceId, defendedPieces, checkDangerous) => {
    if((c < 0 || c > 7) || (l < 0 || l > 7)) {
        return false;
    }

    if(!pieceId.indexOf("pawn")) {
        if(c == positionPiece[0] && checkDangerous) {
            return false;
        }

        if(
            (color == "white" ? !pieces[0][pieceId].first : !pieces[1][pieceId].first) &&
            (color == "white" ? l == positionPiece[1] - 2 : l == positionPiece[1] + 2)
        ) {
            return false;
        }
    } else if(!pieceId.indexOf("king")) {
        if(!checkDangerous) {
            if((c == positionPiece[0] + 2) || (c == positionPiece[0] - 2)) {
                const castling = verifyCastling(c, l, positionPiece, pieces, color);

                if(!castling) {
                    return false;
                }
            }
        }
    }

    const spiked = color == "white" ? pieces[0][pieceId].spiked : pieces[1][pieceId].spiked;

    if(spiked) {
        if(!pieceId.indexOf("horse")) {
            return false;
        } else if (!pieceId.indexOf("pawn")) {
            if((spiked[0] == 0 && spiked[1] == 1) || (spiked[0] == 0 && spiked[1] == -1)) { // vertical
                if(c != positionPiece[0]) {
                    return false;
                }
            } else if((spiked[0] == 1 && spiked[1] == 1) || (spiked[0] == -1 && spiked[1] == -1)) { // direita, cima e esquerda, baixo
                if (color == "white") {
                    if(c <= positionPiece[0] || l == positionPiece[1]) {
                        return false;
                    }
                } else {
                    if(c >= positionPiece[0] || l == positionPiece[1]) {
                        return false;
                    }
                }
            } else if((spiked[0] == -1 && spiked[1] == 1) || (spiked[0] == 1 && spiked[1] == -1)) { // esquerda, cima e direita, baixo
                if (color == "white") {
                    if(c >= positionPiece[0] || l == positionPiece[1]) {
                        return false;
                    }
                } else {
                    if(c <= positionPiece[0] || l == positionPiece[1]) {
                        return false;
                    }
                }
            }
        } else if((spiked[0] == 1 && spiked[1] == 0) || (spiked[0] == -1 && spiked[1] == 0)) { // horizontal
            if(c == positionPiece[0] || l != positionPiece[1]) {
                return false;
            }
        } else if((spiked[0] == 0 && spiked[1] == 1) || (spiked[0] == 0 && spiked[1] == -1)) { // vertical
            if(c != positionPiece[0] || l == positionPiece[1]) {
                return false;
            }
        } else if((spiked[0] == 1 && spiked[1] == 1) || (spiked[0] == -1 && spiked[1] == -1)) { // direita, cima e esquerda, baixo
            if((c <= positionPiece[0] && l <= positionPiece[1]) || (c >= positionPiece[0] && l >= positionPiece[1])) {
                return false;
            }
        } else if((spiked[0] == -1 && spiked[1] == 1) || (spiked[0] == 1 && spiked[1] == -1)) { // esquerda, cima e direita, baixo
            if((c <= positionPiece[0] && l >= positionPiece[1]) || (c >= positionPiece[0] && l <= positionPiece[1])) {
                return false;
            }
        }
    }

    // verificar se uma peça está bloqueando a outra
    const parentToVerify = document.querySelector(`#c${c}l${l}`);

    const squareToVerify = parentToVerify.querySelectorAll("*");

    if(parentToVerify.hasChildNodes()) {
        verifyBlock(squareToVerify, c, l, positionPiece, block, pieceId);
    }

    //

    // checkLimit - aqui bloqueia outras peças de mexer quando o rei está em check
    const king = color == "white" ? "kingW1" : "kingB1";

    if(
        (color == "white" && document.querySelector(".isCheckW")) ||
        (color == "black" && document.querySelector(".isCheckB"))
    ) {
        const piecesToAttack = document.querySelectorAll(".check");

        if(piecesToAttack.length > 1) {
            if(king != pieceId) {
                return false;
            }
        }

        if((!parentToVerify.classList.contains("blockCheck") && king != pieceId) && (!parentToVerify.classList.contains("check"))) {
            return false;
        }
    }

    //

    // verificar em quais casas o rei pode ir, evitando as que estão sendo atacadas

    const kingDangerous = verifyKingDangerous(king, pieceId, parentToVerify, color, positionPiece, c, l);

    if(kingDangerous) {
        return false;
    }

    //

    // Verificando se o caminho está bloqueado por uma peça

    if(block && block != "noBlock" && block.length > 0) {
        let isBlocked = false;

        if(!pieceId.indexOf("pawn") && block[0].cartesianPosition[0] == 0) {
            if(color == "white") {
                if(l < block[0].coord[1]) {
                    return false;
                }
            } else {
                if(l > block[0].coord[1]) {
                    return false;
                }
            }
        } else {
            block.forEach(element => {
                if(orientation == "diagonal" || orientation == "mixed") {
                    if(element.cartesianPosition[0] == 1 && element.cartesianPosition[1] == 1) {
                        if(c > element.coord[0] && l < element.coord[1]) {
                            isBlocked = true;
                        }
                    } else if(element.cartesianPosition[0] == -1 && element.cartesianPosition[1] == 1) {
                        if(c < element.coord[0] && l < element.coord[1]) {
                            isBlocked = true;
                        }
                    } else if(element.cartesianPosition[0] == -1 && element.cartesianPosition[1] == -1) {
                        if(c < element.coord[0] && l > element.coord[1]) {
                            isBlocked = true;
                        }
                    } else if(element.cartesianPosition[0] == 1 && element.cartesianPosition[1] == -1) {
                        if(c > element.coord[0] && l > element.coord[1]) {
                            isBlocked = true;
                        }
                    }
                }

                if(orientation == "h/v" || orientation == "mixed" || orientation == "kingCastling"){
                    if(element.cartesianPosition[0] == 1 && element.cartesianPosition[1] == 0) {
                        if(c > element.coord[0] && l == element.coord[1]) {
                            isBlocked = true;
                        }
                    } else if(element.cartesianPosition[0] == -1 && element.cartesianPosition[1] == 0) {
                        if(c < element.coord[0] && l == element.coord[1]) {
                            isBlocked = true;
                        }
                    } else if(element.cartesianPosition[0] == 0 && element.cartesianPosition[1] == 1) {
                        if(c == element.coord[0] && l < element.coord[1]) {
                            isBlocked = true;
                        }
                    } else if(element.cartesianPosition[0] == 0 && element.cartesianPosition[1] == -1) {
                        if(c == element.coord[0] && l > element.coord[1]) {
                            isBlocked = true;
                        }
                    }
                }
            });
        }

        if(isBlocked) {
            return false;
        }
    }

    if(parentToVerify.hasChildNodes()) {
        if(color == "white") {
            if(squareToVerify[0].classList.contains("black")) {
                if(!pieceId.indexOf("pawn") && c == positionPiece[0]) {
                    return false;
                }

                if(squareToVerify[0].classList.contains("kingB")) {
                    squareToVerify[0].parentNode.classList.add("isCheckB");
                    pieces[0][pieceId].addCheck();
                }

                return true;
            } else if(squareToVerify[0].classList.contains("white")) {
                if(checkDangerous) {
                    const direction = verifyDirection(c, l, positionPiece);

                    if(direction[0] == 1 && direction[1] == 0) { // direita
                        if(!defendedPieces[0][0]) {
                            defendedPieces[0][0] = true;

                            return true;
                        }
                    } else if(direction[0] == -1 && direction[1] == 0) { // esquerda
                        if(!defendedPieces[0][1]) {
                            defendedPieces[0][1] = true;

                            return true;
                        }
                    } else if(direction[0] == 0 && direction[1] == 1) { // cima
                        if(!defendedPieces[0][2]) {
                            defendedPieces[0][2] = true;

                            return true;
                        }
                    } else if(direction[0] == 0 && direction[1] == -1) { // baixo
                        if(!defendedPieces[0][3]) {
                            defendedPieces[0][3] = true;

                            return true;
                        }
                    } else if(direction[0] == 1 && direction[1] == 1) { // direita, cima
                        if(!defendedPieces[1][0]) {
                            defendedPieces[1][0] = true;

                            return true;
                        }
                    } else if(direction[0] == -1 && direction[1] == 1) { // esquerda, cima
                        if(!defendedPieces[1][1]) {
                            defendedPieces[1][1] = true;

                            return true;
                        }
                    } else if(direction[0] == 1 && direction[1] == -1) { // direita, baixo
                        if(!defendedPieces[1][2]) {
                            defendedPieces[1][2] = true;

                            return true;
                        }
                    } else { // esquerda, baixo
                        if(!defendedPieces[1][3]) {
                            defendedPieces[1][3] = true;

                            return true;
                        }
                    }
                }


                return false;
            }
        } else {
            if(squareToVerify[0].classList.contains("black")) {
                if(checkDangerous) {
                    const direction = verifyDirection(c, l, positionPiece);

                    if(direction[0] == 1 && direction[1] == 0) { // direita
                        if(!defendedPieces[0][0]) {
                            defendedPieces[0][0] = true;

                            return true;
                        }
                    } else if(direction[0] == -1 && direction[1] == 0) { // esquerda
                        if(!defendedPieces[0][1]) {
                            defendedPieces[0][1] = true;

                            return true;
                        }
                    } else if(direction[0] == 0 && direction[1] == 1) { // cima
                        if(!defendedPieces[0][2]) {
                            defendedPieces[0][2] = true;

                            return true;
                        }
                    } else if(direction[0] == 0 && direction[1] == -1) { // baixo
                        if(!defendedPieces[0][3]) {
                            defendedPieces[0][3] = true;

                            return true;
                        }
                    } else if(direction[0] == 1 && direction[1] == 1) { // direita, cima
                        if(!defendedPieces[1][0]) {
                            defendedPieces[1][0] = true;

                            return true;
                        }
                    } else if(direction[0] == -1 && direction[1] == 1) { // esquerda, cima
                        if(!defendedPieces[1][1]) {
                            defendedPieces[1][1] = true;

                            return true;
                        }
                    } else if(direction[0] == 1 && direction[1] == -1) { // direita, baixo
                        if(!defendedPieces[1][2]) {
                            defendedPieces[1][2] = true;

                            return true;
                        }
                    } else { // esquerda, baixo
                        if(!defendedPieces[1][3]) {
                            defendedPieces[1][3] = true;

                            return true;
                        }
                    }
                }

                return false;
            } else if(squareToVerify[0].classList.contains("white")) {
                if(!pieceId.indexOf("pawn") && c == positionPiece[0]) {
                    return false;
                }

                if(squareToVerify[0].classList.contains("kingW")) {
                    squareToVerify[0].parentNode.classList.add("isCheckW");
                    pieces[1][pieceId].addCheck();
                }

                return true;
            }
        }
    }

    if(!pieceId.indexOf("pawn") && c != positionPiece[0] && !checkDangerous) {
        const positionColor = color == "white" ? 0 : 1;
        if(c < positionPiece[0] && pieces[positionColor][pieceId].enPassant[0] || c > positionPiece[0] && pieces[positionColor][pieceId].enPassant[1]) {
            return true;
        } else {
            return false;
        }
    }

    return true;
};

const verifyBlock = (squareToVerify, c, l, positionPiece, block) => {
    if(squareToVerify[0].classList.contains("piece") && block != "noBlock") {
        const direction = verifyDirection(c, l, positionPiece);

        block.push({
            "cartesianPosition": direction,
            "coord": [c, l]
        });
    }
};

// esquivar de quadrados perigosos

const verifyKingDangerous = (king, pieceId, parentToVerify, color, positionPiece, c, l) => {
    if(king == pieceId) {
        let piecesCheck = document.querySelectorAll(".check");
        let position = 0;

        if(piecesCheck.length > 1) {
            if(piecesCheck[0].firstChild.classList.contains("horseW") || piecesCheck[0].firstChild.classList.contains("horseB")) {
                position++;
            }
        } else if(piecesCheck.length > 0) {
            if(
                piecesCheck[0].firstChild.classList.contains("horseW") ||
                piecesCheck[0].firstChild.classList.contains("horseB") ||
                piecesCheck[0].firstChild.classList.contains("pawnW")  ||
                piecesCheck[0].firstChild.classList.contains("pawnB")
            ) {
                piecesCheck = [];
            }
        }

        const directionBlock = piecesCheck.length > 0 ? verifyDirection(
            document.querySelectorAll(".check")[position].id[1],
            document.querySelectorAll(".check")[position].id[3],
            positionPiece
        ) : [0, 0];

        const directionMove = verifyDirection(c, l, positionPiece);

        if(color == "white") {
            if(parentToVerify.classList.contains("dangerousSquareB")) {
                return true;
            }
        } else {
            if(parentToVerify.classList.contains("dangerousSquareW")) {
                return true;
            }
        }

        if(directionBlock[0] == 1 && directionBlock[1] == 0) { // direita
            if(directionMove[0] == -1 && directionMove[1] == 0) {
                return true;
            }
        } else if(directionBlock[0] == -1 && directionBlock[1] == 0) { // esquerda
            if(directionMove[0] == 1 && directionMove[1] == 0) {
                return true;
            }
        } else if(directionBlock[0] == 0 && directionBlock[1] == 1) { // cima
            if(directionMove[0] == 0 && directionMove[1] == -1) {
                return true;
            }
        } else if(directionBlock[0] == 0 && directionBlock[1] == -1) { // baixo
            if(directionMove[0] == 0 && directionMove[1] == 1) {
                return true;
            }
        } else if(directionBlock[0] == 1 && directionBlock[1] == 1) { // direita, cima
            if(directionMove[0] == -1 && directionMove[1] == -1) {
                return true;
            }
        } else if(directionBlock[0] == -1 && directionBlock[1] == 1) { // esquerda, cima
            if(directionMove[0] == 1 && directionMove[1] == -1) {
                return true;
            }
        } else if(directionBlock[0] == 1 && directionBlock[1] == -1) { // direita, baixo
            if(directionMove[0] == -1 && directionMove[1] == 1) {
                return true;
            }
        } else if(directionBlock[0] == -1 && directionBlock[1] == -1){ // esquerda, baixo
            if(directionMove[0] == 1 && directionMove[1] == 1) {
                return true;
            }
        }
    }

    return false;
};

//

export default verifyMoves;