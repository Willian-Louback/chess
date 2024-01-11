const otherPlayerMove = async (socket) => {
    return new Promise((resolve) => {
        const waitThrow = (event) => {
            socket.removeEventListener("message", waitThrow);
            return resolve(event.data);
        };

        socket.addEventListener("message", waitThrow);
    });
};

export default otherPlayerMove;