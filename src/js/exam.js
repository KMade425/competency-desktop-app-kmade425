let questions_file = 'src/file_system/questions.json'
fileRead = JSON.parse(fs.readFileSync(questions_file, 'utf8'));
console.log(fileRead);
const allQuestions = fileRead.questions
console.log(allQuestions)
console.log(allQuestions.length)

let questionsDiv = document.getElementById("questionsDiv")

var presentQuestion = 1
var presentQuestionIO = document.getElementById("presentQuestionIO")
const prevQuestion = document.getElementById("prevQuestion")
const nextQuestion = document.getElementById("nextQuestion")

const userID = window.localStorage.getItem("userid")




function onload() {
    console.log("yes, ready")
}


function showQuestion(pq) {
    if (pq <= allQuestions.length) {
        var PQCLassList = document.getElementsByClassName("questionPDIV")
        for (var n = 0; n < PQCLassList.length; n++) {
            var PQCLassList1 = PQCLassList[n].attributes.id.value
            document.getElementById(PQCLassList1).classList.remove("show")
        }
        var pqdiv = document.getElementById('questionPDIV' + pq)
        pqdiv.className += " show"
        if (pq > 1) {
            showPreviousButton()
        }
    }
    if (pq === allQuestions.length) {
        hideNextButton()
    }

}



function showPrevQuestion(pq) {
    if (pq <= allQuestions.length) {
        var PQCLassList = document.getElementsByClassName("questionPDIV")
        for (var n = 0; n < PQCLassList.length; n++) {
            var PQCLassList1 = PQCLassList[n].attributes.id.value
            document.getElementById(PQCLassList1).classList.remove("show")
        }
        var pqdiv = document.getElementById('questionPDIV' + pq)
        pqdiv.className += " show"
        if (pq <= 1) {
            hidePreviousButton()
        }
    }
    if (pq <= allQuestions.length) {
        showNextButton()
    }
}


function hightlightNumber(pq) {
    selectedNum = document.getElementById('number' + pq)
    selectedNum.classList.remove("btn-primary")
    selectedNum.className += " btn-success"
}



function hidePreviousButton() {
    prevQuestion.classList.remove("show-inline")
    prevQuestion.className += " hidden"
}

function showPreviousButton() {
    prevQuestion.classList.remove("hidden")
    prevQuestion.className += " show-inline"
}

function hideNextButton() {
    nextQuestion.classList.remove("show-inline")
    nextQuestion.className += " hidden"
}

function showNextButton() {
    nextQuestion.classList.remove("hidden")
    nextQuestion.className += " show-inline"
}




nextQuestion.addEventListener('click', function() {
    presentQuestion++
    showQuestion(presentQuestion)
})
prevQuestion.addEventListener('click', function() {
    if (presentQuestion > 1) {
        presentQuestion = presentQuestion - 1
        showPrevQuestion(presentQuestion)
    } else {
        console.log("cannot do it")
    }
})











var loadedQuestion = false
for (var i = 0; i < allQuestions.length; i++) {

    var questionNumber = i + 1
    var options = allQuestions[i].options
    questionsDiv.innerHTML += '<div class="hidden mb-2 questionPDIV" id="questionPDIV' + questionNumber + '"><h2 class="question text-center">Question ' + questionNumber + ' of ' + allQuestions.length + ' </h2> \
        <div class="container-fluid p-3"> \
            <div class="row"> \
                <div class="col-md-8"> \
                    <h5 class="" style="text-transform: initial; color:black">' + allQuestions[i].question + '</h5> \
                </div> \
                <div class="col-md-4"> \
                    <br><br> \
                    <div class = "answers" > \
                        <h5 class="p-1" style="line-height: 30px;"> \
                            <b>Select an Answer</b> \
                        </h5> \
                        <div class="font-weight-bolder" style="color: #000"> \
                            <p class="optionsList question' + questionNumber + '" id="question' + questionNumber + 'a" question="' + questionNumber + '" option="a" correct="'+allQuestions[i].answer+'"> \
                                A - ' + allQuestions[i].options.a + ' \
                            </p> \
                            <p class=" optionsList question' + questionNumber + '" id="question' + questionNumber + 'b" question="' + questionNumber + '" option="b" correct="'+allQuestions[i].answer+'"> \
                                B - ' + allQuestions[i].options.b + '\
                            </p> \
                            <p class=" optionsList question' + questionNumber + '" id="question' + questionNumber + 'c" question="' + questionNumber + '" option="c" correct="'+allQuestions[i].answer+'"> \
                                C - ' + allQuestions[i].options.c + '\
                            </p> \
                            <p class=" optionsList question' + questionNumber + '" id="question' + questionNumber + 'd" question="' + questionNumber + '" option="d" correct="'+allQuestions[i].answer+'"> \
                                D - ' + allQuestions[i].options.d + '\
                            </p> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div></div>'

    var questionNumberDiv = document.getElementById("questionNumberDiv")
    questionNumberDiv.innerHTML += '<button class="btn btn-primary ml-1 mr-1 mb-2 numbersBlock" questionNUM="' + questionNumber + '" id="number' + questionNumber + '">' + questionNumber + '</button> '
    if (questionNumber == allQuestions.length) {
        showQuestion(1)
        questionNumberDiv.classList.remove("hidden")
        questionNumberDiv.className += " show"
        showingNumbers = true
    }
}

var showingNumbers = false
let showqnumbers = document.getElementById("showqnumbers")
showqnumbers.addEventListener('click', function(event) {
    if (showingNumbers == false) {
        questionNumberDiv.classList.remove("hidden")
        questionNumberDiv.className += " show"
        showingNumbers = true
    } else if (showingNumbers == true) {
        questionNumberDiv.classList.remove("show")
        questionNumberDiv.className += " hidden"
        showingNumbers = false
    }
})


var numbersBlock = document.getElementsByClassName('numbersBlock')
for (var i = 0; i < numbersBlock.length; i++) {
    numbersBlock[i].addEventListener('click', function(e) {
        var numbersBlockID = this.attributes.questionNUM.value
        showQuestion(numbersBlockID)
        presentQuestion = numbersBlockID
        if (presentQuestion >= numbersBlock.length) {
            hideNextButton()
        } else if (presentQuestion < numbersBlock.length) {
            showNextButton()
            if (presentQuestion <= 1) {
                hidePreviousButton()
            }
        }
    })
}

const optionsList = document.getElementsByClassName("optionsList")
for (var i = 0; i < optionsList.length; i++) {
    optionsList[i].addEventListener('click', function(event) {
        var questionNumberAnswered = this.attributes.question.value
        var optionSelected = this.attributes.option.value

        var OPclassList = document.getElementsByClassName("question" + questionNumberAnswered)
        for (var n = 0; n < OPclassList.length; n++) {
            var OPclassList1 = OPclassList[n].attributes.id.value
            document.getElementById(OPclassList1).classList.remove("selectedAnswer")
        }
        this.className += ' selectedAnswer'
        hightlightNumber(questionNumberAnswered)
            // document.getElementById("question" + questionNumberAnswered + optionSelected).className += ' selectedAnswer'
        console.log(this.attributes)
        console.log("question number: " + this.attributes.question.value)
        console.log("selected option: " + this.attributes.option.value)
        console.log("correct option: " + this.attributes.correct.value)
        console.log("userID: " + userID)
    });
}