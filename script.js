//quiz app
//array of questions with each question in the form of object
let questions = [
    {
        //question 1
        question: "which language is used to style web page?",
        options: ["HTML", "CSS", "JavaScript", "Node.js"],
        answer: "CSS",
    },
    {
        //question 2
        question: "JavaScript is which type of language?",
        options: ["high-level", "low-level", "assembly", "binary"],
        answer: "high-level",
    },
    {
        //question 3
        question: "SDLC stands for?",
        options: ["System maintenance Life Cycle", "System Development Life Cycle", "System Deployment Life Cycle", "System Development Life Coordination"],
        answer: "System Development Life Cycle",
    },
    {
        //question 4
        question: "which type of inheritance is not supported by Java?",
        options: ["single level", "multilevel", "multiple", "both A and B"],
        answer: "multiple",
    },
    {
        //question 5
        question: "which type of problem arises in multiple inheritance?",
        options: ["diamond", "rectangle", "triangle", "none of these"],
        answer: "diamond",
    },
    {
        //question 6
        question: "functions makes the program?",
        options: ["modularized", "reusable", "difficult", "both A and B"],
        answer: "both A and B",
    },
    {
        //question 7
        question: "arrays are?",
        options: ["Dynamic", "Static", "Hybrid", "none of these"],
        answer: "Static",
    },
    {
        //question 8
        question: "in c++ from which point compiler starts the execution of code?",
        options: ["from main", "from local", "from body", "none of these"],
        answer: "from main",
    },
    {
        //question 9
        question: "pointers are variables that point to the?",
        options: ["address of another variable", "CPU", "registers", "none of these"],
        answer: "address of another variable",
    },
    {
        //question 10
        question: "in c++ diamond problem is resolved by?",
        options: ["normal functions", "dynamic keyword", "inheriting base class virtually", "none of these"],
        answer: "inheriting base class virtually",
    },
];
//variable for tracking score
let score = 0;
//creating array for tracking user answers
let userAns = [];
//accesssing question element
let questionElement = document.querySelector("#question");
//variable for tracking questions
let currQues = 0;
//accessing next button
let nextBtn = document.querySelector("#next-btn");
//accessing progress
let progress = document.querySelector("#progress");
//accessing main section
let main = document.querySelector("main");
//accessing options div
let option = document.querySelector(".options");
//accessing previous button
let prevBtn = document.querySelector("#prev-btn");
window.addEventListener("load", () => {
    let currentQuestion = questions[currQues];
    displayQuestion(currentQuestion);
});
//function for displaying question and options dynamically on screen
let displayQuestion = (question) => {
    //diplaying cuurent question from array to web page
    questionElement.innerText = question.question;
    //displaying progress content dynamically
    progress.innerText = `Question ${currQues + 1} of ${questions.length}`;
    //accessing array options
    let arrOptions = question.options;
    for (let i = 0; i < arrOptions.length; i++) {
        let button = document.createElement("button");
        button.classList.add("opt-btn");
        let span = document.createElement("span");
        span.classList.add("circle");
        span.textContent = String.fromCodePoint(65 + i);
        button.append(span);
        let para = document.createElement("p");
        para.innerText = arrOptions[i];
        para.classList.add("option-para");
        option.append(button);
        button.append(para);
        //adding event listner on option buttons
        button.addEventListener("click", (evt) => {
            answerCheck(evt.currentTarget, questions[currQues]);
        })
    }
    //diabling previous btn on question 1
    if (currQues === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    let progressLine=document.querySelector(".progress-line");
    progressLine.style.width=((currQues+1)/questions.length)*100+"%";
}
//answer checking function
let answerCheck = (selectedOption, currentQuestion) => {
    let opt_para = selectedOption.querySelector(".option-para");
    let prevAns = userAns[currQues];
    userAns[currQues] = opt_para.innerText;
    //accessing all options button
    let options = document.querySelectorAll(".opt-btn");
    //disable all options
    options.forEach((option) => {
        option.disabled = true;
    })
    //check selected answer
    if (currentQuestion.answer === opt_para.innerText) {
        selectedOption.classList.add("correct");
        if (prevAns !== currentQuestion.answer) {
            score++;
        }
    } else {
        //mark option as wrong
        selectedOption.classList.add("wrong");
        //find and display correct answer
        options.forEach((option) => {
            let para = option.querySelector(".option-para");
            if (questions[currQues].answer === para.innerText) {
                option.classList.add("correct")
            }
        });
    }
};
//function for restart button
let resetButton = () => {
    currQues = 0;
    score = 0;
    userAns = [];
    main.innerHTML = ` <h3 id="progress"></h3>
        <p id="question"></p>
        <div class="options">
        </div>
        <div class="buttons">
        <button id="prev-btn">previous</button>
        <button id="next-btn">Next</button>
        </div>`;
    //inner html creates new dom and destroys old dom so we need to reinitialize progress questionElement options next button
    questionElement = document.querySelector("#question");
    progress = document.querySelector("#progress");
    option = document.querySelector(".options");
    nextBtn = document.querySelector("#next-btn");
    prevBtn = document.querySelector("#prev-btn");
    //calling display function
    displayQuestion(questions[currQues]);
    //as older next button is detroyed so old event listner is also destroy so we have to add eventlistner on next btn again
    nextBtn.addEventListener("click", () => {
        nextButton();
    });
    //adding event listner on new previous
    prevBtn.addEventListener("click", () => {
        previousButton();
    })
};
//function for restoring prev ans
let restorePrevAns = () => {
    //accessing all options button
    let options = document.querySelectorAll(".opt-btn");
    let currQuestion = questions[currQues];
    //disable all options if user already answer that question
    if (userAns[currQues] !== undefined) {
        options.forEach((option) => {
            option.disabled = true;
            let opt_para = option.querySelector(".option-para");
            if (opt_para.innerText === userAns[currQues]) {
                if (userAns[currQues] === currQuestion.answer) {
                    option.classList.add("correct");
                } else {
                    option.classList.add("wrong");
                }
            }
            if (opt_para.innerText === currQuestion.answer) {
                option.classList.add("correct");
            }
        });
    }

};
//function for adding next btn functionality
let nextButton = () => {
    currQues++;
    if (currQues >= questions.length) {
        main.innerHTML = "";
        let finalMsg = document.createElement("h1");
        finalMsg.classList.add("final-msg");
        finalMsg.innerText = "Quiz Completed";
        main.append(finalMsg);
        //displaying score
        let result = document.createElement("h2");
        result.classList.add("final-msg");
        result.innerText = `Your Score is ${score}/${questions.length}`;
        main.append(result);
        let correctAns=document.createElement("h3");
        correctAns.classList.add("result-explain");
        correctAns.innerText=`Corrected Answers:${score}`;
        main.append(correctAns);
        let WrongAns=document.createElement("h3");
        WrongAns.classList.add("result-explain");
        WrongAns.innerText=`Wrong Answers:${questions.length-score}`;
        main.append(WrongAns);
        //restart button
        let restartBtn = document.createElement("button");
        restartBtn.classList.add("reset-btn");
        restartBtn.innerText = "Restart Quiz";
        main.append(restartBtn);
        restartBtn.addEventListener("click", () => {
            resetButton();
        });
        return;
    }
    option.innerHTML = "";
    displayQuestion(questions[currQues]);
    restorePrevAns();
};
//adding event listner on next button
nextBtn.addEventListener("click", () => {
    nextButton();
});
//function for previous button 
let previousButton = () => {
    currQues--;
    option.innerHTML = "";
    displayQuestion(questions[currQues]);
    restorePrevAns();
}
//adding event listner on prev button
prevBtn.addEventListener("click", () => {
    previousButton();
});


