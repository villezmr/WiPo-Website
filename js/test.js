const dummyHighScores = [
    { name: "Alice", score: "9/10", correct: 9, wrong: 1 },
    { name: "Bob", score: "8/10", correct: 8, wrong: 2 },
    { name: "Charlie", score: "7/10", correct: 7, wrong: 3 },
    { name: "Dana", score: "10/10", correct: 10, wrong: 0 },
    { name: "Eve", score: "6/10", correct: 6, wrong: 4 },
];

localStorage.setItem("highScores", JSON.stringify(dummyHighScores));

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const sortedHighScores = highScores.sort((a, b) => {
    const scoreA = parseInt(a.score.split("/")[0]);
    const scoreB = parseInt(b.score.split("/")[0]);

    return scoreB - scoreA || b.correct - a.correct;
});

const highScoresTable = document.getElementById('highScoresList');
highScoresTable.innerHTML = sortedHighScores
    .map(score => {
        return `
        <tr>
            <td>${score.name}</td>
            <td>${score.score}</td>
            <td>${score.correct}</td>
            <td>${score.wrong}</td>
        </tr>
        `;
    }).join("");
