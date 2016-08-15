/////// INITIALIZE
var
// game is off on page load
    start = false,
    // sound for screw ups
    errorSound = new Audio('err.mp3'),

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
    strict = false;
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
    // div has highlighted opacity for duration of sound
    setTimeout(function() {
        bu.div.style.opacity = ".7";
    }, duration);
}

// reset turn count, prevent user from pushing buttons out of turn
function endUserTurn() {
    turn = 0;
    userTurn = false;
}

function error() {
    // TODO shadowChange(redglow)
    errorSound.play();
    // TODO ya dun goofed alert
    if (strict) {
        loadGame();
        // TODO error alert: play again or quit
    } else {
        endUserTurn();
        setTimeout(playPattern(), 1000);
        // TODO error alert: continue or quit--remove timeout
    }
}
// flash background shadow
function shadowChange(color) {
    /* TODO add to: (white glow) on correct button
                    (green glow) on win
                    (red glow) on error
    */
    document.getElementById("circle").style["boxShadow"] = "0px 0px 15px 20px " + color;
    setTimeout(function() {
        document.getElementById("circle").style["boxShadow"] = "0px 0px 10px 15px rgba(0, 0, 0, 0.5)";
    }, 500);
}
// STRICT MODE
document.getElementById("strict-button").onclick = function() {
    if (strict === false) {
        strict = true;
        document.getElementById("strict-indicator").style.backgroundColor = "red";
    } else {
        strict = false;
        document.getElementById("strict-indicator").style.backgroundColor = "#444";
    }

};


//start game
document.getElementById("start-button").onclick = function() {
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

};

///////// GAME PLAY
function playPattern() {
    var i = 0;

    function playEach() {
        setTimeout(function() {
            play(pattern[i]);
            i++;
            if (i < pattern.length) {
                playEach();
            }
        }, 400);
    }
    playEach();

    // allow user action after full playback
    setTimeout(function() {
        userTurn = true;
    }, 400);

}

function computerAction() {
    // add key to pattern
    pattern.push(list[Math.floor(Math.random() * 4)]);
    // update counter to current pattern length
    counter.innerHTML = pattern.length;
    // play
    playPattern();
}

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
                    // TODO add win game sequence
                    console.log("yay"); // testing only, remove
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
