let correctWord = 'APPLE';
let isGameActive = true;
let currentRow = 0;
let guessArr = [];
let correctArr = correctWord.split('');
let currentId = 0;
let numberWordLeft = 5;
const box = document.querySelectorAll('.box');


let gameModule = (() => {
  const handleKeyInput = (e) => {
    if(isGameActive) {
      let keyInput = e.key.toUpperCase();
      if (keyInput === 'ENTER') {
        checkGuess();
      }
      if (keyInput.match(/^[a-zA-Z()]+$/) && keyInput.length === 1) {
        appendText(keyInput);
      } else {
        return;
      }
    }
  }

  const appendText = (key) => {
    if (isGameActive && numberWordLeft > 0) {
      box.forEach((item) => {
        if (item.dataset.row == currentRow && item.dataset.id == currentId) {
          item.textContent = key;   
        }
      });
      guessArr.push(key)
      numberWordLeft--
      currentId++
    }
  }

  const checkGuess = () => {
    if (isGameActive) {
      isGameActive = false;
      console.log(guessArr)
      console.log(correctArr)
    }
    resetRow()
  }

  const resetRow = () => {
    if(!isGameActive) {
      currentId = 0;
      currentRow += 1;
      numberWordLeft = 5;
      isGameActive = true;
      guessArr = []
    }
  }
  
  return {handleKeyInput}
})()



window.addEventListener('keyup', function (e) {
  gameModule.handleKeyInput(e);
});


