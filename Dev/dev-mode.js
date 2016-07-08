/* ****************
    File for debugging
*/

SquidDev = {};

/* The current state of the devmode
*/
SquidDev.DEVMODE = true;

/**
 * The string for activating devmode
 */
SquidDev.DevmodeCode = "DEVMODE";

/* The input stacks (resets when error is committed)
*/
SquidDev.LastInputs = [];

/* Activate or deactivate the dev mode if the correct string is entered
* @param {} event A key event containing the keycode of the touch pressed. 
*/
SquidDev.ToggleDevmode = function (event) {
    var code = event.keyCode;
    var char = String.fromCharCode(code);
    if (char == SquidDev.DevmodeCode[SquidDev.LastInputs.length]) {
        SquidDev.LastInputs.push(code);
    } else {
        SquidDev.LastInputs.length = 0;
        if (char == SquidDev.DevmodeCode[0]) {
            SquidDev.LastInputs.push(code);
        }
    }
    //Switch Devmode
    if (SquidDev.LastInputs.length === SquidDev.DevmodeCode.length) {
        if (!SquidDev.DEVMODE) {
            SquidDev.ShowDevmode();
        } else {
            SquidDev.HideDevmode();
        }
        SquidDev.LastInputs.length = 0;
        console.log("Devmode: " + SquidDev.DEVMODE);
    }
}

SquidDev.HideDevmode = function () {
    SquidDev.DEVMODE = false;
    var devElementBlock = document.getElementsByClassName("dev-block");
    for (let i = 0; i < devElementBlock.length; i++) {
        devElementBlock[i].style.display = "none";
    }
}

SquidDev.ShowDevmode = function () {
    SquidDev.DEVMODE = true;
    var devElementBlock = document.getElementsByClassName("dev-block");
    for (let i = 0; i < devElementBlock.length; i++) {
        devElementBlock[i].style.display = "block";
    }
}