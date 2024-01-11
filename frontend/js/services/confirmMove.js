const confirmMove = (pieceSquare, socket) => {
    socket.send(JSON.stringify({
        piece: pieceSquare.firstChild.id,
        position: [pieceSquare.id[1], pieceSquare.id[3]]
    }));
};

export default confirmMove;