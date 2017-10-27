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
    this.gameOver = false;
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
        var tempWord = this.currentWord;
        var replaceCounter = 0;

        //adjust display string with guess chars
        while (tempWord.indexOf(guess) != -1) {
          var pos = tempWord.indexOf(guess);
          tempWord =
            tempWord.substr(0, pos) + tempWord.substr(pos + 1, tempWord.length);
          this.displayWord =
            this.displayWord.substr(0, pos + replaceCounter) +
            guess +
            this.displayWord.substr(
              pos + replaceCounter + 1,
              this.displayWord.length
            );
          replaceCounter++;
        }

        //check if user had correctly guessed the whole word
        if (this.currentWord == this.displayWord){
          this.gameOver = true;
          this.wins++;
          alert("WINNER WINNER CHICKEN DINNER! Click New Game to start a new game");
        }

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
    $("#letters-remaining").text(hangmanGame.wins);
  };
});
