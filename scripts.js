

    /////// INITIALIZE
    var
      // game is off on page load
      //// FIXME why can't this be in the initializerloadGame()?
      start = false,
      // sound for screw ups
      errorSound = new Audio('err.mp3'),

      // button variables with corresponding elements and audio
      d1 = {
        div: document.getElementById("d1"),
        audio: new Audio('d1.mp3')
      },
      d2 = {
        div: document.getElementById("d2"),
        audio: new Audio('d2.mp3')
      },
      d3 = {
        div: document.getElementById("d3"),
        audio: new Audio('d3.mp3')
      },
      d4 = {
        div: document.getElementById("d4"),
        audio: new Audio('d4.mp3')
      },
      list = [d1, d2, d3, d4];

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
    function play(bu) { //
      setTimeout(function background() {
        bu.div.style.opacity = "0.4";
      }, 1000); // FIXME why is this not changing back?
      bu.audio.play();
      // TODO add pause before next
      console.log(bu); // testing only, remove
    }
    // reset turn count, prevent user from pushing buttons out of turn
    function endUserTurn() {
      turn = 0;
      userTurn = false;
    }

    function error() {
      errorSound.play();
      // TODO ya dun goofed alert
      if (strict) {
        loadGame();
        // TODO error alert: play again or quit
      } else {
        endUserTurn();
        pattern.forEach(play);
        userTurn = true;
        // TODO error alert: continue or quit
      }
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
        makePattern();
      } else {
        start = false;
        document.getElementById("start-stop").innerHTML = "Start";
        document.getElementById("start-button").style.backgroundColor = "green";
      }

    };

  ///////// GAME PLAY

    function makePattern() { // TODO rename this to computerAction
      // add key to pattern
      pattern.push(list[Math.floor(Math.random() * 4)]);
      console.log(pattern); // testing only, remove
      // update counter to current pattern length
      counter.innerHTML = pattern.length;
      // play
      for (var i = 0; i < pattern.length; i++) {
        play(pattern[i]);
      }
      userTurn = true;

    }

    function userAction(key) {
      if (userTurn) {
        if (key === pattern[turn]) {
          play(key);
          console.log('done'); // testing only, remove
          if (turn === (pattern.length - 1)) {
            endUserTurn();
            makePattern();
          }
          turn++;
        } else {
          error();
        }
      }
    }
