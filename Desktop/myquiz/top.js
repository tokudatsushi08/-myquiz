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
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.results);
            })
            .catch(function (error) {
                return error;
            })


    }

    // 画面に表示される処理
    const showQuiz = function () {
        console.log(quizs[0]);
        questionNumber.innerHTML = 1;
        questionGenre.innerHTML = quizs[0].category;
        questionDifficulty.innerHTML = quizs[0].difficulty;
        question.innerHTML = quizs[0].question;
    }
}