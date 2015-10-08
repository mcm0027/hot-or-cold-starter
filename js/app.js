
var randomNum = 0;
var guess = 0;
var numGuesses = 0;
var noNum = true;
var noDec = 1;
var oldGuess = 0;
var diffGuess = 0;
var oldDiff = 0;

function newGame() {
	randomNum = Math.floor((Math.random()*100) + 1);
	console.log(randomNum);
	$("#guessList").children().remove();
	numGuesses = 0;
	$("#count").text(numGuesses);
	$("#feedback").text("Make your Guess!");
}

function guessResponse(guess){
	if (numGuesses === 1) {
		if (guess == randomNum) {
		   	$(".win").fadeIn(1000);
			newGame();
		} else if ((guess >= randomNum + 50) || (guess <= randomNum - 50)) {
			$("#feedback").text("You are ice cold!");
		} else if ((guess >= randomNum + 30) || (guess <= randomNum - 30)) {
			$("#feedback").text("You are cold!");
		} else if ((guess >= randomNum + 20) || (guess <= randomNum - 20)) {
			$("#feedback").text("You are warm!");
		} else if ((guess >= randomNum + 10) || (guess <= randomNum - 10)) {
			$("#feedback").text("You are hot!");
		} else{
			$("#feedback").text("You are very hot!")
		}
	} else {
		if (guess == randomNum) {
			$(".win").fadeIn(1000);
			newGame();
		} else if (oldDiff > diffGuess) {
			$("#feedback").text("You are getting warmer!");
		} else if (guess == oldGuess) {
			$("#feedback").text("That was the same number, genius.");
		} else {
			$("#feedback").text("You are getting colder!");
		}
	}

}


$(document).ready(function(){
	newGame();

	$("nav ul").on("click", ".new", function() {
		newGame();
	});

	$("form").on("click", "#guessButton", function() {
		var guess = $(this).prev().val();
		$(this).prev().val("");
		console.log(guess);
		trueInt = parseInt(guess);
		noNum = isNaN(parseFloat(trueInt));
		noDec = guess % 1;
		if (noNum) {
			alert("That wasn't a number!");
		} else if (noDec != 0) {
			alert('Please enter a whole number (i.e. "10" not "10.5")');
		} else if ((guess <=0) || (guess > 100)) {
			alert("Please enter a number between 1 and 100");
		} else {
		$("#guessList").append("<li>" + guess + 
			"</li>");
		numGuesses++;
		$("#count").text(numGuesses);
		oldDiff = diffGuess;
		diffGuess = Math.abs(randomNum - guess);
		console.log(diffGuess);
		console.log(oldDiff);
		guessResponse(guess);
		oldGuess = guess;
		
		}
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  		$(".win").fadeOut(1000);
  	});

});


