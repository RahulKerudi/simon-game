let colors=["red","green","yellow","blue"]
var gamePattern=[]
var userPattern=[]
var start=false
var level=0

// calling nextSequence for the first time using keydown event
$("body").on("keydown",function(){
    if(!start){
    nextSequence()
    start=true
    }
})


// user click event
$(".btn").on("click",function(){
    userChosenColor=$(this).attr("id")
    userPattern.push(userChosenColor)

    playSound(userChosenColor)
    clickAnimate(userChosenColor)

    checkAnswer(userPattern.length-1)
})


// generating sequence randomly
function nextSequence(){
    userPattern=[]  // empty array to trace/push user click

    $("h1").html("Level "+level)
    level++;

    var randomNum=Math.floor(Math.random()*4);
    var randomColor=colors[randomNum];
    gamePattern.push(randomColor)

    $("#"+randomColor).fadeOut(100).fadeIn(100)

    playSound(randomColor)
    
}

// comparing both userPattern and gamePattern
function checkAnswer(currentLevel){
    if (userPattern[currentLevel]==gamePattern[currentLevel]){
        if (userPattern.length==gamePattern.length){
            // calling nextSequence for each correct userPattern
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }
    else{
        playSound("wrong")
        // adding game-over class
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").html("Game Over press any key to restart!!")

        startOver()
    }
}

// adding sounds for each button
function playSound(color){
    var sound=new Audio("sounds/"+color+".mp3")
    sound.play()
}

// animating the buttton for user click
function clickAnimate(color){
    $("#"+color).addClass('pressed')
    
    setTimeout(() => {
        $("#"+color).removeClass('pressed')
    }, 100);
}

// re-initialize all values to start again
function startOver(){
    gamePattern=[]
    start=false
    level=0
}






