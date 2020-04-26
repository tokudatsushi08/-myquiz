'user strict'

{
    const startBtn = document.getElementById('start-btn');
    const topBtn = document.getElementById('top-btn');
    let quizzes = [];
    let answerCount = 0;
    const genre = document.getElementById('genre');
    const difficult = document.getElementById('difficult');
    const top = document.getElementById('top');
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

        // 回答を入れる配列を作成
        const answers = [];
        // 正解を配列に入れる
        const correctAnswer = quizzes[quizNum].correct_answer;
        answers.push(correctAnswer);
        // 誤答を順に配列に入れる
        quizzes[quizNum].incorrect_answers.forEach(function (value) {
            answers.push(value);
        });
        shuffle(answers);
        createBtn(answers, quizNum);

        console.log(answers);
    };

    // 選択肢をシャッフルする処理
    const shuffle = function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = array[i];
            array[i] = array[r];
            array[r] = tmp;
        };
    };

    // buttonを作成する処理
    const createBtn = function (array, num) {
        array.forEach(function (value) {
            const answerBtn = document.createElement('button');
            answerBtn.textContent = value;
            topBtn.appendChild(answerBtn);
            answerBtn.addEventListener('click', function () {
                pushAnswerBtn(value, num);
            })
        })
    };

    // 回答ボタンを押した後の処理
    const pushAnswerBtn = function (answer, number) {
        // 回答ボタンで押されたものが正解だった場合
        if (answer === quizzes[number].correct_answer) {
            topBtn.innerHTML = '';
            answerCount++;
            console.log('正解だよ！');
            console.log(answerCount);

            nextQuiz(number);
        }
        // 回答ボタンで押されたものが不正解だった場合
        else {
            topBtn.innerHTML = '';
            nextQuiz(number);
        }
    }

    const nextQuiz = function (index) {
        const questNumber = index + 1;
        if (questNumber < 10) {
            showQuiz(questNumber);
        } else {
            showResult();
        }
    }

    // 10問目まで答えた後の結果表示
    const showResult = function () {
        const reStartBtn = document.createElement('button');
        reStartBtn.textContent = "再チャレンジする";
        reStartBtn.addEventListener('click', function () {
            reStartQuiz(reStartBtn);
        })

        topSection.innerHTML = "あなたの正解数は" + answerCount + "です！";
        genreSection.innerHTML = '';
        difficultSection.innerHTML = '';
        question.innerHTML = "再チャレンジしたい場合は下のボタンをクリック！";

        topBtn.appendChild(reStartBtn);
    }

    // 再チャレンジボタンを押した後の処理
    const reStartQuiz = function (reStartBtn) {
        topSection.innerHTML = "取得中";
        question.innerHTML = "少々お待ちください";
        answerCount = 0;
        topBtn.removeChild(reStartBtn);
        topBtn.appendChild(startBtn);
        getQuiz();
    }
};
