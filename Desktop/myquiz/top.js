'user strict'

{
    const startBtn = document.getElementById('start-btn');
    const topBtn = document.getElementById('top-btn');
    const topDisplay = document.getElementById('top');
    let quizs = [];
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
                // jsonの中のresultsという配列を取得する＝slice
                const quizResults = json.results.slice(0);
                console.log(quizResults);
                // quizsの配列の中にquizseResultを入れる
                quizs = quizResults.slice(0, quizResults.length);
                console.log(quizs);

                showQuiz(0);
                topBtn.removeChild(startBtn);
            })
            .catch(function (error) {
                return error;
            })


    };

    // クイズを表示する処理
    const showQuiz = function (quizNum) {

        questionNumber.innerHTML = quizNum + 1;
        questionGenre.innerHTML = quizs[quizNum].category;
        questionDifficulty.innerHTML = quizs[quizNum].difficulty;
        question.innerHTML = quizs[quizNum].question;

        const answerObj = [];
        const correctAnswer = quizs[quizNum].correct_answer;
        const correctAnswerBtn = document.createElement('button');
        correctAnswerBtn.textContent = correctAnswer;

        answerObj.push(correctAnswerBtn);

        console.log(quizs[quizNum].incorrect_answers);

        quizs[quizNum].incorrect_answers.forEach(function (value) {
            const incorrectAnswerBtn = document.createElement('button');
            incorrectAnswerBtn.textContent = value;
            answerObj.push(incorrectAnswerBtn);
        });

        for (let i = answerObj.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = answerObj[i];
            answerObj[i] = answerObj[r];
            answerObj[r] = tmp;
        }

        pushAnswerBtn(answerObj, correctAnswer, quizNum);
    }

    // 回答ボタンを押した時の処理
    const pushAnswerBtn = function (array, correct, number) {
        for (let i = 0; i < array.length; i++) {
            topBtn.appendChild(array[i]);
            array[i].addEventListener('click', function () {
                if (array[i].textContent === correct) {
                    array.splice(0, array.length);
                    console.log(array);
                    topBtn.innerHTML = '';
                    nextQuiz(number);
                    answerCount.push(1);
                } else {
                    array.splice(0, array.length);
                    console.log(array);
                    topBtn.innerHTML = '';
                    nextQuiz(number);
                }
            })
        }
    }

    // 次の問題を表示する
    const nextQuiz = function (index) {
        const questNumber = index + 1;
        if (questNumber < 10) {
            showQuiz(questNumber);
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
}

