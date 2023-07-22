const xclAss = "x";
const oclAss = "round";
const comWin = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

const board = document.getElementById("board");
const cells =document.querySelectorAll(".cell");
const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const restartButton = document.getElementById("restartButton");

let turn;

function swapTurn() {
    turn = !turn 
}

function placeMark(cell,currentClass) {
    cell.classList.add(currentClass)
}

function placeHover() {
    board.classList.remove(xclAss);
    board.classList.remove(oclAss);
    if (turn) board.classList.add(oclAss);
    else board.classList.add(xclAss);
}

function endGame(draw) {
    if(draw) resultText.innerText ="Beraberlik";
    else resultText.innerText = `${turn ?"O" : "X"} Kazandi !!`

    result.classList.add("show");
}


function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(xclAss) || cell.classList.contains(oclAss);
    });
};


function checkWin(currentClass) {
    return comWin.some(combination => {
        return combination.every(index => {
            return cells[index]. classList.contains(currentClass);
        })
    })
};


function handleClick(e) {
    const cell = e.target
    const currentClass = turn ? oclAss: xclAss
    placeMark(cell,currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    }else if (isDraw()) {
        endGame(true);
    }else {
        swapTurn()
        placeHover()
    };
};


function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove(xclAss);
        cell.classList.remove(oclAss);
        cell.removeEventListener("click",handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    });
};

function startGame() {
    turn = false
    resetGame();
    placeHover();
    result.classList.remove("show");
};

startGame();
restartButton.addEventListener("click", startGame);
