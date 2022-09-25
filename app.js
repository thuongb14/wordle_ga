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
        isGameActive = true
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
      isGameActive = false
      console.log('check')
      resetRow()
  }

  const resetRow = () => {
    if(!isGameActive && currentId == 5) {
      currentId = 0;
      numberWordLeft = 5;
      guessArr = []
      currentRow++
    }
  }
  
  return {handleKeyInput}
})()



window.addEventListener('keyup', function (e) {
  gameModule.handleKeyInput(e);
});


