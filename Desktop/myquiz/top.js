'user strict'

{
    const startBtn = document.getElementById('startbtn');
    const topBtn = document.getElementById('topbtn');
    let quizzes = [];
    const genre = document.getElementById('genre');
    const difficult = document.getElementById('difficult');
    const topSection = document.getElementById('topsection');
    const genreSection = document.getElementById('genresection');
    const difficultSection = document.getElementById('difficultsection');
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
                // quizsの配列の中にquizseResultを入れる
                console.log(quizzes);
                topBtn.removeChild(startBtn);
            })
            .catch(function (error) {
                alert(error)
            })
    };
}

