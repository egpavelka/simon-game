When finished, project will be live at:
http://egpavelka.com/simon-game
____________________________________________

# DESCRIPTION OF PROJECT FROM FCC

## Build a Simon Game

### Objective: Build a CodePen.io app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/obYBjE.

- Rule #1: Don't look at the example project's code. Figure it out for yourself.

- Rule #2: Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

- User Story 1: I am presented with a random series of button presses.

- User Story 2: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

- User Story 3: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

- User Story 4: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.

- User Story 5: I can see how many steps are in the current series of button presses.

- User Story 6: If I want to restart, I can hit a button to do so, and the game will return to a single step.

- User Story 7: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

- User Story 8: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.


## CHANGELOG
____________________________________________

## [Unreleased] 2016.08.15
### COMPLETED
- Added glow animation to gameboard for button press, error, win events.

### BUG FIXES
- Fixed problem with repeated button playback.


## [Unreleased] 2016.08.14
### COMPLETED
- Gameplay is functional, allowing user to complete a 20-step sequence in order to win.
- Fixed issues with timing of pattern playback/overlapping.
- FCC User Stories 1-6 met in full.

### IN PROCESS
- Make sure strict mode toggle is fully functional.
- Create attractive alerts for error, game over, you win dialogues.
- Add glow animation to gameboard for button press, error, win events.

### BUGS
- When pattern has repeated button once or more, playback becomes blurred (not clear whether it's D1, D1, D1, D2 or D1, D2).


## [Unreleased] 2016.08.13
### COMPLETED
- Base design is done.
- Game initialization process works, pieces are in place.

### IN PROCESS
- Gloss up animations and fix timing issues with button highlighting and audio playback.
- Create actual working gameplay or whatever I guess.
