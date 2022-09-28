# Wordle (General Assembly)

Wordle for General Assembly

## Demo
https://thuongb14.github.io/wordle_ga/
<img src="https://i.imgur.com/9A7SgEs.jpg">
<img src="https://i.imgur.com/PjeUIgw.jpg">

## Work Plan

### HTML
- Gameboard with 6 rows equivalent to 6 guesses and each rows contains 5 boxes for 5 letters.
- Modal for winning popup, losing popup and information guide popup.

### CSS
- Gameboard using grid.
- Other elements mostly use Flexbox.

### JS
- The word for each game are chosen randomly from the given word list.
- Controller of the currentRow, currenBoxId, numberGuessLeft and isGameActive to control the flow of the game, identify which row and which box the user are in.
- User will interact with virtual keyboard or keyboard input to guess the letter.
- After the currentRow has been filled with 5 letters, run checkGuess function to compare the guess word with the correct word and give hints to users. Also run checkWin if the user's guess is correct.
- Work with the View to append text on the box, handle player's click or input.

## Result
The project has been made to be as close as the orginal Wordle as much as possible, but screw the wait, don't wait for a day to continue to play, play forever with this Wordle. All functionalities are the same but things that can be improved includes:
- Animation of the box to flip when checkGuess function has been executed and the hints are revealed.
- Buzz effect on the current row if the user enter invalid word or input not enough letters.
