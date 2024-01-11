const verifyCheck = (color, pieces) => { // verifyblock na real
    if(
        (color == "white" && document.querySelector(".isCheckB")) ||
        (color == "black" && document.querySelector(".isCheckW"))
    ) {
        const piecesToAttack = document.querySelectorAll(".check");
        const kingId = color == "white" ? "kingB1" : "kingW1";

        if(piecesToAttack.length == 1) {
            const king = color == "white" ? pieces[1][kingId] : pieces[0][kingId];

            if(king.column == piecesToAttack[0].id[1]) {
                if(king.line > piecesToAttack[0].id[3]) {
                    const sum = piecesToAttack[0].id[3] - king.line;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${king.column}l${parseInt(piecesToAttack[0].id[3]) + i}`).classList.add("blockCheck");
                    }
                } else {
                    const sum = piecesToAttack[0].id[3] - king.line;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${king.column}l${parseInt(piecesToAttack[0].id[3]) - i}`).classList.add("blockCheck");
                    }
                }
            } else if(king.line == piecesToAttack[0].id[3]) {
                if(king.column > piecesToAttack[0].id[1]) {
                    const sum = piecesToAttack[0].id[1] - king.column;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${parseInt(piecesToAttack[0].id[1]) + i}l${king.line}`).classList.add("blockCheck");
                    }
                } else {
                    const sum = piecesToAttack[0].id[1] - king.column;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${parseInt(piecesToAttack[0].id[1]) - i}l${king.line}`).classList.add("blockCheck");
                    }
                }
            } else {
                if(king.column < piecesToAttack[0].id[1] && king.line > piecesToAttack[0].id[3]) {
                    const sum = Math.abs(piecesToAttack[0].id[1] - king.column) > Math.abs(piecesToAttack[0].id[3] - king.line) ?
                        piecesToAttack[0].id[1] - king.column :
                        piecesToAttack[0].id[3] - king.line;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${parseInt(piecesToAttack[0].id[1]) - i}l${parseInt(piecesToAttack[0].id[3]) + i}`).classList.add("blockCheck");
                    }
                } else if(king.column > piecesToAttack[0].id[1] && king.line > piecesToAttack[0].id[3]) {
                    const sum = Math.abs(piecesToAttack[0].id[1] - king.column) > Math.abs(piecesToAttack[0].id[3] - king.line) ?
                        piecesToAttack[0].id[1] - king.column :
                        piecesToAttack[0].id[3] - king.line;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${parseInt(piecesToAttack[0].id[1]) + i}l${parseInt(piecesToAttack[0].id[3]) + i}`).classList.add("blockCheck");
                    }
                } else if(king.column > piecesToAttack[0].id[1] && king.line < piecesToAttack[0].id[3]) {
                    const sum = Math.abs(piecesToAttack[0].id[1] - king.column) > Math.abs(piecesToAttack[0].id[3] - king.line) ?
                        piecesToAttack[0].id[1] - king.column :
                        piecesToAttack[0].id[3] - king.line;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${parseInt(piecesToAttack[0].id[1]) + i}l${parseInt(piecesToAttack[0].id[3]) - i}`).classList.add("blockCheck");
                    }
                } else {
                    const sum = Math.abs(piecesToAttack[0].id[1] - king.column) > Math.abs(piecesToAttack[0].id[3] - king.line) ?
                        piecesToAttack[0].id[1] - king.column :
                        piecesToAttack[0].id[3] - king.line;

                    for(let i = 1; i < Math.abs(sum); i++) {
                        document.querySelector(`#c${parseInt(piecesToAttack[0].id[1]) - i}l${parseInt(piecesToAttack[0].id[3]) - i}`).classList.add("blockCheck");
                    }
                }
            }
        }
    }
};

export default verifyCheck;