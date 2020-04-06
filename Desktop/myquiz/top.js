'user strict'

{
    const startBtn = document.getElementById('start-btn');
    const topBtn = document.getElementById('top-btn');
    let quizzes = [];
    const answerCount = [];
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

        const answers = [];
        const correctAnswer = quizzes[quizNum].correct_answer;
        const correctAnswerBtn = document.createElement('button');
        correctAnswerBtn.textContent = correctAnswer;

        answers.push(correctAnswerBtn);
        console.log(quizzes[quizNum].incorrect_answers);

        quizzes[quizNum].incorrect_answers.forEach(function (value) {
            const incorrectAnswerBtn = document.createElement('button');
            incorrectAnswerBtn.textContent = value;
            answers.push(incorrectAnswerBtn);

            shuffle(answers);

            // answerBtnの配列の中に入っている回答を表示させる処理
            for (let i = 0; i < answers.length; i++) {
                topBtn.appendChild(answers[i]);
            };
        });

        for (let w = 0; w < answers.length; w++) {
            answers[w].addEventListener('click', function () {
                pushAnswerBtn(answers[w].textContent, correctAnswer, quizNum);
            })
        }
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

    // 回答ボタンを押した後の処理
    const pushAnswerBtn = function (answer, correct, number) {
        // 回答ボタンで押されたものが正解だった場合
        if (answer === correct) {
            topBtn.innerHTML = '';
            answerCount.push(1);
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
            alert('終わり！');
        }
    }
};
