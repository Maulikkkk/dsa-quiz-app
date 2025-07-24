let timer;
let timeLeft = 15;
let currentQuestion = 0;
let score = 0;

// ✅ 15 DSA Questions
let questions = [
    {
        question: "What is the time complexity of QuickSort in the average case?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        answer: 1
    },
    {
        question: "Which data structure is used in BFS traversal?",
        options: ["Stack", "Queue", "Priority Queue", "Graph"],
        answer: 1
    },
    {
        question: "Best case time complexity of Insertion Sort?",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
        answer: 2
    },
    {
        question: "Best data structure for LRU cache?",
        options: ["Array", "Queue + HashMap", "Stack", "Graph"],
        answer: 1
    },
    {
        question: "What is the time complexity of searching in a balanced BST?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 1
    },
    {
        question: "Which algorithm is used for Minimum Spanning Tree?",
        options: ["Kruskal's & Prim's", "Dijkstra's", "Bellman-Ford", "Floyd Warshall"],
        answer: 0
    },
    {
        question: "Which data structure is used for DFS traversal?",
        options: ["Queue", "Stack", "Array", "Heap"],
        answer: 1
    },
    {
        question: "Which sorting algorithm is not stable?",
        options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Bubble Sort"],
        answer: 1
    },
    {
        question: "What is the space complexity of Merge Sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        answer: 2
    },
    {
        question: "Which algorithm is used for shortest path in a weighted graph?",
        options: ["DFS", "Dijkstra's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm"],
        answer: 1
    },
    {
        question: "Which data structure is best for implementing recursion?",
        options: ["Queue", "Stack", "Linked List", "Heap"],
        answer: 1
    },
    {
        question: "Which sorting algorithm is best for small data sets?",
        options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"],
        answer: 2
    },
    {
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
        answer: 1
    },
    {
        question: "Which graph representation is best for sparse graphs?",
        options: ["Adjacency List", "Adjacency Matrix", "Both", "None"],
        answer: 0
    },
    {
        question: "Which hashing technique minimizes collisions?",
        options: ["Chaining", "Open Addressing", "Perfect Hashing", "Rehashing"],
        answer: 2
    }
];

// ✅ DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const quizEl = document.getElementById("quiz");
const extraInfo = document.getElementById("extra-info");

// ✅ Shuffle and Pick 10 Random Questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(questions);
questions = questions.slice(0, 10);

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach((opt, index) => {
        const button = document.createElement("button");
        button.textContent = opt;
        button.onclick = () => {
            clearInterval(timer);
            selectAnswer(index);
        };
        optionsEl.appendChild(button);
    });

    // ✅ Timer
    timeLeft = 15;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(-1);
        }
    }, 1000);
}

function selectAnswer(selected) {
    const correct = questions[currentQuestion].answer;
    const buttons = optionsEl.querySelectorAll("button");

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correct) {
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "white";
        }
        if (index === selected && selected !== correct) {
            btn.style.backgroundColor = "#f44336";
            btn.style.color = "white";
        }
    });

    if (selected === correct) score++;

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1200);
}

function showResult() {
    clearInterval(timer);
    quizEl.classList.add("hidden");
    resultEl.classList.remove("hidden");
    scoreEl.textContent = score;

    // ✅ Review
    const review = document.createElement("div");
    review.classList.add("review");
    review.innerHTML = "<h3>Review:</h3>";
    questions.forEach((q, i) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>Q${i + 1}:</strong> ${q.question}<br><em>Correct: ${q.options[q.answer]}</em>`;
        review.appendChild(p);
    });
    extraInfo.appendChild(review);

    // ✅ High Score
    let highScore = localStorage.getItem("dsaQuizHighScore") || 0;
    if (score > highScore) {
        localStorage.setItem("dsaQuizHighScore", score);
        highScore = score;
    }
    const highScoreEl = document.createElement("p");
    highScoreEl.textContent = `🏆 High Score: ${highScore}/${questions.length}`;
    extraInfo.appendChild(highScoreEl);
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    extraInfo.innerHTML = "";
    resultEl.classList.add("hidden");
    quizEl.classList.remove("hidden");
    shuffleArray(questions);
    loadQuestion();
});

// ✅ Start
loadQuestion();
