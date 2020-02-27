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

        // fetch→URLからAPIを持ってくる処理
        fetch('http://opentdb.com/api.php?amount=10')
            .then(function (response) {
                console.log(response.json());
                return response.json();

            })
            .catch(function () {
                return Promise.reject(new Error('エラーです'));
            })


    })

    // 問題を表示する処理

}