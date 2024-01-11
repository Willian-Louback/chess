const verifyDirection = (c, l, positionToVerify) => {
    if(c > positionToVerify[0] && l < positionToVerify[1]) { // diagonal
        return [1, 1];
    } else if(c < positionToVerify[0] && l < positionToVerify[1]) {
        return [-1, 1];
    } else if(c < positionToVerify[0] && l > positionToVerify[1]) {
        return [-1, -1];
    } else if(c > positionToVerify[0] && l > positionToVerify[1]) {
        return [1, -1];
    } else if(c > positionToVerify[0] && l == positionToVerify[1]) { // horizontal e vertical
        return [1, 0];
    } else if(c < positionToVerify[0] && l == positionToVerify[1]) {
        return [-1, 0];
    } else if(c == positionToVerify[0] && l < positionToVerify[1]) {
        return [0, 1];
    } else if(c == positionToVerify[0] && l > positionToVerify[1]) {
        return [0, -1];
    }
};

export default verifyDirection;