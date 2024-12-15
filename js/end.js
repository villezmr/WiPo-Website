const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const quizResult = localStorage.getItem("quiz.app");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

const plainValues = JSON.parse(quizResult)
const scoreText = document.getElementById("score");
const scoreMaxText = document.getElementById("scoreMax");
const scoreKorrektText = document.getElementById("scoreKorrekt");
const scoreWrongText = document.getElementById("scoreWrong");

scoreText.innerText = plainValues.score || 0
scoreMaxText.innerText = plainValues.maxScore || 0
scoreKorrektText.innerText = plainValues.correct || 0
scoreWrongText.innerText = plainValues.wrongAnwsers || 0

const evaluatePerformance = (maxScore, score) => {

  let performanceMessage = '';

  if (score >= maxScore) {
    performanceMessage = 'Perfekt!';
  } else if (score >= maxScore * 0.8) {
    performanceMessage = 'Gut gemacht!';
  } else if (score >= maxScore * 0.5) {
    performanceMessage = 'Du bist auf dem richtigen Weg!';
  } else {
    performanceMessage = 'Du kannst es besser machen!';
  }

  const performanceElement = document.getElementById('performanceMessage');
  if (performanceElement) {
    performanceElement.innerText = performanceMessage;
  }
};

evaluatePerformance(plainValues.maxScore, plainValues.score)

const setResultGif = () => {
  const maxScore = parseInt(scoreMaxText.innerText) || 0;
  const score = parseInt(scoreText.innerText) || 0;
  const percentage = (score / maxScore) * 100;

  let videoSrc = "https://giphy.com/embed/l41lZxzroU33typuU"
  let anchorSrc = "https://giphy.com/gifs/full-house-michelle-tanner-you-got-it-dude-l41lZxzroU33typuU";

  if (percentage >= 80) {
    videoSrc = "https://giphy.com/embed/Od0QRnzwRBYmDU3eEO"
    anchorSrc = "https://giphy.com/gifs/primevideo-2020-borat-subsequent-moviefilm-Od0QRnzwRBYmDU3eEO";
  } else if (percentage >= 50) {
    videoSrc = "https://giphy.com/embed/l41lZxzroU33typuU"
    anchorSrc = "https://giphy.com/gifs/full-house-michelle-tanner-you-got-it-dude-l41lZxzroU33typuU";
  } else if (percentage < 20) {
    videoSrc = "https://giphy.com/embed/d2lcHJTG5Tscg"
    anchorSrc = "https://giphy.com/gifs/blackish-anthony-anderson-dre-johnson-d2lcHJTG5Tscg";
  }
  const resultGif = document.getElementById('result-gif');
  const resultGifAnchor = document.getElementById('result-gif-href')
  if (resultGif) {
    resultGif.src = videoSrc;
  }
};

setResultGif();

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    name: username.value,
    score: `${plainValues.score}/${plainValues.maxScore}`,
    correct: plainValues.correct,
    wrong: plainValues.wrongAnwsers
  };

  highScores.push(score);

  highScores.sort((a, b) => (b.score = a.score));

  highScores.sort((a, b) => {
    return (b.score = a.score);
  });
  highScores.splice(5);
  JSON.stringify(localStorage.setItem("highScores", highScores));

  window.location.assign("/");
};
