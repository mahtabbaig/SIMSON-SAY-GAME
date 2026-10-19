
let gameseq = [];
let userseq = [];

let level = 0;
let started = false;

let h2 = document.querySelector("h2");

let btn = ["box1", "box2", "box3", "box4"];

// Start game when any key is pressed
document.addEventListener("keypress", function () {
    if (started === false) {
        console.log("Game started");
        started = true;
        levelup();
    }
});

// Flash the computer's selected box
function btnflash(button) {
    button.classList.add("flash");

    setTimeout(function () {
        button.classList.remove("flash");
    }, 250);
}

// Flash the player's clicked box
function userflash(button) {
    button.classList.add("userflash");

    setTimeout(function () {
        button.classList.remove("userflash");
    }, 250);
}

// Increase level and choose a random box
function levelup() {
    userseq = [];
    level++;

    h2.innerText = "Level " + level;

    let random = Math.floor(Math.random() * 4);
    let randombtn = btn[random];

    gameseq.push(randombtn);

    console.log("Game sequence:", gameseq);

    let selectedbtn = document.querySelector("." + randombtn);

    btnflash(selectedbtn);
}

// Check the player's answer
function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        console.log("Correct!");

        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML =
            `Game over! Your score: <b>${level - 1}</b><br>Press any key to restart`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Handle player's box click
function btnpress() {
    if (!started) return;

    let button = this;

    userflash(button);

    let usercolour = button.getAttribute("class")
        .split(" ")
        .find(className => btn.includes(className));

    userseq.push(usercolour);

    let idx = userseq.length - 1;

    checkans(idx);
}

// Select all four boxes
let allbtn = document.querySelectorAll(
    ".box1, .box2, .box3, .box4"
);

for (let button of allbtn) {
    button.addEventListener("click", btnpress);
}

// Reset the game
function reset() {
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
}

