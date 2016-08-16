/////// INITIALIZE
var
    // game off, strict mode off on page load
    start = false,
    strict = false,
    // event sounds
    errorSound = new Audio('err.mp3'),
    winSound = new Audio('win.mp3'),
    // button variables with corresponding elements and audio
    list = [{
        button: "d1",
        div: document.getElementById("d1"),
        audio: new Audio('d1.mp3')
    }, {
        button: "d2",
        div: document.getElementById("d2"),
        audio: new Audio('d2.mp3')
    }, {
        button: "d3",
        div: document.getElementById("d3"),
        audio: new Audio('d3.mp3')
    }, {
        button: "d4",
        div: document.getElementById("d4"),
        audio: new Audio('d4.mp3')
    }];

// game reset
function loadGame() {
    pattern = [];
    turn = 0;
    userTurn = false;
    document.getElementById("counter").innerHTML = "0";
}
// initial game load FIXME window.onload....?
loadGame();

/////// OPTIONS AND EVENTS
// animation and audio for button press
function play(bu) {
    var duration = bu.audio.duration * 1000;
    bu.audio.play();
    bu.div.style.opacity = "1";
    // gameboard highlighted for duration of sound
    shadowChange("rgba(155, 155, 100, 0.1)", duration);
    // div has highlighted opacity for duration of sound
    setTimeout(function() {
        bu.div.style.opacity = ".6";
    }, duration);
}
// strict mode
function toggleStrict() {
    if (!start) {
        if (!strict) {
            strict = true;
            document.getElementById("strict-indicator").style.backgroundColor = "red";
        } else {
            strict = false;
            document.getElementById("strict-indicator").style.backgroundColor = "#444";
        }
    }
}
// start game
function startGame() {
    loadGame();
    if (start === false) {
        start = true;
        document.getElementById("start-stop").innerHTML = "Stop";
        document.getElementById("start-button").style.backgroundColor = "red";
        // computer goes first
        computerAction();
    } else {
        start = false;
        document.getElementById("start-stop").innerHTML = "Start";
        document.getElementById("start-button").style.backgroundColor = "green";
    }
}

///////// GAME PLAY
// COMPUTER ACTIONS AND EVENTS
// computer's turn
function computerAction() {
    // add key to pattern
    pattern.push(list[Math.floor(Math.random() * 4)]);
    // update counter to current pattern length
    counter.innerHTML = pattern.length;
    // play
    playPattern();
}
// playback of entire pattern
function playPattern() {
    var i = 0;

    function playEach() {
        setTimeout(function() {
            play(pattern[i]);
            i++;
            if (i < pattern.length) {
                playEach();
            }
        }, 750);
    }
    playEach();
    // allow user action after full playback
    setTimeout(function() {
        userTurn = true;
    }, 400);
}
// USER ACTIONS AND EVENTS
// user's turn
function userAction(key) {
    if (userTurn) {
        console.log(list[key].button + " - user; " + pattern[turn].button + " - computer; " + turn); // testing only, remove
        if (list[key] === pattern[turn]) {
            play(list[key]);
            // if user completed full sequence correctly
            if (turn === (pattern.length - 1)) {
                endUserTurn();
                // if user completed full 20-round game sequence
                if (pattern.length === 20) {
                  winSound.play();
                    shadowChange("rgba(100, 255, 80, 0.2)", 1000);
                    displayAlert(winAlert);
                } else {
                    setTimeout(function() {
                        computerAction();
                    }, 1000);
                }
            }
            // if not end of pattern
            else {
                turn++;
            }
        } else {
            error();
        }
    }
}
// end user's turn upon completion of pattern or failure on strict mode
function endUserTurn() {
    turn = 0;
    userTurn = false;
}
// response on wrong button press
function error() {
    shadowChange("rgba(255, 100, 100, 0.2)", 400);
    errorSound.play();
    if (strict) {
        displayAlert(errorAlertStrict);
    } else {
        displayAlert(errorAlertNormal);
    }
}
///// ALERTS
// TODO
var winAlert = document.getElementById('win-alert'),
    errorAlertNormal = document.getElementById('error-alert-normal'),
    errorAlertStrict = document.getElementById('error-alert-strict');

function displayAlert(event) {
    event.style.display = 'block';
}

function dismissAlert(event, stayorgo) {
    event.style.display = 'none';
    if (stayorgo === 'quit') {
        // reload board
        startGame();
    } else if (stayorgo === 'restart') {
        // reset board
        startGame();
        // restart game
        startGame();
    } else {
        // replay pattern, continue current game
        endUserTurn();
        setTimeout(playPattern(), 1500);
    }

}

///// APPEARANCE
// flash background shadow on play(), user error, win game
function shadowChange(color, time) {
    document.getElementById("circle").style["boxShadow"] = "0px 0px 145px 5px " + color;
    setTimeout(function() {
        document.getElementById("circle").style["boxShadow"] = "0px 0px 120px 5px rgba(0, 0, 0, 0.7)";
    }, time);
}
