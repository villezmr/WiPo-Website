const questionElement = document.getElementById("question");
const showenQuestionsContainer = document.getElementById("showen-questions");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const scoreMaxText = document.getElementById("scoreMax");
const scoreKorrektText = document.getElementById("scoreKorrekt");
const scoreWrongText = document.getElementById("scoreWrong");
const progressBar = document.getElementById("progressBar");
const currentQuestionThumb = document.getElementById("currentQuestionThumb")
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const countdownProgressBar = document.getElementById("countdownProgressBar");
const countdownText = document.getElementById("countdownText");

let countdownTimer;
let countdownValue = 10;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let correctAnwsers = 0;
let wrongAnwsers = 0;
let questionCounter = 0;
let availableQuestions = [];
let MAX_QUESTIONS = 3;
let questions = [];
let MAX_SCORE = 0;
let counterRun = true;

fetch("questions.json")
  .then((res) => res.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    MAX_QUESTIONS = loadedQuestions.length;
    loadedQuestions.forEach((q) => {
      MAX_SCORE = MAX_SCORE + (q.score * countdownValue)
    })
    startGame();
  })
  .catch((err) => console.log(err));

const startGame = () => {
  questionCounter = 0;
  score = 0;
  correctAnwsers = 0;
  wrongAnwsers = 0;
  availableQuestions = [...questions];
  scoreMaxText.innerText = `${MAX_SCORE}`

  getNewQuestion();

  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("quiz.app", JSON.stringify({
      correct: correctAnwsers,
      score: score,
      wrongAnwsers: wrongAnwsers,
      maxScore: MAX_SCORE,
    }));
    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Frage ${questionCounter}/${MAX_QUESTIONS}`;
  progressBar.value = (questionCounter / MAX_QUESTIONS) * 100;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  showenQuestionsContainer.innerHTML = "";
  currentQuestionThumb.src = `../img/${currentQuestion.imageName}`;
  currentQuestionThumb.onerror = function () {
    currentQuestionThumb.src = "https://www.bundestag.de/resource/image/962148/16x9/1170/659/b1f36e02580f5268eba59c919d402812/8F214C276A4A0BB9FB020F16193F5E75/wo_ist_bild1.png";
  };

  currentQuestion.options.forEach((option, index) => {
    const boxDiv = document.createElement("div");
    boxDiv.classList.add("box", "button");
    boxDiv.id = "current_question_option_" + index;

    const columnsDiv = document.createElement("div");
    columnsDiv.classList.add("columns");

    const letterDiv = document.createElement("p");
    letterDiv.classList.add("column", "is-one-fifth");
    letterDiv.innerText = String.fromCharCode(97 + index);

    const choiceDiv = document.createElement("p");
    choiceDiv.classList.add("choice-text", "column");
    choiceDiv.setAttribute("data-number", index);
    choiceDiv.innerText = option;

    boxDiv.addEventListener("click", () => handleChoice(choiceDiv, index));

    if (currentQuestion.answer === index) {
      boxDiv.classList.add("correct-anwser")
    }
    columnsDiv.appendChild(letterDiv);
    columnsDiv.appendChild(choiceDiv);
    boxDiv.appendChild(columnsDiv);
    showenQuestionsContainer.appendChild(boxDiv);
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  startCountdown();
};

const startCountdown = () => {
  if (!countdownText) {
    console.error("Countdown elements not found.");
    return;
  }

  countdownValue = 10;
  counterRun = true;
  countdownText.innerText = countdownValue;

  countdownTimer = setInterval(() => {
    if (!counterRun) {
      clearInterval(countdownTimer);
      return;
    }
    countdownValue--;
    countdownText.innerText = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownTimer);

      wrongAnwsers++;
      scoreWrongText.innerText = `${wrongAnwsers} `;

      getNewQuestion();
    }
  }, 1000);
};



const handleChoice = (choice, index) => {
  counterRun = false;
  if (!acceptingAnswers) return;
  const questionContainer = document.getElementById(
    "current_question_option_" + index
  );
  const correctQuestionContainer = document.getElementsByClassName("correct-anwser")[0]

  acceptingAnswers = false;
  const selectedAnswer = index;

  const classToApply =
    selectedAnswer === currentQuestion.answer ? "is-success" : "is-danger";

  if (classToApply === "is-success") {
    incrementScore(currentQuestion.score * countdownValue);
    correctAnwsers++
    scoreKorrektText.innerText = `${correctAnwsers} `
  } else {
    wrongAnwsers++
    scoreWrongText.innerText = `${wrongAnwsers}`
    if (correctQuestionContainer) {
      console.log(correctQuestionContainer)
      correctQuestionContainer.classList.add("is-link", "is-dark")
    }
  }

  questionContainer.classList.add(classToApply);

  setTimeout(() => {
    choice.classList.remove(classToApply);
    getNewQuestion();
  }, 1000);
};

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = `${score} `;
};
