var hangmanGame = {
  wordList: [
    "backlight",
    "cornmeal",
    "disbelief",
    "hydrated",
    "mortify",
    "motion",
    "reopen",
    "subsystem",
    "vacate"
  ],
  wins: 0,
  currentWord: "",
  displayWord: "",
  userGuesses: "abcdefghijklmnopqrstuvwxyz",
  remainingGuesses: 9,
  gameOver: false,

  newGame: function() {
    //select new word and setup the display word for interface
    this.currentWord = this.wordList[
      Math.floor(Math.random() * this.wordList.length)
    ];
    console.log(this.currentWord);
    this.displayWord = "";

    //replace characters with underscores for displayed word
    for (i = 0; i < this.currentWord.length; i++) {
      this.displayWord = this.displayWord + "_";
    }
    console.log(this.displayWord);

    //reset the user guesses
    this.userGuesses = "abcdefghijklmnopqrstuvwxyz";
    console.log(this.userGuesses);

    this.remainingGuesses = 9;
  },

  processGuess: function(uGuess) {
    //convert guess to sting and check if it is a new letter
    console.log(uGuess);
    var guess = String(uGuess);
    console.log(guess);

    if (this.userGuesses.includes(guess)) {
      //guess is a new letter, remove it from the valid choices
      this.userGuesses = this.userGuesses.replace(guess, "");
      console.log(this.userGuesses);
      //check if guess is in the current word
      if (this.currentWord.includes(guess)) {
        //correct guess
        console.log("Correct Guess");
        //code for correct guess
        //adjust display string with chars
      } else {
        console.log("Incorrect Guess");
        //incorrect guess, subtract from remaining guesses and check for game over
        this.remainingGuesses--;
        if (this.remainingGuesses == 0) {
          this.gameOver = true;
          alert("Game Over! Click New Game to start a new game");
        }
      }
    } else {
      //guess has already been entered, do nothing
      console.log("Character already chosen: " + guess);
      console.log("Here's the remaining guesses: " + this.userGuesses);
      console.log("Remaining Guess Attempts: " + this.remainingGuesses);
      console.log("Is the game over? " + this.gameOver);
    }
  }
};

$(document).ready(function() {
  $("#new-game").on("click", function() {
    hangmanGame.newGame();
    $("#random-word").text(hangmanGame.displayWord);
    $("#guesses-remaining").text(hangmanGame.remainingGuesses);
    $("#letters-remaining").text(hangmanGame.userGuesses);
    alert("New Game Started!");
  });

  //capture keypress and pass to game logic IF GAME NOT OVER

  document.onkeyup = function(event) {
    var keyPress = event.key;
    console.log("--------------------");
    if (!hangmanGame.gameOver) {
      hangmanGame.processGuess(keyPress);
    }
    //update text on page
    $("#random-word").text(hangmanGame.displayWord);
    $("#guesses-remaining").text(hangmanGame.remainingGuesses);
    $("#letters-remaining").text(hangmanGame.userGuesses);
  };
});

// // Only run the following code block if the user presses "r" or "p" or "s".
// if ((keyPress === "h") || (keyPress === "d") || (keyPress === "w") || (keyPress === "s") || (keyPress === "t")) {
//   if (keyPress === "h") {
//     car.honk();
//   }
//   if (keyPress === "d") {
//     car.driveToWork();
//   }

//   if (keyPress === "w") {
//     car.driveAroundWorld();
//   }

//   if (keyPress === "s") {
//     car.crash();
//   }

//   if (keyPress === "t") {
//     car.getTuneUp();
//   }

// // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
// var html =
//   "<p>You chose: " + userGuess + "</p>" +
//   "<p>The computer chose: " + computerGuess + "</p>" +
//   "<p>wins: " + wins + "</p>" +
//   "<p>losses: " + losses + "</p>" +
//   "<p>ties: " + ties + "</p>";

// // Set the inner HTML contents of the #game div to our html string
// document.querySelector("#game").innerHTML = html;
