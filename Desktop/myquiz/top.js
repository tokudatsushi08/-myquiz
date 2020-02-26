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

}