'user strict'

{
    const startBtn = document.getElementById('start-btn');
    const topBtn = document.getElementById('top-btn');
    let quizzes = [];
    const genre = document.getElementById('genre');
    const difficult = document.getElementById('difficult');
    const topSection = document.getElementById('top-section');
    const genreSection = document.getElementById('genre-section');
    const difficultSection = document.getElementById('difficult-section');
    const question = document.getElementById('question');

    startBtn.addEventListener('click', function () {

        topSection.innerHTML = "取得中";
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

                // response自体がjson型として返ってくる。
                console.log(response);
                return response.json();
            })
            .then(function (json) {
                console.log(json);
                console.log(json.results[0]);
                // jsonの中のresultsという配列を取得する＝slice
                quizzes = json.results.slice(0);
                console.log(quizzes);
                showQuiz(0);
                topBtn.removeChild(startBtn);
            })
            .catch(function (error) {
                return alert(error)
            })
    };

    // クイズを表示させる処理
    const showQuiz = function (quizNum) {

        topSection.innerHTML = quizNum + 1;
        genreSection.innerHTML = quizzes[quizNum].category;
        difficultSection.innerHTML = quizzes[quizNum].difficulty;
        question.innerHTML = quizzes[quizNum].question;

        const answerObj = [];
        const correctAnswer = quizzes[quizNum].correct_answer;
        const correctAnswerBtn = document.createElement('button');
        correctAnswerBtn.textContent = correctAnswer;

        answerObj.push(correctAnswerBtn);

        console.log(quizzes[quizNum].incorrect_answers);

        quizzes[quizNum].incorrect_answers.forEach(function (value) {
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

        for (let i = 0; i < answerObj.length; i++) {
            topBtn.appendChild(answerObj[i]);
        };
    };
};
