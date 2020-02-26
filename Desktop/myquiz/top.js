'user strict'

{
    const startBtn = document.getElementById('start-btn');
    const topBtn = document.getElementById('top-btn');
    const topDisplay = document.getElementById('display');
    const quizs = [];
    const questionNumber = document.getElementById('topSection');
    const questionGenre = document.getElementById('genreSection');
    const questionDifficulty = document.getElementById('difficultSection');
    const question = document.getElementById('question');

    startBtn.addEventListener('click', function () {

        // fetch→URLからAPIを持ってくる処理
        fetch('http://opentdb.com/api.php?amount=10')
            .then(function (response) {
                return response.json();
            })
            .catch(function () {
                return Promise.reject(new Error('エラーです'));
            })
            .then(function (data) {
                const jsonData = data.results;
                console.log(jsonData[0]);
                for (let i = 0; i < jsonData.length; i++) {
                    quizs.push(jsonData[i]);
                }
                console.log(quizs);
            })
    })

    const showQuiz = function () {
        const quizCategory = quizs[0].category;
        const quizDifficulty = quizs[0].difficulty;
        const quizQuestion = quizs[0].question;
        console.log(quizQuestion);

        questionNumber.innerHTML = 1;
        questionGenre.innerHTML = quizCategory;
        questionDifficulty.innerHTML = quizDifficulty;
        question.innerHTML = quizQuestion;

        const answerBtn_01 = document.createElement('button');
        const answerBtn_02 = document.createElement('button');
        const answerBtn_03 = document.createElement('button');
        const answerBtn_04 = document.createElement('button');

        topDisplay.appendChild(answerBtn_01);
        topDisplay.appendChild(answerBtn_02);
        topDisplay.appendChild(answerBtn_03);
        topDisplay.appendChild(answerBtn_04);

        topBtn.removeChild(startBtn);

        // remove(startBtn);

        answerBtn_01.innerHTML = quizs[0].correct_answer;
        answerBtn_02.innerHTML = quizs[0].incorrect_answers[0];
        answerBtn_03.innerHTML = quizs[0].incorrect_answers[1];
        answerBtn_04.innerHTML = quizs[0].incorrect_answers[2];



    };

}