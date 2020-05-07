var userClickedPattern = [];
var gamePattern = [];
var level = 0;

var btnColors = ["red", "green", "blue", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("level " + level)
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = btnColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);


}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout( function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100
);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("Press A Key to Start");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100)
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];


}


$(document).on("keydown", function() {
  nextSequence();
  $("h1").text("level " + level);
});
