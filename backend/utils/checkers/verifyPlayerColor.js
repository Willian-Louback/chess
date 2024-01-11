const verifyPlayerColor = (users) => {
    // if(users.length == 0) {
    //     return false;
    // } else {
    //     if(users[users.length - 1].color == "white") {
    //         return false
    //     } else {
    //         return true;
    //     }
    // }
    if(users.length % 2 == 0) {
        return true;
    } else {
        return false;
    }
};

export default verifyPlayerColor;