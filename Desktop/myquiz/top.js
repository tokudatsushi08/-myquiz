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

                // quizsの配列にpushする処理
                for (let i = 0; i < quizContent.length; i++) {
                    quizs.push(quizContent[i]);
                }

                // 配列の中身をシャッフルする処理
                const quizsLength = quizs.length;
                for (let i = quizsLength - 1; i > 0; i--) {
                    const randomIndex = Math.floor(Math.random() * (i + 1));
                    [quizs[i], quizs[randomIndex]] = [quizs[randomIndex], quizs[i]];
                }

                console.log(quizs);
            })


    });

}