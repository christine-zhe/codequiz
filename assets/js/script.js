var timerEl = document.getElementById('timer');

// containers 
var startEl = document.getElementById('start-quiz');
var quizEl = document.getElementById('quiz-container');
var questionContainerEl = document.getElementById('question-container');
var answerButtonsEl = document.getElementById('answer-buttons')
var questionDisplay = document.getElementById('question-display')

//buttons for element answers
var button1 = document.getElementById('btn-1');
var button2 = document.getElementById('btn-2');
var button3 = document.getElementById('btn-3');
var button4 = document.getElementById('btn-4');
var correctAnswer = document.getElementById("correctAnswer");

//starting values
var index = 0;
var initialScore = 0;
var timeLeft = 75;

//capturing the scores
var totalScore = document.getElementById("totalScore");
var highScoresEl = document.getElementById("highScores");
var scoresEl = document.getElementById("scores");
var submitScoresEl = document.getElementById('submitScores');
var highScoreslistEl = document.getElementById('highScoreslist');

//listing out all the questions
var questions = [
  {
    question: "The condition in an if/else statement is enclosed with _____.",
    answers: ["quotes", "curley brackets", "parenthesis", "square brackets"],
    correct: "curley brackets"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["Javascript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log"
  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes"
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: ["number and strings", "other arrays", "booleans", "all of the above"],
    correct: "all of the above"
  },
  {
    question: "Commonly used data types DO not include: ",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts"
  }
]

//initial start for the function
function startQuiz() {
  startEl.classList.add('hide')
  questionContainerEl.classList.remove('hide')
  answerButtonsEl.classList.remove('hide')

  timer();
  renderQuestion();
}

function renderQuestion() {
  //Display question

  var questionObject = questions[index]
  // var h1El = document.createElement("h1");
  // h1El.textContent = questionObject.question;
  // questionContainerEl.appendChild(h1El);


  questionDisplay.textContent = questionObject.question;

  // adding the text into each of the buttons
  button1.textContent = questionObject.answers[0];
  button2.textContent = questionObject.answers[1];
  button3.textContent = questionObject.answers[2];
  button4.textContent = questionObject.answers[3];
}

function answerCorrect(correct) {

  //if the questions are correct or not

  if (questions[index].correct === questions[index].answers[correct]) {
    initialScore = initialScore + 10;
    correctAnswer.textContent = "Correct!";
  }

  else {
    //subtracting out the time if incorrect question
    timeLeft = timeLeft - 10;
    timeLeft.textContent = timeLeft;
    correctAnswer.textContent = "Wrong!"
  }

  // to go to the next question
  index= index + 1;

  //checking if there's more to go
  if (index < questions.length) {
    renderQuestion();
  }

  else {
    endQuiz();
  }

}

// To allow to correct for each option
function option1() {
  answerCorrect(0);
}

function option2() {
  answerCorrect(1);
}

function option3() {
  answerCorrect(2);
}

function option4() {
  answerCorrect(3);
}


// Timer function for 1000 interval
function timer() {

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = 'Time: ' + timeLeft;
      timeLeft--;
    
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
    }
  }, 1000);
}

function endQuiz() {
  //ending the quiz
  quizEl.classList.add('hide')
  answerButtonsEl.classList.add('hide')
  scoresEl.classList.remove('hide')
  //describing the final scores.
  var finalScore = document.createElement("h1");
  finalScore.textContent = "Your final score is: " + initialScore;
  var saveInfo = document.createElement("h1");
  saveInfo.textContent = "Enter name to store score."
  scoresEl.appendChild(saveInfo);
  scoresEl.appendChild(finalScore);

}

function storeScores() {

  // getting item
  var savedHighScores = localStorage.getItem("High Scores");

  savedHighScores = JSON.parse(savedHighScores)

  var userScore = {
    Name: enterName.value,
    Score: initialScore
  };

  savedHighScores.push(userScore);

  var scoresCombined = JSON.stringify(savedHighScores);
  window.localStorage.setItem("High Scores", scoresCombined);

  highScores();

};




function highScores() {
  //Hide the HTML for High Scores
  highScoreslistEl.classList.remove('hide')
  quizEl.classList.add('hide')


  //getting from the local storage
  var storedScores = localStorage.getItem("High Scores");
  var storedScores = JSON.parse(storedScores);

  for (i = 0; i < storedScores.length; i++) {

    var initialHighScore = document.createElement("h2");

    initialHighScore.textContent = "Name: " + storedScores[i].Name + " with " + storedScores[i].Score + " points";

    highScoreslistEl.appendChild(initialHighScore);
  }
}

startEl.addEventListener("click", startQuiz);

button1.addEventListener("click", option1);
button2.addEventListener("click", option2);
button3.addEventListener("click", option3);
button4.addEventListener("click", option4);

submitScoresEl.addEventListener("click", storeScores);
highScoresEl.addEventListener("click", highScores);




