const waitForButtonClick = async (buttonsToPromote) => {
    return new Promise((resolve) => {
        const promoteButtonEvent = (e) => {
            buttonsToPromote.forEach(element => {
                element.removeEventListener("click", promoteButtonEvent);
            });

            document.querySelector(".menuPromote").remove();
            resolve(e.target.classList[1].replace(e.target.classList[1][e.target.classList[1].length - 1], ""));
        };

        buttonsToPromote.forEach(element => {
            element.addEventListener("click", promoteButtonEvent);
        });
    });
};



export default waitForButtonClick;