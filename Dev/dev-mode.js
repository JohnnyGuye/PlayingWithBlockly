/* ****************
    File for debugging
*/

Squid = {};

Squid.Dev = {};

/* The current state of the devmode
*/
Squid.Dev.DEVMODE = true;

/**
 * The string for activating devmode
 */
Squid.Dev.DevmodeCode = "DEVMODE";

/* The input stacks (resets when error is committed)
*/
Squid.Dev.LastInputs = [];

/* Activate or deactivate the dev mode if the correct string is entered
* @param {} event A key event containing the keycode of the touch pressed. 
*/
Squid.Dev.ToggleDevmode = function (event) {
    var code = event.keyCode;
    var char = String.fromCharCode(code);
    if (char == Squid.Dev.DevmodeCode[Squid.Dev.LastInputs.length]) {
        Squid.Dev.LastInputs.push(code);
    } else {
        Squid.Dev.LastInputs.length = 0;
        if (char == Squid.Dev.DevmodeCode[0]) {
            Squid.Dev.LastInputs.push(code);
        }
    }
    //Switch Devmode
    if (Squid.Dev.LastInputs.length === Squid.Dev.DevmodeCode.length) {
        if (!Squid.Dev.DEVMODE) {
            Squid.Dev.ShowDevmode();
        } else {
            Squid.Dev.HideDevmode();
        }
        Squid.Dev.LastInputs.length = 0;
        console.log("Devmode: " + Squid.Dev.DEVMODE);
    }
}

Squid.Dev.HideDevmode = function () {
    Squid.Dev.DEVMODE = false;
    var devElementBlock = document.getElementsByClassName("dev-block");
    for (let i = 0; i < devElementBlock.length; i++) {
        devElementBlock[i].style.display = "none";
    }
}

Squid.Dev.ShowDevmode = function () {
    Squid.Dev.DEVMODE = true;
    var devElementBlock = document.getElementsByClassName("dev-block");
    for (let i = 0; i < devElementBlock.length; i++) {
        devElementBlock[i].style.display = "block";
    }
}