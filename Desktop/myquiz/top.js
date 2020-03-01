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
            // fetchで外部APIを取得する(リクエスト)。fetchを使う事で、Promiseオブジェクトを返してくれる（レスポンス）。
            // promiseオブジェクトとは、非同期処理の成功・失敗を表してくれるもので非同期処理に最適。
            // Promiseオブジェクトを使う事で、コールバック関数（ある動きをした後に特定の関数を行うもの）が実行される事はない。
            // Promiseオブジェクトを使いレスポンスが正しい回答で回答あれば、thenの処理をし、誤った回答であればcatchの処理を行う。
            // 成功した場合は、responseの内容を引数に入れられる。
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            // このthenの引数には、上記で取得したresponseをjson型にした物を引数に入れられる。
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
                    const firstBtn = document.createElement('button');
                    const secondBtn = document.createElement('button');
                    const answerObj = [];
                    answerObj.push(quizs[0].correct_answer);
                    answerObj.push(quizs[0].incorrect_answers[0]);

                    for (let i = answerObj.length - 1; i > 0; i--) {
                        let r = Math.floor(Math.random() * (i + 1));
                        let tmp = answerObj[i];
                        answerObj[i] = answerObj[r];
                        answerObj[r] = tmp;
                    }
                    console.log(answerObj);
                    firstBtn.textContent = answerObj[0];

                    secondBtn.textContent = answerObj[1];

                    topBtn.appendChild(firstBtn);
                    topBtn.appendChild(secondBtn);

                    firstBtn.addEventListener('click', function () {
                        console.log('１番が押されたよ！');
                        topBtn.removeChild(firstBtn);
                        topBtn.removeChild(secondBtn);
                        nextQuiz();
                    })

                    secondBtn.addEventListener('click', function () {
                        console.log('2番が押されたよ！');
                        topBtn.removeChild(firstBtn);
                        topBtn.removeChild(secondBtn);
                        nextQuiz();
                    })


                } else {
                    const firstBtn = document.createElement('button');
                    const secondBtn = document.createElement('button');
                    const thirdBtn = document.createElement('button');
                    const forthBtn = document.createElement('button');
                    const answerObj = [];

                    answerObj.push(quizs[0].correct_answer);
                    answerObj.push(quizs[0].incorrect_answers[0]);
                    answerObj.push(quizs[0].incorrect_answers[1]);
                    answerObj.push(quizs[0].incorrect_answers[2]);

                    for (let i = answerObj.length - 1; i > 0; i--) {
                        let r = Math.floor(Math.random() * (i + 1));
                        let tmp = answerObj[i];
                        answerObj[i] = answerObj[r];
                        answerObj[r] = tmp;
                    }

                    firstBtn.textContent = answerObj[0];
                    secondBtn.textContent = answerObj[1];
                    thirdBtn.textContent = answerObj[2];
                    forthBtn.textContent = answerObj[3];

                    topBtn.appendChild(firstBtn);
                    topBtn.appendChild(secondBtn);
                    topBtn.appendChild(thirdBtn);
                    topBtn.appendChild(forthBtn);

                    firstBtn.addEventListener('click', function () {
                        console.log('１番が押されたよ！');
                        topBtn.removeChild(firstBtn);
                        topBtn.removeChild(secondBtn);
                        topBtn.removeChild(thirdBtn);
                        topBtn.removeChild(forthBtn);
                        nextQuiz();
                    })

                    secondBtn.addEventListener('click', function () {
                        console.log('2番が押されたよ！');
                        topBtn.removeChild(firstBtn);
                        topBtn.removeChild(secondBtn);
                        topBtn.removeChild(thirdBtn);
                        topBtn.removeChild(forthBtn);
                        nextQuiz();
                    })

                    thirdBtn.addEventListener('click', function () {
                        console.log('3番が押されたよ！');
                        topBtn.removeChild(firstBtn);
                        topBtn.removeChild(secondBtn);
                        topBtn.removeChild(thirdBtn);
                        topBtn.removeChild(forthBtn);
                        nextQuiz();
                    })

                    forthBtn.addEventListener('click', function () {
                        console.log('4番が押されたよ！');
                        topBtn.removeChild(firstBtn);
                        topBtn.removeChild(secondBtn);
                        topBtn.removeChild(thirdBtn);
                        topBtn.removeChild(forthBtn);
                        nextQuiz();
                    })
                }


            })
            .catch(function (error) {
                return error;
            })

    };

    // 次のクイズを表示する
    const nextQuiz = function () {
        quizs.splice(0, 1)
        console.log(quizs);
        console.log(quizs[0]);


        questionNumber.innerHTML = 11 - quizs.length;
        questionGenre.innerHTML = quizs[0].category;
        questionDifficulty.innerHTML = quizs[0].difficulty;
        question.innerHTML = quizs[0].question;

        if (quizs[0].incorrect_answers.length === 1) {
            const firstBtn = document.createElement('button');
            const secondBtn = document.createElement('button');
            const answerObj = [];
            answerObj.push(quizs[0].correct_answer);
            answerObj.push(quizs[0].incorrect_answers[0]);

            for (let i = answerObj.length - 1; i > 0; i--) {
                let r = Math.floor(Math.random() * (i + 1));
                let tmp = answerObj[i];
                answerObj[i] = answerObj[r];
                answerObj[r] = tmp;
            }
            console.log(answerObj);
            firstBtn.textContent = answerObj[0];

            secondBtn.textContent = answerObj[1];

            topBtn.appendChild(firstBtn);
            topBtn.appendChild(secondBtn);

            firstBtn.addEventListener('click', function () {
                console.log('１番が押されたよ！');
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                nextQuiz();
            })

            secondBtn.addEventListener('click', function () {
                console.log('2番が押されたよ！');
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                nextQuiz();
            })
        } else {
            const firstBtn = document.createElement('button');
            const secondBtn = document.createElement('button');
            const thirdBtn = document.createElement('button');
            const forthBtn = document.createElement('button');
            const answerObj = [];

            answerObj.push(quizs[0].correct_answer);
            answerObj.push(quizs[0].incorrect_answers[0]);
            answerObj.push(quizs[0].incorrect_answers[1]);
            answerObj.push(quizs[0].incorrect_answers[2]);

            for (let i = answerObj.length - 1; i > 0; i--) {
                let r = Math.floor(Math.random() * (i + 1));
                let tmp = answerObj[i];
                answerObj[i] = answerObj[r];
                answerObj[r] = tmp;
            }

            firstBtn.textContent = answerObj[0];
            secondBtn.textContent = answerObj[1];
            thirdBtn.textContent = answerObj[2];
            forthBtn.textContent = answerObj[3];

            topBtn.appendChild(firstBtn);
            topBtn.appendChild(secondBtn);
            topBtn.appendChild(thirdBtn);
            topBtn.appendChild(forthBtn);

            firstBtn.addEventListener('click', function () {
                console.log('１番が押されたよ！');
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })

            secondBtn.addEventListener('click', function () {
                console.log('2番が押されたよ！');
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })

            thirdBtn.addEventListener('click', function () {
                console.log('3番が押されたよ！');
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })

            forthBtn.addEventListener('click', function () {
                console.log('4番が押されたよ！');
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })
        }

    }

}
