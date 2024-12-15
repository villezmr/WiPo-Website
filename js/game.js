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
    // FOR USING LIVE SERVER VSC EXTENSION
    questions = loadedQuestions;
    MAX_QUESTIONS = loadedQuestions.length;
    loadedQuestions.forEach((q) => {
      MAX_SCORE = MAX_SCORE + (q.score * countdownValue)
    })
    startGame();
  })
  .catch((err) => {
    console.log(err)
    questions = [
      {
        "question": "Was beschreibt das Bruttoinlandsprodukt?",
        "options": [
          "Die Höhe der Staatsverschuldung eines Landes.",
          "Den Wert aller in einem Land produzierten Waren und Dienstleistungen in einem Jahr.",
          "Die Arbeitslosenquote in einem Land.",
          "Die durchschnittlichen Löhne einer Volkswirtschaft."
        ],
        "answer": 1,
        "imageName": "image_1.png",
        "score": 1
      },
      {
        "question": "Welche Funktion hat eine Zentralbank?",
        "options": [
          "Sie kontrolliert den Goldpreis weltweit.",
          "Sie legt die Steuersätze fest.",
          "Sie steuert die Geldmenge und sichert die Preisstabilität.",
          "Sie vergibt Kredite an Unternehmen.",
          "Sie entscheidet über die Höhe der Sozialversicherungsbeiträge."
        ],
        "answer": 3,
        "imageName": "image_2.png",
        "score": 2
      },
      {
        "question": "Was bedeutet „Marktwirtschaft“?",
        "options": [
          "Der Staat regelt alle wirtschaftlichen Prozesse",
          "Angebot und Nachfrage bestimmen den Markt. ",
          "Alle Betriebe gehören dem Staat.",
          "Eine Wirtschaft, die stark durch Subventionen geprägt ist.",
          "Ein System, das auf der Gleichverteilung aller Güter basiert.",
          "Die Preise werden durch das Parlament beschlossen."
        ],
        "answer": 3,
        "imageName": "image_3.png",
        "score": 3
      },
      {
        "question": "Was bedeutet „Inflation“?",
        "options": [
          "Ein Anstieg des Außenhandels eines Landes.",
          "Ein allgemeiner Anstieg der Preise in einer Volkswirtschaft.",
          "Eine Zunahme der Sparquote der Haushalte.",
          "Eine Erhöhung der Löhne und Gehälter."
        ],
        "answer": 1,
        "imageName": "image_4.jpg",
        "score": 1
      },
      {
        "question": " Was ist ein „Staatshaushalt“?",
        "options": [
          "Die Bilanz der Gewinne staatlicher Unternehmen.",
          "Die Schulden des Staates gegenüber der Zentralbank.",
          "Ein Gebäude, in dem die Regierung arbeitet.",
          "Die jährlichen Kosten für Bildung und Infrastruktur eines Landes.",
          "Ein Plan, der die Ausgaben und Einnahmen eines Staates festlegt."
        ],
        "answer": 4,
        "imageName": "image_5.jpg",
        "score": 2
      },
      {
        "question": "Was versteht man unter „Globalisierung“?",
        "options": [
          "Den Zusammenschluss aller Staaten zu einer Weltregierung.",
          "Die Schaffung eines gemeinsamen Weltwährungssystems.",
          "Den zunehmenden Austausch von Waren, Informationen und Kapital weltweit. ",
          "Eine Welt, in der keine nationalen Regierungen mehr existieren",
          "Die Abschaffung nationaler Grenzen."
        ],
        "answer": 3,
        "imageName": "image_6.jpg",
        "score": 2
      },
      {
        "question": "Was ist das Ziel der Europäischen Zentralbank (EZB)?",
        "options": [
          "Die Förderung von Arbeitsplätzen in Europa.",
          "Die Kontrolle der nationalen Haushalte der EU-Mitgliedsstaaten.",
          "Die Sicherung von Preisstabilität und die Steuerung der Geldpolitik",
          "Die Einführung eines europäischen Mindestlohns."
        ],
        "answer": 2,
        "imageName": "image_7.jpg",
        "score": 1
      },
      {
        "question": "Was bedeutet „Soziale Marktwirtschaft“?",
        "options": [
          "Eine Marktwirtschaft ohne staatliche Eingriffe.",
          "Eine Wirtschaftsordnung, die Wettbewerb mit sozialem Ausgleich kombiniert.",
          "Ein System, in dem der Staat alle Preise festlegt.",
          "Ein System, das nur auf Sozialleistungen basiert.",
          "Eine Wirtschaftsordnung mit zentraler Planung und wenigen Marktmechanismen.",
          "Eine Marktordnung, die nur auf private Unternehmen setzt."
        ],
        "answer": 3,
        "imageName": "image_8.jpg",
        "score": 3
      },
      {
        "question": "Was sind „Fixkosten“ in einem Unternehmen?",
        "options": [
          "Kosten, die unabhängig von der Produktionsmenge immer anfallen.",
          "Kosten, die durch Kreditrückzahlungen entstehen.",
          "Kosten für den Import von Rohstoffen.",
          "Kosten, die sich je nach Produktionsmenge ändern."
        ],
        "answer": 0,
        "imageName": "image_9.jpg",
        "score": 1
      },
      {
        "question": "Was ist der Unterschied zwischen „Import“ und „Export“?",
        "options": [
          "Import ist der Verkauf, Export der Einkauf von Waren.",
          "Import ist der Einkauf, Export der Verkauf von Waren. ",
          "Import sind Steuern, Export sind Zölle.",
          "Import bedeutet Lagerung, Export bedeutet Vertrieb."
        ],
        "answer": 1,
        "imageName": "image_10.webp",
        "score": 1
      },
      {
        "question": "Was sind „Zölle“?",
        "options": [
          "Steuern auf Waren, die innerhalb eines Landes gehandelt werden.",
          "Gebühren auf importierte oder exportierte Waren. ",
          "Geldbußen für Unternehmen, die illegal handeln.",
          "Subventionen für den Außenhandel."
        ],
        "answer": 1,
        "imageName": "image_11.png",
        "score": 1
      },
      {
        "question": "Was versteht man unter „Arbeitslosigkeit“?",
        "options": [
          "Die Zahl der Menschen, die nicht arbeiten wollen.",
          "Die Zahl der Arbeitsplätze in einem Land.",
          "Die Zahl der Rentner in einem Land.",
          "Die Zahl der Menschen, die keine Arbeit haben, aber arbeiten möchten"
        ],
        "answer": 3,
        "imageName": "image_12.png",
        "score": 1
      },
      {
        "question": "Was bedeutet „Handelsbilanz“?",
        "options": [
          "Der Vergleich der Importe und Exporte eines Landes.",
          "Die Gesamtheit aller Steuereinnahmen eines Landes.",
          "Die Kosten für den Warentransport im Handel.",
          "Der Jahresumsatz der Unternehmen eines Landes."
        ],
        "answer": 0,
        "imageName": "image_13.png",
        "score": 1
      },
      {
        "question": " Welche Aufgabe hat die Legislative in einem Staat?",
        "options": [
          "Sie führt die Gesetze aus.",
          "Sie erlässt und beschließt Gesetze. ",
          "Sie kontrolliert die Gerichte.",
          "Sie erhebt Steuern."
        ],
        "answer": 1,
        "imageName": "image_14.jpg",
        "score": 1
      },
      {
        "question": "Was bedeutet „Demokratie“?",
        "options": [
          "Eine Regierungsform, in der das Volk durch Wahlen Einfluss nimmt.",
          "Import ist der Einkauf, Export der Verkauf von Waren. ",
          "Eine Regierungsform, in der nur reiche Bürger wählen dürfen.",
          "Eine Regierungsform, in der keine Gesetze existieren."
        ],
        "answer": 0,
        "imageName": "image_15.jpg",
        "score": 1
      }
    ]
    MAX_QUESTIONS = questions.length
    questions.forEach((q) => {
      MAX_SCORE = MAX_SCORE + (q.score * countdownValue)
    })
    startGame();
  });



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
