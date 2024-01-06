import removeClickMoveEvent from "./removeClickMoveSquareEvent.js";

const removeElement = (piece) => {
    if(document.querySelector(".selectedSquare")) {
        document.querySelector(".selectedSquare").classList.remove("selectedSquare");
    }

    document.querySelectorAll(".moveSquare").forEach(element => {
        if(element) {
            removeClickMoveEvent(element, piece);
            element.remove();
        }
    });
};

export default removeElement;