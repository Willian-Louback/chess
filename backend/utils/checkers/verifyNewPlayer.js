const verifyNewPlayer = (data) => {
    if(data[0] == "newPlayer") {
        return true;
    }

    return false;
};

export default verifyNewPlayer;