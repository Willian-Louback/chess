import verifyDirection from "./verifyDirection.js";

const verifySpiked = (piece, king, pieces) => {
    const direction = verifyDirection(king.column, king.line, [ piece.column, piece.line ]);

    const biggest = Math.abs(king.column - piece.column) > Math.abs(king.line - piece.line) ?
        Math.abs(king.column - piece.column) :
        Math.abs(king.line - piece.line);

    if(direction[0] == 1 && direction[1] == 0) { // direita
        const verifyColumn = Math.abs(piece.column + biggest);

        if(verifyColumn == king.column) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column + i}l${piece.line}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column - i}l${piece.line}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {

                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [-1, 0];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [-1, 0];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else if(direction[0] == -1 && direction[1] == 0) { // esquerda
        const verifyColumn = Math.abs(piece.column - biggest);

        if(verifyColumn == king.column) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column - i}l${piece.line}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column + i}l${piece.line}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {
                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [1, 0];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [1, 0];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else if(direction[0] == 0 && direction[1] == 1) { // cima
        const verifyline = Math.abs(piece.line - biggest);

        if(verifyline == king.line) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column}l${piece.line - i}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column}l${piece.line + i}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {
                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [0, -1];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [0, -1];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else if(direction[0] == 0 && direction[1] == -1) { // baixo
        const verifyline = Math.abs(piece.line + biggest);

        if(verifyline == king.line) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column}l${piece.line + i}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column}l${piece.line - i}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {
                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [0, 1];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "h/v" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [0, 1];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else if(direction[0] == 1 && direction[1] == 1) { // direita, cima
        const verifyColumn = Math.abs(piece.column + biggest);
        const verifyline = Math.abs(piece.line - biggest);

        if(verifyColumn == king.column && verifyline == king.line) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column + i}l${piece.line - i}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column - i}l${piece.line + i}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {
                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [-1, -1];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [-1, -1];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else if(direction[0] == -1 && direction[1] == 1) { // esquerda, cima
        const verifyColumn = Math.abs(piece.column - biggest);
        const verifyline = Math.abs(piece.line - biggest);

        if(verifyColumn == king.column && verifyline == king.line) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column - i}l${piece.line - i}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column + i}l${piece.line + i}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {
                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [1, -1];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [1, -1];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else if(direction[0] == 1 && direction[1] == -1) { // direita, baixo
        const verifyColumn = Math.abs(piece.column + biggest);
        const verifyline = Math.abs(piece.line + biggest);

        if(verifyColumn == king.column && verifyline == king.line) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column + i}l${piece.line + i}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column - i}l${piece.line - i}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {
                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [-1, 1];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [-1, 1];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else { // esquerda, baixo
        const verifyColumn = Math.abs(piece.column - biggest);
        const verifyline = Math.abs(piece.line + biggest);

        if(verifyColumn == king.column && verifyline == king.line) {
            let pieceAlone = false;

            for(let i = 1; i < biggest; i++) {
                const verifySquare = document.querySelector(`#c${piece.column - i}l${piece.line + i}`);

                if(verifySquare.hasChildNodes()) {
                    pieceAlone = true;
                }
            }

            if(!pieceAlone) {
                for(let i = 1; i < 8; i++) {
                    const verifySquare = document.querySelector(`#c${piece.column + i}l${piece.line - i}`);

                    if(verifySquare != null && verifySquare.hasChildNodes()) {
                        if(piece.color == "white") {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("black")
                                ) &&
                                (
                                    pieces[1][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[1][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [1, 1];
                            } else {
                                return;
                            }
                        } else {
                            if(
                                (
                                    verifySquare.firstChild.classList.contains("white")
                                ) &&
                                (
                                    pieces[0][verifySquare.firstChild.id].orientation == "diagonal" ||
                                    pieces[0][verifySquare.firstChild.id].orientation == "mixed"
                                )
                            ) {
                                return [1, 1];
                            } else {
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
};

export default verifySpiked;