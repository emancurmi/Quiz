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

let STORE = {
    correct : 0,
    incorrect : 0,
    questionno : 0,
    useranswers : new Array(questions.length),
    msg : ""
};

function startQuiz() {

    $('.start').hide();
    $('.quiz').show();
    $('.final').hide();

    renderQuestion();
    renderScoreBoard();
}

function renderScoreBoard() {
    $('#questionnumber').text("Question number: " + (STORE.questionno + 1) + " out of " + questions.length);
    $('#score').text(" Correct: " + STORE.correct + " / Incorrect: " + STORE.incorrect);
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
    formMaker += "<label>" + questions[STORE.questionno].question + "</label><br/><br/>";

    for (let i = 0; i < 4; i++) {
        formMaker += "<input type='radio' id='cbxa" + i + "' class='radio' name='answers' value=" + i + " />";
        formMaker += "<label id='cbxa" + i + "' for='cbxa" + i + "'>" + questions[STORE.questionno].answer[i] + "</label><br/>";
    }

    formMaker += "</fieldset></form>";

    return formMaker;
}

function checkUserAns() {
    let value = -1;
    let correct;
    $("input:radio[name='answers']:checked").each(function () {
        value = $(this).attr("value");
        STORE.useranswers[STORE.questionno] = value;
        correct = (value == questions[STORE.questionno].correct) ? true : false;
    });

    return correct;
}

function updateScore() {
    if (STORE.useranswers[STORE.questionno] == questions[STORE.questionno].correct) {
        STORE.correct += 1;
    }
    else {
        STORE.incorrect += 1;
    }
}

function renderFinish() {

    let listmaker = "<h4>Study Section</h4><ul>";
    for (let i = 0; i < STORE.useranswers.length; i++) {
        if (STORE.useranswers[i] != questions[i].correct) {
            listmaker += "<li>" + questions[i].question + "<br/>" + questions[i].answer[questions[i].correct] + "</li>";
        }
    }
    listmaker += "</ul>";
    return listmaker;
}

function start(){

    STORE.correct = 0;
    STORE.incorrect = 0;
    STORE.questionno = 0;
    STORE.useranswers = new Array(questions.length);
    STORE.msg = "";

    $('.start').show();
    $('.quiz').hide();
    $('.final').hide();
}

function submitAns() {

    if (checkUserAns() == undefined) {
        STORE.msg = "Please Select an Answer";
        $('#lblmsg').html(STORE.msg)
        $('#lblmsg').css('color', 'red');
    }
    else {
        
        if (checkUserAns() == true) {
            STORE.msg = "Well Done!";
            $('#lblmsg').html(STORE.msg)
            $('#lblmsg').css('color', 'green');
        }
        else {
            STORE.msg = "Sorry the Correct Answer is :" + questions[STORE.questionno].answer[questions[STORE.questionno].correct];
            $('#lblmsg').html(STORE.msg)
            $('#lblmsg').css('color', 'red');
        }

        $(".radio").attr('disabled', true);

        updateScore();
        renderScoreBoard();
        STORE.questionno += 1;

        if (STORE.questionno < questions.length) {
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
    
    renderQuestion();
}

function finishQuiz() {
    let score = ((STORE.correct / questions.length) * 100).toFixed(0);
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

$(start);






