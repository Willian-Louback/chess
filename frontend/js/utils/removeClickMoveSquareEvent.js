const removeClickMoveEvent = (element, piece) => {
    element.parentNode.removeEventListener("click", piece.initEventMove);
};

export default removeClickMoveEvent;