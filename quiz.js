const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alertBox = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const toggleBtn = document.getElementById("modeToggle");

/* ================= THEME ================= */
document.addEventListener("DOMContentLoaded", () => {
  let saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    if(toggleBtn) toggleBtn.innerText = "☀️";
  }
});

if(toggleBtn){
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
      toggleBtn.innerText = "☀️";
      localStorage.setItem("theme","light");
    } else {
      toggleBtn.innerText = "🌙";
      localStorage.setItem("theme","dark");
    }
  });
}

/* ================= BACK ================= */
function goBack(){
  window.location.href = "index.html";
}

/* ================= QUIZ DATA ================= */
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", "let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", "It is used for comments."],
        answer: "It refers to the current object."
    },
    {
        question: "Q. Which HTML tag is used to create a hyperlink?",
        choices: ["<a>", "<link>", "<href>", "<h1>"],
        answer: "<a>"
    },
    {
        question: "Q. Which CSS property is used to change text color?",
        choices: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Q. Which JavaScript method is used to select an element by ID?",
        choices: ["getElementById()", "querySelectorAll()", "getElementsByClass()", "selectById()"],
        answer: "getElementById()"
    },
    {
        question: "Q. Which symbol is used for comments in JavaScript?",
        choices: ["//", "/* */", "#", "<!-- -->"],
        answer: "//"
    },
    {
        question: "Q. Which of the following is used to add JavaScript in HTML?",
        choices: ["<script>", "<js>", "<javascript>", "<code>"],
        answer: "<script>"
    },
    {
        question: "Q. Which CSS property controls the size of text?",
        choices: ["text-size", "font-size", "text-style", "font-style"],
        answer: "font-size"
    }
];

/* ================= VARIABLES ================= */
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

/* ================= SHOW QUESTIONS ================= */
const showQuestions = () => {
    const q = quiz[currentQuestionIndex];
    questionBox.textContent = q.question;

    choicesBox.innerHTML = "";

    q.choices.forEach(choice => {
        let div = document.createElement("div");
        div.textContent = choice;
        div.classList.add("choice");

        div.onclick = () => {
            document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
            div.classList.add("selected");
        };

        choicesBox.appendChild(div);
    });

    startTimer();
};

/* ================= CHECK ANSWER ================= */
const checkAnswer = () => {
    const selected = document.querySelector(".choice.selected");

    if(!selected){
        displayAlert("Select your answer");
        return;
    }

    if(selected.textContent === quiz[currentQuestionIndex].answer){
        displayAlert("Correct ✅");
        score++;
    } else {
        displayAlert("Wrong ❌");
    }

    currentQuestionIndex++;
    timeLeft = 15;

    if(currentQuestionIndex < quiz.length){
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
};

/* ================= SCORE ================= */
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.innerHTML = "";
    scoreCard.textContent = `Score: ${score} / ${quiz.length}`;
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};

/* ================= ALERT ================= */
const displayAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;

    setTimeout(()=>{
        alertBox.style.display = "none";
    },2000);
};

/* ================= TIMER ================= */
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    timerID = setInterval(()=>{
        timeLeft--;
        timer.textContent = timeLeft;

        if(timeLeft === 0){
            stopTimer();
            displayAlert("Time Up ⏰");
            checkAnswer();
        }
    },1000);
};

const stopTimer = () => clearInterval(timerID);

/* ================= START QUIZ ================= */
const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    quizOver = false;
    timeLeft = 15;
    timer.style.display = "flex";
    showQuestions();
};

/* ================= EVENTS ================= */
startBtn.onclick = () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
};

nextBtn.onclick = () => {
    if(quizOver){
        startQuiz();
        scoreCard.textContent = "";
        nextBtn.textContent = "Next";
    } else {
        checkAnswer();
    }
};
// BACK TO HOME
document.getElementById("backBtn").onclick = () => {
  window.location.href = "index.html";
};
