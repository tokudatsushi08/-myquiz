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
                quizs.push(quizContent);
                console.log(quizs);
            })
    });
}