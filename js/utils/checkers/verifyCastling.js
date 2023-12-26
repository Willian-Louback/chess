const verifyCastling = (c, l, positionPiece, pieces, color) => {
    const kingId = color == "white" ? "kingW1" : "kingB1";
    const rookId1 = color == "white" ? "rookW1" : "rookB1";
    const rookId2 = color == "white" ? "rookW2" : "rookB2";
    const position = color == "white" ? 0 : 1;

    if(color == "white" ? !document.querySelector(`.isCheckW`) : !document.querySelector(".isCheckB")) {
        if(pieces[position][kingId].first) {
            if(c == positionPiece[0] + 2) {
                if(pieces[position][rookId2] && pieces[position][rookId2].first) {
                    if(
                        color == "white" ?
                            !document.querySelector(`#c${c - 1}l${l}`).classList.contains("dangerousSquareB") :
                            !document.querySelector(`#c${c - 1}l${l}`).classList.contains("dangerousSquareW")
                    ) {
                        return true;
                    }
                }
            } else {
                if(pieces[position][rookId1] && pieces[position][rookId1].first) {
                    if(
                        color == "white" ?
                            !document.querySelector(`#c${c + 1}l${l}`).classList.contains("dangerousSquareB") :
                            !document.querySelector(`#c${c + 1}l${l}`).classList.contains("dangerousSquareW")
                    ) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
};

export default verifyCastling;