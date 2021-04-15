
let buttonColors = ["white", "pink", "lilac", "red", "green", "yellow", "orange", "blue", "brown", "grey", "black"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;


$("body").on("click", function (){

    if (!started) {
        $("title-level").text("Level " + level);
        nextSequence();
        started = true;
    }

})

$("body").keydown(function (){

    if (!started) {
        $("title-level").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function (){
    
    let userChosenColor = $(this).attr("id");
    
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

})

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#title-level").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*11);
    
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);

    playSound(randomChosenColor);


}




function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    },200);



}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 800);
        }
    } else {

        playSound("wrong");

        $("body").addClass("game-over");
        $("#title-level").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 800);

        

        startOver();


    }

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level: 0;
    gamePattern = [];
    started = false;

}

