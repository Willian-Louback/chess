import removeClickMoveEvent from "./removeClickMoveSquareEvent.js";

const removeElement = (piece) => {
    document.querySelectorAll(".moveSquare").forEach(element => {
        if(element) {
            removeClickMoveEvent(element, piece);
            element.remove();
        }
    });
};

export default removeElement;