import createPromoteMenu from "./createPromoteMenu.js";
import waitForButtonClick from "../events/promoteButtonEvent.js";

const choicePromote = async (squareToMove, positionColor) => {
    const buttonsToPromote = createPromoteMenu(squareToMove, positionColor);

    const promote = await waitForButtonClick(buttonsToPromote);

    return new Promise((resolve) => {
        resolve(promote);
    });

};

export default choicePromote;