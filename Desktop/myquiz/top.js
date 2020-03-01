'user strict'

{
    const startBtn = document.getElementById('start-btn');
    const topBtn = document.getElementById('top-btn');
    const topDisplay = document.getElementById('display');
    const quizs = [];
    const questionNumber = document.getElementById('top-section');
    const questionGenre = document.getElementById('genre-section');
    const questionDifficulty = document.getElementById('difficult-section');
    const question = document.getElementById('question');

    startBtn.addEventListener('click', function () {
        getQuiz();
    })

    // fetch→URLからAPIを持ってくる処理
    const getQuiz = function () {
        fetch('http://opentdb.com/api.php?amount=10')
            // fetchで外部APIを取得する。fetchを使う事で、Promiseオブジェクトを返してくれる。
            // promiseオブジェクトとは、非同期処理の成功・失敗を表してくれるもので非同期処理に最適。
            // Promiseオブジェクトを使う事で、コールバック関数（ある動きをした後に特定の関数を行うもの）が実行される事はない。
            // Promiseオブジェクトを使い、成功するとResponseオブジェクトを返してくれる。
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (json) {
                console.log(json);
                console.log(json.results[0]);
                for (let i = 0; i < 10; i++) {
                    quizs.push(json.results[i]);
                }
                // 最初に表示をさせる処理
                questionNumber.innerHTML = 1;
                questionGenre.innerHTML = quizs[0].category;
                questionDifficulty.innerHTML = quizs[0].difficulty;
                question.innerHTML = quizs[0].question;
                topBtn.removeChild(startBtn);

                console.log(quizs[0].incorrect_answers.length);

                if (quizs[0].incorrect_answers.length === 1) {
                    const answerBtn = document.createElement('button');
                    console.log(answerBtn);
                    answerBtn.textContent = quizs[0].incorrect_answers;
                    topBtn.appendChild(answerBtn);
                } else {
                    const firstBtn = document.createElement('button');
                    const secondeBtn = document.createElement('button');
                    const thirdBtn = document.createElement('button');
                    firstBtn.textContent = quizs[0].incorrect_answers[0];
                    secondeBtn.textContent = quizs[0].incorrect_answers[1];
                    thirdBtn.textContent = quizs[0].incorrect_answers[2];
                    topBtn.appendChild(firstBtn);
                    topBtn.appendChild(secondeBtn);
                    topBtn.appendChild(thirdBtn);
                };

                const correctBtn = document.createElement('button');
                correctBtn.textContent = quizs[0].correct_answer;
                topBtn.appendChild(correctBtn);

            })
            .catch(function (error) {
                return error;
            })

    };
}