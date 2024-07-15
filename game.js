var gamePattern = [];
var userClickedPattern = []; 
var buttonColours = ["blue", "green", "yellow", "red"];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("LEVEL " + level);
    nextSequence();
    started = true;
  }
});

// when user clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); 
});

// logic of game
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { 
    if (gamePattern.length === userClickedPattern.length) { 
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over"); 
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over"); 
    }, 200);

    startOver();
  }
}

function nextSequence() { 
  userClickedPattern = [];
  level++;
  $("#level-title").text("LEVEL " + level);

  var randomNum = Math.floor(Math.random() * 4); // random num
  var randomChosenColour = buttonColours[randomNum]; // random color
  gamePattern.push(randomChosenColour);

  // creates id and animates
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); 
  audio.play();
}

// animation on buttons
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed"); 

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"); 
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
