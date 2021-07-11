var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = []

var started = false;  //keep in mind that boolen value should have var not other type;;
var level = 0;

// $(document).one("keypress" ,(function () {
//     nextSequence();
//   }));



$(document).keypress(function () { 
    if(!started) {
        $('h1').text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

$('#reset').click(function () { 
    if(!started) {
        $('h1').text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

$('.btn').click(function(e){
    const userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);  
    
    checkAnswer(userClickedPattern.length - 1);
})

//game logic == if currentcolor is equal to userclicked then true if not game ends

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {         //if the userClickedPattern's current level is equal to the currentlevel of game pattern.  
        if(userClickedPattern.length === gamePattern.length){       //if userclicked arrays last item equals gamepatterns last itme then we call the nextSequence after 1 sec
            setTimeout(function () {
                nextSequence()
              }, 1000);
            
            userClickedPattern = [];
        }

    }
    else {
        
        playSound('wrong');
        $('body').addClass('game-over');

        setTimeout(function () { 
            $('body').removeClass('game-over');
         },200);

         $('h1').text("Game Over. Press Any Key To Restart");

         gameOver();
    }
}



function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text("Level "+ level);              //every time is nextSequence function get trigerd we increament the level by one..
    
    
    const randomNumber = Math.floor(Math.random() * 4);
    
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    playSound(randomChosenColor);
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    
}





function animatePress(currentColor){

   $('#' + currentColor).addClass('pressed');

   setTimeout(function(){
    $('#' + currentColor).removeClass('pressed');
   }, 100)

}

function playSound(name) {
    const sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}




//starting game again

function gameOver() {
    gamePattern = [];
    level = 0;
    started = false;
}




  







