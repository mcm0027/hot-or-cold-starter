
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
	diffGuess =0;
	$("#count").text(numGuesses);
	$("#feedback").text("Make your Guess!");
}

function guessResponse(guess){
	console.log("diff guess "+ diffGuess);
		console.log("old diff "+ oldDiff);
	if (numGuesses === 1) {
		if (guess == randomNum) {
		 	$(".win").fadeIn(1000);
		 	$(".moreTries").hide();
		 	$(".oneTry").fadeIn(1000);
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
			$(".oneTry").hide();
			$(".moreTries").fadeIn(1000);
			$("#winNum").text(numGuesses);
			newGame();
		} else if ((oldDiff > diffGuess) && ((guess >= (randomNum + 50)) || (guess <= (randomNum - 50)))) {
			$("#feedback").text("You are ice cold, but getting warmer!");
			console.log("1");
		} else if ((oldDiff > diffGuess) && ((guess >= (randomNum + 30)) || (guess <= (randomNum - 30)))) {
			$("#feedback").text("You are cold, but getting warmer!");
			console.log("2");
		} else if ((oldDiff > diffGuess) && ((guess >= (randomNum + 20)) || (guess <= (randomNum - 20)))) {
			$("#feedback").text("You are warm, and getting warmer!");
			console.log("3");
		} else if ((oldDiff > diffGuess) && ((guess >= (randomNum + 10)) || (guess <= (randomNum - 10)))) {
			$("#feedback").text("You are hot, and getting hotter!");
			console.log("4");
		} else if ((oldDiff > diffGuess) && ((guess >= (randomNum + 1)) || (guess <= (randomNum - 1)))) {
			$("#feedback").text("You are very hot, and getting hotter!");
			console.log("11");
		} else if ((oldDiff < diffGuess) && ((guess >= (randomNum + 50)) || (guess <= (randomNum - 50)))) {
			$("#feedback").text("You are ice cold, and getting colder!");
			console.log("5");
		} else if ((oldDiff < diffGuess) && ((guess >= (randomNum + 30)) || (guess <= (randomNum - 30)))) {
			$("#feedback").text("You are cold, and getting colder!");
			console.log("6");
		} else if ((oldDiff < diffGuess) && ((guess >= (randomNum + 20)) || (guess <= (randomNum - 20)))) {
			$("#feedback").text("You are warm, but getting colder!");
			console.log("7");
		} else if ((oldDiff < diffGuess) && ((guess >= (randomNum + 10)) || (guess <= (randomNum - 10)))) {
			$("#feedback").text("You are hot, but getting colder!");
			console.log("8");
		} else if ((oldDiff < diffGuess) && ((guess >= (randomNum + 1)) || (guess <= (randomNum - 1)))) {
			$("#feedback").text("You are very hot, but getting colder!");
			console.log("12");
		} else if (guess == oldGuess) {
			$("#feedback").text("That was the same number, genius.");
			console.log("9");
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
		console.log("guess: " + guess);
		trueInt = parseInt(guess);
		noNum = isNaN(parseFloat(trueInt));
		noDec = guess % 1;
		if (noNum) {
			$("#feedback").text("That wasn't a number!");
		} else if (noDec != 0) {
			$("#feedback").text('Please enter a whole number (i.e. "10" not "10.5").');
		} else if ((guess <=0) || (guess > 100)) {
			$("#feedback").text("Please enter a number between 1 and 100.");
		} else {
		$("#guessList").append("<li>" + guess + 
			"</li>");
		numGuesses++;
		$("#count").text(numGuesses);
		oldDiff = diffGuess;
		diffGuess = Math.abs(randomNum - guess);
		var checkDifferenceGuesss = (randomNum - guess);
		console.log("checkDifferenceGuesss: " + checkDifferenceGuesss);
		
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


