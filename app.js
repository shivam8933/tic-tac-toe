let boxes = document.querySelectorAll(".box");
let gameDiv = document.querySelector(".game");
let resetBtn = document.querySelector(".rstBtn");
let newGame = document.querySelector(".new-game");
let Container = document.querySelector(".container");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX playerO

let winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const gameContainer = () => {
  Container.classList.add("gameStart");
};

const resetGame = () => {
  turnO = true;
  enabledBtns();
  msgContainer.classList.add("hide");
};

const newGameBtn = () => {
  turnO = true;
  enabledBtns();
  msgContainer.classList.add("hide");
  Container.classList.remove("gameStart");
  resetBtn.classList.remove("gameStart");
  newGame.classList.add("start");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#ae7ef7";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#d6a4a4";
      turnO = true;
    }
    box.disabled = true;
    chckeWinner();
  });
});

const disabledBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledBtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation! Winner Is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBtns();
  Container.classList.add("gameStart");
  resetBtn.classList.add("gameStart");
  newGame.classList.remove("start");
};
const matchdraw = (draw) => {
  msg.innerText = `Match Draw! Nobody wins`;
  msgContainer.classList.remove("hide");
  disabledBtns();
  Container.classList.remove("start");
};

function chckeWinner() {
  let isDraw = true;
  for (pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
    if (pos1Val == "" || pos2Val == "" || pos3Val == "") {
      isDraw = false;
    }
  }
  if (isDraw) {
    matchdraw();
  }
}

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", newGameBtn);
