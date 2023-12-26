import board from "../utils/board.js";

const generateBoard = () => {
    board.style.gridTemplateColumns = "repeat(8, 1fr)";
    board.style.gridTemplateRows = "repeat(8, 1fr)";

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            const square = board.appendChild(document.createElement("div"));

            square.classList.add("square");
            square.id = `c${j}l${i}`;

            if(i % 2 == 0 && j % 2 != 0) {
                square.classList.add("squareBlack");
            } else if(i % 2 == 0 && j % 2 == 0) {
                square.classList.add("squareWhite");
            } else if(i % 2 != 0 && j % 2 == 0) {
                square.classList.add("squareBlack");
            } else {
                square.classList.add("squareWhite");
            }
        }
    }
};

export default generateBoard;