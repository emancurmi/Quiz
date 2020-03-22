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


function startQuiz() {

    $('.start').hide();
    $('.quiz').show();
    $('.final').hide();

    renderQuestion();
    renderScoreBoard();
}

function renderScoreBoard() {
    $('#questionnumber').text("Question number: " + (questionno + 1) + " out of " + questions.length);
    $('#score').text(" Correct: " + correct + " / Incorrect: " + incorrect);
}

function renderQuestion() {
    $('#lblmsg').html("");
    document.getElementById("question").innerHTML = loadQuestion();
    $('#btnSubmit').show();
    $('#btnNext').hide();
    $('#btnFinish').hide();
}

function loadQuestion() {
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

function checkUserAns(uservalue) {
    var correct;
    let value = -1;

    $("input:radio[name='answers']:checked").each(function () {
        value = $(this).attr("value");

        if (value == questions[questionno].correct) {
            
            correct = true;
        }
        else {
            correct = false;
        }

        useranswers[questionno] = value;

    });

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

function start() {

    correct = 0;
    incorrect = 0;
    questionno = 0;
    useranswers = new Array(questions.length);

    $('.start').show();
    $('.quiz').hide();
    $('.final').hide();
}

function submitAns() {

    var msg = "";

    if (checkUserAns() == undefined) {
        msg = "Please Select an Answer";
        $('#lblmsg').html(msg)
        $('#lblmsg').css('color', 'red');
    }
    else {
        if (checkUserAns() == true) {
            msg = "Well Done!";
            $('#lblmsg').html(msg)
            $('#lblmsg').css('color', 'green');
        }
        else {
            msg = "Sorry the Correct Answer is :" + questions[questionno].answer[questions[questionno].correct];
            $('#lblmsg').html(msg)
            $('#lblmsg').css('color', 'red');
        }

        updateScore();
        questionno += 1;

        if (questionno < questions.length) {
            $('#btnSubmit').hide();
            $('#btnNext').show();
            $('#btnFinish').hide();
        }
        else {
            $('#btnSubmit').hide();
            $('#btnNext').hide();
            $('#btnFinish').show();
        }
    }
}
    

function nextQuestion() {
    renderScoreBoard();
    renderQuestion();
}

function finishQuiz() {
    let score = ((correct / questions.length) * 100).toFixed(0);
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

$('#btnSubmit').click(function (event) { submitAns(); });
$('#btnNext').click(function (event) { nextQuestion(); });
$('#btnFinish').click(function (event) { finishQuiz(); });
$('#btnStart').click(function (event) { startQuiz(); });
$('#btnRestart').click(function (event) { start(); });

$(start());






