//all the variables that will not change
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

// //the questions that will be presented to the user
const questions = [
{
    question: "Commonly used data types DO NOT include:",
    answers: [
        {text: "strings", correct: false },
        {text: "booleans", correct: false },
        {text: "alerts", correct: true },
        {text: "numbers", correct: false }
    ]
},
{
    question: "The condition in an if/else statement is enclosed within ____",
    answers: [    
        {text: "quotes", correct: false },
        {text: "curly brackets", correct: false },
        {text: "parentheses", correct: true },
        {text: "square brackets", correct: false }
    ]    
},
{
    question: "Array in JavaScript can be used to store _____",
    answers: [    
        {text: "numbers and strings", correct: false },
        {text: "other arrays", correct: false },
        {text: "booleans", correct: false },
        {text: "all of the above", correct: true }
    ]    
},
{
    question: "String values must be enlosed within _____ when being assigned to variables.",
    answers: [    
        {text: "commas", correct: false },
        {text: "curly brackets", correct: false },
        {text: "quotes", correct: true },
        {text: "parentheses", correct: false }
    ]    
},
{
    question: "Is coding super fun?",
    answers: [    
        {text: "sometimes", correct: true },
        {text: "other times", correct: true },
        {text: "most of the times", correct: true },
        {text: "all of the above", correct: true }
    ]    
}]

let score = 0
let shuffledQuestions, currentQuestionIndex
let time = 60
let clock;

//signifying clicking the buttons that the user will use to start game and proceed to next question after answering correctly
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
currentQuestionIndex++
setNextQuestion()
})
//the next two functions operate the seconds on the timer, allowing it to descend one second at a time
function timer() {
    clock = setInterval(function(){
        if (time > 0) {
            time--
            countdown()
        } else {
            clearInterval(clock)
            endGame()
        }
    }, 1000)

}

function countdown() {
    const timerElement = document.getElementById("timer")
    timerElement.innerText = time
}
//allows the game to begin
function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort()
    currentQuestionIndex = 0
    timer()
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function highScorePage(event) {
    event.preventDefault()
    let username = document.getElementById("username").value
    // let scoreobject = {username: time}
    // localStorage.setItem(JSON.stringify(scoreobject))
    localStorage.setItem(username, time)
    showHighScore()
}

function showHighScore() {
    document.getElementById("showHighScore").classList.remove("hide")
    let topfive = document.getElementById("topfive")
    let liElement = document.createElement("li") 
    let localStorageScores = localStorage
    for (let index = 0; index < 4; index++) {
        let userScore = localStorageScores[Object.keys(localStorageScores)[index]]
        let userName = Object.keys(localStorage) 
        topfive.appendChild(liElement).textContent = userName[index] + "  " + userScore
    }
    
}

function endGame() {
    document.getElementById("highscore-container").classList.remove("hide")
    
}

//allows user to move to next question, while not allowing it to go more than the amount of questions available
function setNextQuestion() {
    if(currentQuestionIndex > 4) {
        clearInterval(clock)
        endGame()
        return
    }
    
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
// //allows user to select their answer
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
       nextButton.classList.remove("hide") 
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
    
}
// //if the user selects the wrong answer, this function will subtract 5 seconds
function setStatusClass(element, correct) {
    console.log(element)
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
        nextButton.classList.remove("hide")
        score++
        console.log(score)
    } else {
        console.log(score)
        element.classList.add("wrong")
        time -= 5
        
        if(time <= 5) {
            time = 0
        }
        countdown()
    } 
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}
document.getElementById("userform").addEventListener("click", highScorePage)