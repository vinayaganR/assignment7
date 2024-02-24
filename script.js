
const quizData = [
    {
        question: "Which course your are doing in prepinsta?",
        options: ["python", "AI&ML", "fullstack", "datascience"],
        correctAnswer: "fullstack"
    },
    
];

let currentQuestionIndex = 0;
let score = 0;
let countdown;

function startQuiz() {

    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function startTimer() {
    let timeInSeconds = 10; 
    updateTimer(timeInSeconds);

    countdown = setInterval(() => {
        timeInSeconds--;
        updateTimer(timeInSeconds);

        if (timeInSeconds === 0) {
            handleTimeOut();
        }
    }, 1000);
}

function updateTimer(seconds) {
    document.getElementById("countdown").textContent = seconds;
}

function selectAnswer(optionIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedOption = currentQuestion.options[optionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }

    disableOptions();
    document.getElementById("score-value").textContent = score;
}

function disableOptions() {
    const optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach(button => {
        button.disabled = true;
    });
}

function submitAnswer() {
    clearInterval(countdown);
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
        startTimer();
        enableOptions();
    } else {
        endQuiz();
    }
}

function enableOptions() {
    const optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach(button => {
        button.disabled = false;
    });
}

function handleTimeOut() {

    submitAnswer();
}

function endQuiz() {
    
    alert(`Quiz completed! Your score is ${score}/${quizData.length}`);
}


startQuiz();