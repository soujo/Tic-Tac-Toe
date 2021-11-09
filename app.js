const circle = "circle";
const cross = "cross";
const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const boxElements = document.querySelectorAll("[data-box]");
const card = document.querySelector(".card");
const msg = document.querySelector("[data-msg]");
const msg__element = document.getElementById("msg__element");
const restartBtn = document.getElementById("restartBtn");
const startGameBtn = document.getElementById("startGame");
const name__boxElement = document.getElementById("name__boxElement");
const x__name = document.getElementById("x");
const o__name = document.getElementById("o");
const playerOne = document.getElementById("playerOne");
const playerTwo = document.getElementById("playerTwo");
const box = document.querySelector(".box");
const gameBoxID = document.getElementById("gameBoxID");
let circleTurn = undefined;
let playerOneIsX;

startGame();




restartBtn.addEventListener("click", () => {
    playerTwo.innerText = "Player 2";
    playerOne.innerText = "Player 1";
    gameBoxID.classList.add("gameBox");
    gameBoxID.style['pointer-events'] = "all";
    startGameBtn.classList.add("show");
    startGameBtn.classList.remove("off");
    startGame();
    circleTurn = undefined;
    location.reload();

});

function startGame() {
    startGameBtn.addEventListener("click", () => {
        name__boxElement.classList.add("show");
    });

    x__name.addEventListener("click", () => {
        playerOneIsX=true;
        playerOne.innerText = "Player 1 - X";
        playerTwo.innerText = "Player 2 - O";
        name__boxElement.classList.remove("show");
        gameBoxID.classList.add("showGameBox");
        gameBoxID.classList.remove("gameBox");
        startGameBtn.classList.remove("show");
        startGameBtn.classList.add("off");
        circleTurn = false;
    });

    o__name.addEventListener("click", () => {
        playerOneIsX=false;
        playerOne.innerText = "Player 1 - O";
        playerTwo.innerText = "Player 2 - X";
        name__boxElement.classList.remove("show");
        gameBoxID.classList.add("showGameBox");
        gameBoxID.classList.remove("gameBox");
        startGameBtn.classList.remove("show");
        startGameBtn.classList.add("off");
        circleTurn = true;
    });
    

    boxElements.forEach(box => {
        box.classList.remove(cross);
        box.classList.remove(circle);
        box.removeEventListener("click", handleClick);

        box.addEventListener("click", handleClick, { once: true });
    });

    msg__element.classList.remove("show");

}


function handleClick(event) {
    const box = event.target;
    const currentClass = circleTurn ? circle : cross;
    placeMark(box, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurn();
        hover();
    }
}

function endGame(draw) {
    if (draw) {
        msg.innerText = "Draw!";
    }
    else {
        if(circleTurn){
            if(playerOneIsX){
                msg.innerText="Player-2 Wins";
            }
            else{
                msg.innerText="Player-1 Wins";
            }
        }
        else{
            if(playerOneIsX){
                msg.innerText="Player-1 Wins";
            }
            else{
                msg.innerText="Player-2 Wins";
            }
        }
    }
    msg__element.classList.add("show");
    gameBoxID.style['pointer-events'] = "none";
}


function isDraw() {
    return [...boxElements].every(box => {
        return box.classList.contains(circle) || box.classList.contains(cross);

    });
}

function placeMark(box, currentClass) {
    box.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function hover() {
    card.classList.remove(circle);
    card.classList.remove(cross);

    if (circleTurn) {
        card.classList.add(circle);
    }
    else {
        card.classList.add(cross);

    }


}

function checkWin(currentClass) {
    console.log(winCombination.some);
    return winCombination.some((combination) => {
        return combination.every((index) => {
            return boxElements[index].classList.contains(currentClass);
        });
    });
}

