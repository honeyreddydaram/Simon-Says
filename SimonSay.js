let gameSeq = [];
let userSeq = [];
let highScore = 0;

let btns = ["yellow", "red", "purple","green"]

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector(".highscore");


document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game started");
        started=true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
    resetHint();
}

function gameScoreDisplay(){
    if (level === 0){
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start. `;
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br> Press any key to start. `;
    }

}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else{
        gameScoreDisplay();
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 200);

        if (level-1 > highScore){
            highScore = level-1;
            highScoreDisplay.innerHTML = `<h1> <b> High Score: ${highScore} </b> </h1>`;
            
        }

        reset();
        resetHint();
    }
}

function btnPress() {
    // console.log(this);
    let btn =this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function resetHint(){
    hintBox.innerHTML="";
}

let hintBtn = document.querySelector(".hint");
let hintBox = document.querySelector(".hintBox");
hintBtn.addEventListener("click",function(){
    hintBox.innerHTML=`${gameSeq}`
});