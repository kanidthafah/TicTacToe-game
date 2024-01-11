const boxClick = document.querySelectorAll('.box-click');
const btnRestart = document.querySelector('.btn-restart');
const displayStatus = document.querySelector('.display-status');
const displayTurn = document.querySelector('.display-turn');

let currentPlayer = "X";

let winningRule = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let count = 0;

//Function Winner Check
function winnerCheck() {
    winningRule.forEach(rule => {
        let check = rule.every(idx =>
            boxClick[idx].innerHTML === currentPlayer)
        if (check) {
            winnerText()
            disable()
            changeColor(rule)
        }
    })
};

//Function Winner Text: when player X/O win.
function winnerText() {
    displayStatus.innerHTML = `<i>${currentPlayer}</i>'s win`;
    displayTurn.remove(displayTurn);
};

//Function Draw Text: when player X,O has ended with draw.
function drawText() {
    displayStatus.innerHTML = `DRAW!`;
    displayTurn.remove(displayTurn);
};

//Function Change Color: When X/O Win, color-bg/color will change.
function changeColor(rule) {
    rule.forEach(idx => {
        boxClick[idx].classList.add('winnerColor')
    })
};

// Function Disable: when X/O win or draw, cannot click anymore.
function disable() {
    boxClick.forEach(e => {
        e.classList.add('disable')
    })
};

//function Player Change: when player click on each box will change to X | O, and display text (Turn of player current)
function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayTurn.innerHTML = `It's <i>${currentPlayer}</i>'s turn`;
};

boxClick.forEach((e) => {
    e.addEventListener('click', () => {

        if (e.innerHTML !== '')
            return;

        e.innerHTML = currentPlayer

        count++
        if (count == 9 && !winnerCheck()) {
            disable()
            drawText()
        }
        winnerCheck()
        playerChange()
    })
});

//Restart Button
btnRestart.addEventListener('click', () => {
    location.reload()
});