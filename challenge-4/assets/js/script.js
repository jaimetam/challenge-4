var startButton = document.getElementById("startButton");
var timerElement = document.querySelector(".timer");
var titleElement = document.querySelector(".Title");
var p1 = document.querySelector(".p1");
var saveScoreContainer = document.getElementById("save-score-container");

var timer;
var secondsLeft = 75;
var currentQuestionIndex = 0;
var highScore = parseInt(localStorage.getItem("highScore")) || 0;

var questions = [
    {
        question: "What is JavaScript?",
        choices: ["a) A programming language", "b) A database management System", "c) A markup language", "d) An operating system"],
        correctAnswer: "a) A programming language"
    },
    {
        question: "What is the purpose of the 'typeof' operator in JavaScript?",
        choices: ["a) To check the data type of a variable", "b) To create a new variable", "c) To concatenate strings", "d) To define a function"],
        correctAnswer: "a) To check the data type of a variable"
    },
    {
        question: "How do you declare a variable in JavaScript?",
        choices: ["a) var", "b) variable", "c) v", "d) let"],
        correctAnswer: "a) var"
    }
];


titleElement.textContent = "Welcome to coding quiz";
p1.textContent = "Try to answer the following questions";

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.style.display = "none";
    setTimer();
    displayQuestion();
}

function setTimer() {
    timer = setInterval(function() {
        secondsLeft--;
        timerElement.textContent = "Timer: " + secondsLeft;

        if (secondsLeft <= 0 || currentQuestionIndex >= questions.length) {
            endQuiz();
        }
    }, 1000);
}

function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    titleElement.textContent = "Question " + (currentQuestionIndex + 1);
    p1.textContent = currentQuestion.question;

   
    var choicesContainer = document.getElementById("choices-container");
    if (choicesContainer) {
        choicesContainer.innerHTML = "";
    } else {
        choicesContainer = document.createElement("div");
        choicesContainer.id = "choices-container";
        document.querySelector("main").appendChild(choicesContainer);
    }

    currentQuestion.choices.forEach(function (choice, index) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", function () {
            checkAnswer(choice, currentQuestion.correctAnswer);
        });
        choicesContainer.appendChild(choiceButton);

        // Add a line break for vertical arrangement
        choicesContainer.appendChild(document.createElement("br"));
    });
}

function checkAnswer(userChoice, correctAnswer) {
    var feedbackElement = document.createElement("p");

    if (userChoice === correctAnswer) {
        // Correct answer
        feedbackElement.textContent = "Correct!";
        // Add 15 points to the high score 
        addPoints(15);
    } else {
        // Incorrect answer
        feedbackElement.textContent = "Incorrect!";
        // Subtract 10 seconds from the clock
        secondsLeft -= 10; 
    }

    
    if (document.getElementById("feedback-container") === null) {
        var feedbackContainer = document.createElement("div");
        feedbackContainer.id = "feedback-container";
        document.querySelector("main").insertBefore(feedbackContainer, startButton);
        feedbackContainer.appendChild(feedbackElement);
    }

  
    currentQuestionIndex++;

    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Add function to add points to high score
function addPoints(points) {
   
    highScore += points;
    localStorage.setItem("highScore", highScore);
}


function updateHighScore() {
    var currentScore = secondsLeft + highScore; // Add your scoring logic here
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore);

        // Display high score in the aside
        var highScoreDisplay = document.getElementById("highScoreDisplay");
        highScoreDisplay.textContent = "High Score: " + highScore;

        // Display high score on the page only once
        var highScoreElement = document.getElementById("displayedHighScore");
        if (!highScoreElement) {
            highScoreElement = document.createElement("p");
            highScoreElement.textContent = "High Score: " + highScore;
            highScoreElement.id = "displayedHighScore";
            document.querySelector("main").appendChild(highScoreElement);
        }
    }
}

function endQuiz() {
    clearInterval(timer);

    // Update and display high score
    updateHighScore();

  
    saveScoreContainer.style.display = "block";
    displayRestartButton();
}

function displayRestartButton() {
    var restartButton = document.getElementById("restartButton");

    if (!restartButton) {
        restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.id = "restartButton";
        restartButton.addEventListener("click", function() {
            resetQuiz();
        });

        saveScoreContainer.appendChild(restartButton);
    }
}

function resetQuiz() {
    // Reset variables and elements for a new quiz
    currentQuestionIndex = 0;
    secondsLeft = 75;

    // Clear feedback container and displayed high score
    var feedbackContainer = document.getElementById("feedback-container");
    if (feedbackContainer) {
        feedbackContainer.parentNode.removeChild(feedbackContainer);
    }

    var displayedHighScore = document.getElementById("displayedHighScore");
    if (displayedHighScore) {
        displayedHighScore.parentNode.removeChild(displayedHighScore);
    }

    // Show start button
    startButton.style.display = "block";

    // Restart the quiz
    startQuiz();
}
