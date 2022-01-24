const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
currentQuestionIndex++
setNextQuestion()
})

function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort()
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
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

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
       nextButton.classList.remove("hide") 
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
{
    question: "Commonly used data types DO NOT include:",
    answers: [
        {text: "strings", correct: true },
        {text: "booleans", correct: true },
        {text: "alerts", correct: false },
        {text: "numbers", correct: true }
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
}
{
    question: "Is coding super fun?",
    answers: [    
        {text: "sometimes", correct: false },
        {text: "other times", correct: false },
        {text: "most of the times", correct: false },
        {text: "all of the above", correct: true }
    ]    
}]