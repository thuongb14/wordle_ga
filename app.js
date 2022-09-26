let correctWord = 'APPLE';
let isGameActive = true;
let currentRow = 0;
let guessArr = [];
let correctArr = correctWord.split('');
let currentId = 0;
let numberWordLeft = 5;
const box = document.querySelectorAll('.box');
const keyBoard = document.querySelector('.keyboard');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.content-modal');

let gameModule = (() => {
  const handleKeyInput = (e) => {
    if (isGameActive) {
      let keyInput = e.key.toUpperCase();
      if (keyInput === 'ENTER') {
        if (currentId == 5) {
          checkGuess();
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

  const handleKeyClick = () => {
    
  }

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
    let correctLetter = [];
    let validLetter = [];
    let invalidLetter = [];
    for (let i = 0; i < correctArr.length; i++) {
      let position = correctArr.indexOf(guessArr[i]);
      if (position === -1) {
        box[i].classList.add('invalid');
        invalidLetter.push(box[i].textContent);
      } else {
        if (correctArr[i] === guessArr[i]) {
          box[i].classList.add('correct');
          correctLetter.push(box[i].textContent);
        } else {
          box[i].classList.add('valid');
          validLetter.push(box[i].textContent);
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      if (
        correctLetter.includes(box[i].textContent) &&
        box[i].classList.contains('valid')
      ) {
        box[i].classList.add('invalid');
      }
    }
    updateKeyboard(correctLetter, validLetter, invalidLetter);
    checkWin();
    resetRow();
  };

  const resetRow = () => {
    currentId = 0;
    numberWordLeft = 5;
    guessArr = [];
    currentRow++;
  };

  const updateKeyboard = (correct, valid, invalid) => {
    let keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      for (let i = 0; i <= correct.length; i++) {
        if (correct.includes(key.textContent)) {
          key.classList.add('correct');
        }
      }
      for (let i = 0; i <= valid.length; i++) {
        if (valid.includes(key.textContent)) {
          key.classList.add('valid');
        }
      }
      for (let i = 0; i <= invalid.length; i++) {
        if (invalid.includes(key.textContent)) {
          key.classList.add('invalid');
        }
      }
    });
  };

  const modalWin = () => {
    modalContent.innerHTML = `
    <h2>YOU WIN!!</h2>
    <p>The correct word is ${correctWord}</p>
    <button class="reset">
      Play Again
    </button>`;
    modal.classList.remove('hidden');
  };

  const modalLose = () => {
    modalContent.innerHTML = `
    <h2>YOU LOSE:( </h2>
    <p>The correct word is ${correctWord}</p>
    <button class="reset">
      Play Again
    </button>`;
    modal.classList.remove('hidden');
  };

  const checkWin = () => {
    let guessWord = guessArr.join('');
    if (correctWord === guessWord) {
      isGameActive = false;
      modalWin();
    } else if (currentRow == 5 && guessWord !== correctWord) {
      isGameActive = false;
      modalLose();
    }
  };

  const resetGame = (e) => {
    if (e.target.classList.contains('reset')) {
      location.reload();
    }
  };
  return { handleKeyInput, resetGame };
})();

window.addEventListener('keyup', function (e) {
  gameModule.handleKeyInput(e);
});

window.addEventListener('click', function (e) {
  gameModule.resetGame(e);
});
