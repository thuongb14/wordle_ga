let correctWord = 'APPLE';
let isGameActive = true;
let currentRow = 0;
let guessArr = [];
let correctArr = correctWord.split('');
let currentId = 0;
let numberWordLeft = 5;
const box = document.querySelectorAll('.box');
const keyBoard = document.querySelector('.keyboard');

let gameModule = (() => {
  const handleKeyInput = (e) => {
    if (isGameActive) {
      let keyInput = e.key.toUpperCase();
      if (keyInput === 'ENTER') {
        if (currentId == 5) {
          checkGuess();
          isGameActive = true;
        } else if (currentId < 5) {
          alert();
        }
      }
      if (keyInput.match(/^[a-zA-Z()]+$/) && keyInput.length === 1) {
        appendText(keyInput);
      }
      if (keyInput === 'BACKSPACE') {
        deleteText();
      } else {
        return;
      }
    }
  };

  const alert = () => {
    let alert = document.createElement('p');
    alert.textContent = 'NOT ENOUGH LETTER';
    keyBoard.insertAdjacentElement('afterbegin', alert);
    setTimeout(function () {
      alert.remove();
    }, 800);
  };

  const appendText = (key) => {
    if (isGameActive && numberWordLeft > 0) {
      box.forEach((item) => {
        if (item.dataset.row == currentRow && item.dataset.id == currentId) {
          item.textContent = key;
        }
      });
      guessArr.push(key);
      numberWordLeft--;
      currentId++;
    }
  };

  const deleteText = () => {
    if (isGameActive && numberWordLeft <= 5 && currentId >= 1) {
      box.forEach((item) => {
        if (
          item.dataset.row == currentRow &&
          item.dataset.id == currentId - 1
        ) {
          item.textContent = '';
        }
      });
      numberWordLeft++;
      guessArr.pop();
      currentId--;
    }
  };

  const checkGuess = () => {
    let box = document.querySelectorAll(`[data-row="${currentRow}"]`);
    isGameActive = false;
    let dupWord = [];
    for (let i = 0; i < correctArr.length; i++) {
      let position = correctArr.indexOf(guessArr[i]);
      if (position === -1) {
        box[i].classList.add('invalid');
      } else {
        if (correctArr[i] === guessArr[i]) {
          box[i].classList.add('correct');
          dupWord.push(box[i].textContent);
        } else {
          box[i].classList.add('valid');
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      if (
        dupWord.includes(box[i].textContent) &&
        box[i].classList.contains('valid')
      ) {
        box[i].classList.add('invalid');
      }
    }
    resetRow();
  };

  const resetRow = () => {
    if (!isGameActive) {
      currentId = 0;
      numberWordLeft = 5;
      guessArr = [];
      currentRow++;
    }
  };

  return { handleKeyInput };
})();

window.addEventListener('keyup', function (e) {
  gameModule.handleKeyInput(e);
});
