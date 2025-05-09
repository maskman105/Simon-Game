var gamePattern =[] ;

var userClickedPattern = [] ;

var buttonColours = ["red" , "blue" , "green" , "yellow"] ;

var start = false ;
var level = 0 ;

$(document).keypress(function() {
    if( !start ) {
        nextSequence() ;
        start = true ;
    }
})

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour) ;

    playSound( userChosenColour ) ;
    animatePress( userChosenColour ) ;

    checkAnswer(userClickedPattern.length - 1); 
});

function nextSequence() {
    userClickedPattern = [] ;

    level++ ;
    $("#level-title").text("Level " + level) ;
    var randomNumber = Math.floor(Math.random()*4) ;
   
    var randomChosenColour = buttonColours[ randomNumber ] ;
   
    gamePattern.push(randomChosenColour) ;

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100) ;

    playSound( randomChosenColour );

   
}

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3"); 
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed") ;

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed") ;
    },100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success") ;
    

    if(gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
            nextSequence();
        },1000) ;
    }
}
    else {
        console.log("wrong");

         playSound("wrong") ;

         $("body").addClass("game-over") ;
         setTimeout(function() {
            $("body").removeClass("game-over") ;
         },200) ;

         $("#level-title").text("Game Over. Press Any Key to Restart.") ;

         startOver() ;
    }
}

function startOver() {
    start = false ;
    level = 0 ;
     gamePattern = [] ;
}