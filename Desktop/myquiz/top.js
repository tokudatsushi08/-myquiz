'user strict'

{
    const startBtn = document.getElementById('startBtn');
    const quizs = [];
    startBtn.addEventListener('click', function () {

        // fetch→URLからAPIを持ってくる処理
        fetch('https://opentdb.com/api.php?amount=10')
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    return Promise.reject(new Error('エラーです'))
                };
            })
            .then(function (response) {
                const objRes = JSON.parse(response);
                console.log(objRes);
                const quizContent = objRes.results;

                for (let i = 0; i < objRes.results.length; i++) {
                    quizs.push(quizContent[i]);
                }

                console.log(quizs);
                console.log(quizs[1]);
                console.log(quizs.length);

                // ランダムにする処理
                const randomQuizs = Math.floor(Math.random() * quizs.length);
                console.log(randomQuizs);

                // 一度表示されたものは削除していく
                quizs.splice(randomQuizs, 1);
                console.log(quizs);
            })
    });



}