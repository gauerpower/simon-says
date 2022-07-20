//Game over sound:
const failSound = new Audio("sounds/wrong.mp3");

//Creating the audio objects & placing them in an array:
const redSound = new Audio("sounds/red.mp3");
const blueSound = new Audio("sounds/blue.mp3");
const greenSound = new Audio("sounds/green.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");
const buttonSounds = [redSound, blueSound, greenSound, yellowSound];

const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

let gameStarted = false;
let level = 0;

//Starting the game:
$(document).keydown(function (event) {
  if (gameStarted === false && event.key === " ") {
    gameStarted = true;
    userClickedPattern = [];
    nextSequence();
  }
});

//Randomly choosing the next color, playing the whole sequence, and incrementing the level:
function nextSequence() {
  let randomNum = Math.floor(Math.random() * 4);
  let nextColor = buttonColors[randomNum];
  gamePattern.push(nextColor);
  level++;
  $("h1").text("Level " + level);
  flashAndSoundSequence();
}

//Setting up the flashes and sounds to respond to the sequence:
function flashAndSoundSequence() {
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      let currentColor = gamePattern[i];
      $("#" + currentColor).addClass("pressed");
      let currentColorIndex = buttonColors.indexOf(currentColor);
      let currentSound = buttonSounds[currentColorIndex];
      currentSound.play();
      setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    }, i * 500);
  }
}

//Flashing buttons, playing sounds, and adding color to array when button is clicked:
$(".btn").click(function (event) {
  let userChosenColor = this.id;
  buttonSounds[buttonColors.indexOf(userChosenColor)].play();
  $(this).addClass("pressed");
  setTimeout(() => {
    $(this).removeClass("pressed");
  }, 100);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//Flashing buttons, playing sounds, and adding color to array when button key is pressed:
$(document).keydown(function (event) {
  if (gameStarted === false) {
    return;
  }
  if (event.key !== "q" && event.key !== "w" && event.key !== "a" && event.key !== "s") {
    return;
  }
  let userChosenColor;
  if (event.key === "q") {
    userChosenColor = "green";
  }
  if (event.key === "w") {
    userChosenColor = "red";
  }
  if (event.key === "a") {
    userChosenColor = "yellow";
  }
  if (event.key === "s") {
    userChosenColor = "blue";
  }
  buttonSounds[buttonColors.indexOf(userChosenColor)].play();
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(() => {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

function checkAnswer(currentIndex) {
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    failSound.play();
    $("body").addClass("game-over");
    $("h1").text("Game over")
    setTimeout(function () {
        $("body").removeClass ("game-over");
        $("h1").text("Press spacebar to restart");
    }, 2000);
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }
}
