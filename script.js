const startButton = document.getElementById("start-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)

function startGame() {
    console.log("Started")
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort()
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
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

function selectAnswer() {

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



}



]