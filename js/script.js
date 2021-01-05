const getLoad = () => {
  document.getElementById("loading").style.display = "none";
};

const agreement = document.querySelector(".agreement");
const main = document.querySelector(".main");
const finalResult = document.querySelector(".final-result");
const start = document.querySelector(".start");

const introAudio = document.querySelector(".introAudio");
const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const qnum = document.querySelector("#q-num");
const nextBtn = document.querySelector(".next-btn");
const remainingTime = document.querySelector(".remaining-time");
const showBtn = document.querySelector(".show-btn");
const correctAudio = document.querySelector(".correctAudio");
const incorrectAudio = document.querySelector(".incorrectAudio");
var form = document.querySelector("#agreementForm");
const life1 = document.querySelector(".life1");
const life2 = document.querySelector(".life2");
const lifeCount = life2.getElementsByTagName("span")[0];
const lifeImage = document.querySelector(".lifeImage");
const hiss = document.querySelector(".hiss");
const beepIntro = document.querySelector(".beepIntro");
const beepEnd = document.querySelector(".beepEnd");
const heartbeat = document.querySelector(".heartbeat");
const clap = document.querySelector(".clap");

const againBtn = document.querySelector(".again-btn");
const exitBtn = document.querySelector(".exit-btn");

let loadQuestion = 0;
let number = 0;
let score = 0;
let money = 0;

function preventSubmit(e) {
  e.preventDefault();
}
form.addEventListener("submit", preventSubmit);

function validation() {
  introAudio.play();

  var ready = document.getElementById("ready").checked;

  if (ready == false) {
    document.getElementById("notReady").innerHTML =
      " * * You haven't confirmed the agreement !";
    return false;
  } else {
    agreement.classList.add("hide");
    main.style.display = "flex";
    return true;
  }
}

const myGame = [
  {
    question: "Which national park is listed in World Heritage Sites ?",
    options: [
      "Chitwan National Park",
      "Bardiya National Park",
      "Langtang National Park",
      "Shey Phoksundo National Park",
    ],
    answer: 0,
  },

  {
    question:
      "Which of the following country hosted the first Football World Cup ?",
    options: ["Brazil", "England", "Greece", "Uruguay"],
    answer: 3,
  },

  {
    question: "Around how much time does sun rays take to reach earth ?",
    options: ["10 min", "13 min", "8 min", "5 min"],
    answer: 2,
  },

  {
    question: "The first case of novel coronavirus was identified in....",
    options: ["Beijing", "Shanghai", "Wuhan, Hubei", "Tainjin"],
    answer: 2,
  },

  {
    question: "Which bird can fly backwards ?",
    options: ["Humming Bird", "Kingfisher", "Swift", "Parrot"],
    answer: 0,
  },

  {
    question: "Which is the highest grossing movie of all time worldwide ?",
    options: ["Titanic", "Avengers: End Game", "Avatar", "Furious 7"],
    answer: 1,
  },

  {
    question: "'Moonshine' was a slang term for which type of beverage ?",
    options: ["Fruit Juice", "Plant Milk", "Carbonated Drinks", "Alcohol"],
    answer: 3,
  },

  {
    question: "Who is the founder of Instagram ?",
    options: [
      "Mark Zuckerberg ",
      "Kevin Systrom",
      "Jack Dorsey",
      "Evan Spiegel",
    ],
    answer: 1,
  },

  {
    question: "What is the name of the Linkin Park's first album ?",
    options: ["Xero", "Living Things", "A Thousands Suns", "Reanimation"],
    answer: 0,
  },

  {
    question: "Where is the official home of Santa Claus?",
    options: ["USA", "Canada", "Norway", "Finland"],
    answer: 3,
  },
];

const award = [25, 50, 100, 250, 500, 600, 700, 800, 900, 1000];

function load() {
  number++;
  qnum.innerText = number;
  questionText.innerHTML = myGame[loadQuestion].question;
  createOptions();
  scoreResult();
}

function createOptions() {
  optionBox.innerHTML = "";
  for (let i = 0; i < myGame[loadQuestion].options.length; i++) {
    const optionsDiv = document.createElement("div");
    optionsDiv.innerHTML = myGame[loadQuestion].options[i];
    optionsDiv.classList.add("option");
    optionsDiv.id = i;
    optionsDiv.setAttribute("onclick", "check(this)");
    optionBox.appendChild(optionsDiv);
  }
}

function check(element) {
  let checkId = element.id;
  let answerId = myGame[loadQuestion].answer;

  if (checkId == answerId) {
    element.classList.add("correct");
    correctAudio.play();
    showNextBtn();
    score++;
    scoreResult();
    updateStatResult(true);
    winMoney();
  } else {
    element.classList.add("incorrect");
    incorrectAudio.play();

    for (let i = 0; i < optionBox.children.length; i++) {
      if (optionBox.children[i].id == answerId) {
        optionBox.children[i].classList.add("showCorrect");
      }
    }
    updateStatResult(false);
    gameFinished();
  }

  disableOptions();

  if (number == myGame.length - 1) {
    heartbeat.play();
  }

  if (number == myGame.length) {
    gameFinished();
  }
}

function disableOptions() {
  for (let i = 0; i < optionBox.children.length; i++) {
    optionBox.children[i].classList.add("already-clicked");
  }
}

function showNextBtn() {
  nextBtn.classList.add("show");
}

function hideNextBtn() {
  nextBtn.classList.remove("show");
}

function hideShowBtn() {
  showBtn.classList.remove("show");
}

function scoreResult() {
  remainingTime.innerHTML = score;
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  loadQuestion++;
  load();
  hideNextBtn();
}

const statsArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const statsDiv = document.getElementsByClassName("stats-result")[0];
function updateStatResult(isCorrect) {
  if (isCorrect) {
    statsDiv.children[statsArray[loadQuestion]].style.color = "#278627";
  } else {
    statsDiv.children[statsArray[loadQuestion]].style.color = "#b72424";
  }
}

function clearStatResult() {
  for (let i = 0; i < statsDiv.children.length; i++) {
    const element = statsDiv.children[i];
    element.style.color = "#a5a5a5";
  }
}

life1.addEventListener("click", removeOptions);

function removeOptions() {
  hiss.play();

  let answerValue = myGame[loadQuestion].answer;
  let removeCount = 1;

  for (let i = 0; i < optionBox.children.length; i++) {
    let childrens = optionBox.children[i];

    if (childrens.id != answerValue && removeCount < 3) {
      childrens.classList.add("lineCut");
      life1.classList.add("disableLife");
      removeCount++;
    }
  }
}

life2.addEventListener("click", timerCount);

let time = 16;
var maintainInterval;

function timerCount() {
  beepIntro.play();

  clearInterval(maintainInterval);
  time--;
  lifeCount.innerText = time;
  lifeImage.style.display = "none";

  if (time <= 5) {
    beepIntro.pause();
    beepEnd.play();
  }

  if (time == -1) {
    beepEnd.pause();
    hiss.play();

    clearInterval(maintainInterval);
    lifeImage.style.display = "inline-block";
    lifeCount.innerText = "";
    life2.classList.add("disableLife");
    time = 16;
  } else {
    maintainInterval = setInterval(timerCount, 1000);
  }
}

function winMoney() {
  money = award[loadQuestion];

  if (money == award[award.length - 1]) {
    heartbeat.pause();
    clap.play();
  }
}

function gameFinished() {
  nextBtn.classList.remove("show");
  showBtn.classList.add("show");
}

showBtn.addEventListener("click", function () {
  main.style.display = "none";
  finalResult.classList.add("show");
  quizResult();
  heartbeat.pause();
});

function quizResult() {
  const totalQuestions = document.querySelector("#totalQuestions");
  const yourScore = document.querySelector("#yourScore");
  const yourMoney = document.querySelector("#yourMoney");

  totalQuestions.innerHTML = myGame.length;
  yourScore.innerHTML = score;
  yourMoney.innerHTML = money;
}

function resetQuiz() {
  loadQuestion = 0;
  number = 0;
  score = 0;
  money = 0;
  load();
  hideShowBtn();
  life1.classList.remove("disableLife");
  life2.classList.remove("disableLife");
}

againBtn.addEventListener("click", function () {
  finalResult.classList.remove("show");
  main.style.display = "flex";
  introAudio.play();
  resetQuiz();
  clearStatResult();
});

exitBtn.addEventListener("click", function () {
  finalResult.classList.remove("show");
  agreement.classList.remove("hide");
  resetQuiz();
  clearStatResult();
});

window.addEventListener("load", function () {
  load();
});
