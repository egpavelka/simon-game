

    /////// INITIALIZE
    var // TODO organize this list
      start = false,
      errorSound = new Audio('err.mp3'),

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
      };
    var list = [d1, d2, d3, d4];

    function loadGame() {
      pattern = [];
      turn = 0;
      strict = false;
      userTurn = false;
      document.getElementById("counter").innerHTML = "0";
    }

    loadGame();

    /////// OPTIONS AND EVENTS

    function play(bu) { // TODO get the sound
      setTimeout(function background() {
        bu.div.style.opacity = "0.4";
      }, 1000);
      bu.audio.play();
      console.log(bu);
    }

    function endUserTurn() {
      turn = 0;
      userTurn = false;
    }

    function error() {
      errorSound.play();
      if (strict) {
        // game over message
        loadGame();
      } else {
        endUserTurn();
        pattern.forEach(play);
        userTurn = true;
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

    function makePattern() {
      // add key to pattern
      pattern.push(list[Math.floor(Math.random() * 4)]);
      // update counter to current pattern length
      console.log(pattern);
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
          console.log('done');
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
