const createPromoteMenu = (squareToMove, positionColor) => {
    const menuPromote = squareToMove.appendChild(document.createElement("div"));
    menuPromote.classList.add("menuPromote");

    const queenButton =  menuPromote.appendChild(document.createElement("button"));

    queenButton.classList.add("buttonPromote", positionColor == 0 ? "queenW" : "queenB");

    const horseButton =  menuPromote.appendChild(document.createElement("button"));

    horseButton.classList.add("buttonPromote", positionColor == 0 ? "horseW" : "horseB");

    const bishopButton =  menuPromote.appendChild(document.createElement("button"));

    bishopButton.classList.add("buttonPromote", positionColor == 0 ? "bishopW" : "bishopB");

    const rookButton =  menuPromote.appendChild(document.createElement("button"));

    rookButton.classList.add("buttonPromote", positionColor == 0 ? "rookW" : "rookB");

    return [ queenButton, horseButton, bishopButton, rookButton ];
};

export default createPromoteMenu;