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
        getQuiz();
    })

    // fetch→URLからAPIを持ってくる処理
    const getQuiz = function () {
        fetch('http://opentdb.com/api.php?amount=10')
            .then(function (response) {
                return response.json();
            })
            .then(function (myjson) {
                for (let i = 0; i < 10; i++) {
                    const jsonData = myjson.results[i];
                    quizs.push(jsonData);
                }
                // for (let i = 0; i < jsonData.length; i++) {
                //     quizs.push(jsonData[i]);
                console.log(quizs);
                // }
                // console.log(myjson);
                // console.log(myjson.results[0].category);
            })
            .then(function () {
                showQuiz();
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