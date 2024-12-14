const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];
        radio.addEventListener('change', () => {
            userSelection = radio.value; // Speichert die Auswahl
        });

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    if (!userSelection) {
        alert('Bitte wähle eine Antwort aus!');
        return;
    }

    const questionData = quizData[currentQuestion];
    const allOptions = document.querySelectorAll('input[name="quiz"]');

    // Markiere die Optionen farblich
    allOptions.forEach((option) => {
        option.disabled = true;
        if (option.value === questionData.answer) {
            option.parentElement.style.color = 'green';
        } else if (option.value === userSelection) {
            option.parentElement.style.color = 'red';
        }
    });

    // Prüfe die Antwort
    if (userSelection === questionData.answer) {
        score++;
    } else {
        incorrectAnswers.push({
            question: questionData.question,
            incorrectAnswer: userSelection,
            correctAnswer: questionData.answer,
        });
    }

    userSelection = null; // Zurücksetzen der Auswahl

    // Zeige den "Weiter"-Button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Weiter';
    nextButton.className = 'next-button';
    nextButton.addEventListener('click', nextQuestion);

    quizContainer.appendChild(nextButton);
    submitButton.style.display = 'none'; // Verberge den Submit-Button
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
        submitButton.style.display = 'inline-block'; // Zeige den Submit-Button wieder
    } else {
        displayResult();
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
