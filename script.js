'use strict'

const questions = [
    {
        question: 'HTML Document can contain ______________.',
        answer: ['Attributes', 'Tags', 'Plain Text', 'All of These'],
        correct: '3'
    },
    {
        question: 'Page Designed in HTML is called as ________.',
        answer: ['Server Page', 'Web Page', 'Front Page', 'Yellow Page'],
        correct: '1'
    },
    {
        question: 'HTML program is saved using ____________ extension.',
        answer: ['.htnl', '.htl', '.hml', '.html'],
        correct: '3'
    },
    {
        question: 'HTML program can be read and rendered by _________.',
        answer: ['Web Browser', 'Interpreter', 'Server', 'Compiler'],
        correct: '0'
    },
    {
        question: 'Which of the following is not an example of browser ?',
        answer: ['Microsoft Bing', 'Opera', 'Mozilla', 'Chrome'],
        correct: '0'
    },
    {
        question: 'HTML was firstly proposed in year _______.',
        answer: ['1990', '1980', '1995', '2000'],
        correct: '0'
    },
    {
        question: 'HTML document contain 1 root tag called __________.',
        answer: ['HTML', 'BODY', 'HEAD', 'TITLE'],
        correct: '0'
    }
];

let correct = 0;
let incorrect = 0;
let questionno = 0;
let useranswers = new Array(questions.length);

function loadQuiz() {
    correct = 0;
    incorrect = 0;
    questionno = 0;
    useranswers = new Array(questions.length);;
    quizButtons();
}

function startQuiz() {
    $('.start').hide();
    $('.quiz').show();
    $('.final').hide();

    renderQuestion();
    loadScoreBoard();
}

function loadScoreBoard() {
    $('#questionnumber').text("Question number: " + (questionno + 1) + " out of " + questions.length);
    $('#score').text(" Correct: " + correct + " / Incorrect: " + incorrect);
}

function renderQuestion() {
    document.getElementById("question").innerHTML = loadPossibleAnswers();
    $('#btnNext').html('Submit');
}

function loadPossibleAnswers() {
    let formMaker = "";
    formMaker += "<form><fieldset>";
    formMaker += "<label>" + questions[questionno].question + "</label><br/><br/>";

    for (let i = 0; i < 4; i++) {
        formMaker += "<input type='radio' id='cbxa" + questionno + i + "' name='answers' value=" + i + " />";
        formMaker += "<label id='cbxa" + i + "' for='cbxa" + i + "'>" + questions[questionno].answer[i] + "</label><br/>";
    }

    formMaker += "</fieldset></form>";

    return formMaker;
}

$('#btnNext').click(function (event) { nextQuestion(); });
$('#btnFinish').click(function (event) { finishQuiz(); });
$('#btnStart').click(function (event) { startQuiz(); });
$('#btnRestart').click(function (event) { restart(); });

function nextQuestion() {

    if (checkUserAns() == true) {
        updateScore();
        questionno += 1;
        quizButtons();
        loadScoreBoard();
        renderQuestion();
    }
    else {
        let cbxid = '#cbxa' + questions[questionno].correct;
        let cbxcheckid = '#cbxa' + questionno + questions[questionno].correct;
        $(cbxid).css("color", "red");
        $(cbxcheckid).attr('checked', true);
        $('#btnNext').html('Next');
    }
}

function checkUserAns() {
    var correct = false;
    let value = -1;
    $("input:radio[name='answers']:checked").each(function () {
        let value = $(this).attr("value");

        if (value == questions[questionno].correct) {
            correct = true;
        }
        else {
            correct = false;
        }
    });

    if (useranswers[questionno] == undefined) useranswers[questionno] = (value);

    return correct;
}

function updateScore() {
    if (useranswers[questionno] == questions[questionno].correct) {
        correct += 1;
    }
    else {
        incorrect += 1;
    }
}

function quizButtons() {
    if (questionno < questions.length - 1) {
        $('#btnNext').show();
        $('#btnFinish').hide();
    }
    else {
        $('#btnNext').hide();
        $('#btnFinish').show();
    }
}

function finishQuiz() {
    checkUserAns();

    let score = ((correct / questions.length) * 100).toPrecision(2)
    if (score >= 75) {
        //pass
        $('#lblMessageHeader').text("Congratulations!");
        $('#lblMessageContent').text("You have passed the Quiz");
        $('#lblScore').text("Your score is: " + score + "/100");
    }
    else {
        //fail
        $('#lblMessageHeader').text("Try Again!");
        $('#lblMessageContent').text("You have failed the Quiz. The following are the correct answers.");
        $('#lblScore').text("Your score is: " + score + "/100");
    }

    document.getElementById("lblCorrectAns").innerHTML = renderFinish();

    $('.start').hide();
    $('.quiz').hide();
    $('.final').show();
}

function renderFinish() {

    let listmaker = "<h4>Study Section</h4><ul>";
    for (let i = 0; i < useranswers.length; i++) {
        if (useranswers[i] != questions[i].correct) {
            listmaker += "<li>" + questions[i].question + "<br/>" + questions[i].answer[questions[i].correct] + "</li>";
        }
    }
    listmaker += "</ul>";
    return listmaker;
}

function restart() {
    loadQuiz();

    $('.start').show();
    $('.quiz').hide();
    $('.final').hide();
}

$(loadQuiz);






