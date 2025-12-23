document.addEventListener('DOMContentLoaded',()=>{
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");

    startBtn.addEventListener("click",startQuiz);

    function startQuiz(){
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        showQuizQuestions();
    }

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
            answered:0,
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
            answered:0,
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: [
                "Charles Dickens",
                "Jane Austen",
                "William Shakespeare",
                "Mark Twain",
            ],
            answered:0,
            answer: "William Shakespeare",
        },
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;

    function showQuizQuestions(){
        nextBtn.classList.add('hidden');
        questionContainer.classList.remove('hidden')
        choicesList.textContent = "";
        //clearing the previous options

        questionText.textContent = questions[currentQuestionIndex].question;
        questions[currentQuestionIndex].choices.forEach((options)=>{
            let li = document.createElement("li");
            li.addEventListener('click',()=>{
                if(questions[currentQuestionIndex].answered === 0){
                    updateScore(options)
                    questions[currentQuestionIndex].answered ++;
                }
            })
            li.innerHTML=`${options}`
            choicesList.appendChild(li);
        })
    }

    function updateScore(options){
        if(questions[currentQuestionIndex].answer === options ){
            score++;
        }
        nextBtn.classList.remove('hidden');
    }
    
    nextBtn.addEventListener('click',updateQuestion)
    
    function updateQuestion(){
        nextBtn.classList.add('hidden');
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            console.log(currentQuestionIndex)
            showQuizQuestions();
        }
        else{
            console.log('last question answerwed')
            revealResult(score);
            currentQuestionIndex=0;
            score=0;
        }
    }
    function revealResult(scoredMarks){
        questionContainer.classList.add('hidden');
        startBtn.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.innerHTML = `${scoredMarks} out of ${questions.length}`
        restartBtn.classList.remove('hidden');
    }
    restartBtn.addEventListener('click',()=>{
        startQuiz()
        questions.forEach((eachQuestion)=>{
            eachQuestion.answered=0;
        })
    })
})