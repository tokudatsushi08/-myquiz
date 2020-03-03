'user strict'

{
    const startBtn = document.getElementById('start-btn');
    const topBtn = document.getElementById('top-btn');
    const topDisplay = document.getElementById('top');
    const quizs = [];
    const answerCount = [];
    const topgenre = document.getElementById('genre');
    const topDifficult = document.getElementById('difficult');
    const questionNumber = document.getElementById('top-section');
    const questionGenre = document.getElementById('genre-section');
    const questionDifficulty = document.getElementById('difficult-section');
    const question = document.getElementById('question');

    startBtn.addEventListener('click', function () {

        questionNumber.innerHTML = "取得中";
        question.innerHTML = "少々お待ちください";
        getQuiz();
    })
  
    // クイズを取ってくる処理
    const getQuiz = function () {
        // fetch→URLからAPIを持ってくる処理

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
                console.log(quizs);
                // 最初に表示をさせる処理
                questionNumber.innerHTML = 1;
                questionGenre.innerHTML = quizs[0].category;
                questionDifficulty.innerHTML = quizs[0].difficulty;
                question.innerHTML = quizs[0].question;

                console.log(quizs[0].incorrect_answers.length);

                showQuiz();
                topBtn.removeChild(startBtn);
            })
            .catch(function (error) {
                return error;
            })

    };

    // 次のクイズを表示する
    const nextQuiz = function () {

        console.log(quizs.length);

        quizs.splice(0, 1)
        console.log(quizs);
        console.log(quizs[0]);

        if (quizs.length > 0) {
            questionNumber.innerHTML = 11 - quizs.length;
            questionGenre.innerHTML = quizs[0].category;
            questionDifficulty.innerHTML = quizs[0].difficulty;
            question.innerHTML = quizs[0].question;

            showQuiz();
        } else {
            const answerNumber = document.createElement('p');
            const reStartBtn = document.createElement('button');
            const countUpNumber = answerCount.length;
            answerNumber.textContent = "あなたの正解数は" + countUpNumber + 'です!';
            reStartBtn.textContent = "再チャレンジする";
            question.textContent = "再チャレンジしたい場合は下のボタンをクリック！";
            topDisplay.removeChild(questionNumber);
            topDisplay.removeChild(topgenre);
            topDisplay.removeChild(topDifficult);

            topDisplay.appendChild(answerNumber);
            topBtn.appendChild(reStartBtn);

            reStartBtn.addEventListener('click', function () {
                topDisplay.removeChild(answerNumber);
                topBtn.removeChild(reStartBtn);
                topDisplay.appendChild(questionNumber);
                topDisplay.appendChild(topgenre);
                topDisplay.appendChild(topDifficult);
                questionNumber.innerHTML = "取得中";
                question.innerHTML = "少々お待ちください";
                questionGenre.innerHTML = "";
                questionDifficulty.innerHTML = "";
                answerCount.length = 0;
                getQuiz();
            })
        }
    }

    const showQuiz = function () {
        const correctAnswer = quizs[0].correct_answer;
        console.log(correctAnswer);
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
          
            })
            .then(function (data) {
                console.log(data);
                console.log(data.results);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


            firstBtn.addEventListener('click', function () {
                console.log('１番が押されたよ！');
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                if (answerObj[0] === correctAnswer) {
                    answerCount.push(1);
                } else {
                    console.log('不正解です');
                }
                nextQuiz();
            })

            secondBtn.addEventListener('click', function () {
                console.log('2番が押されたよ！');
                if (answerObj[1] === correctAnswer) {
                    answerCount.push(1);
                } else {
                    console.log('不正解です');
                }
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
                if (answerObj[0] === correctAnswer) {
                    answerCount.push(1);
                } else {
                    console.log('不正解です');
                }
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })

            secondBtn.addEventListener('click', function () {
                console.log('2番が押されたよ！');
                if (answerObj[1] === correctAnswer) {
                    answerCount.push(1);
                } else {
                    console.log('不正解です');
                }
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })

            thirdBtn.addEventListener('click', function () {
                console.log('3番が押されたよ！');
                if (answerObj[2] === correctAnswer) {
                    answerCount.push(1);
                } else {
                    console.log('不正解です');
                }
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })

            forthBtn.addEventListener('click', function () {
                console.log('4番が押されたよ！');
                if (answerObj[3] === correctAnswer) {
                    answerCount.push(1);
                } else {
                    console.log('不正解です');
                }
                topBtn.removeChild(firstBtn);
                topBtn.removeChild(secondBtn);
                topBtn.removeChild(thirdBtn);
                topBtn.removeChild(forthBtn);
                nextQuiz();
            })
        }

    }
}
