var state = 0;
const question = document.querySelector(".question");
const A = document.querySelector("#A");
const B = document.querySelector("#B");
const C = document.querySelector("#C");
const D = document.querySelector("#D");
const buttons = [A, B, C, D];
const buttons_name = ["A", "B", "C", "D"];
const score = document.querySelector(".score-container span");
const canvas = document.getElementById('perf');
var created = false;
var answered = {};
n = 1;

// only 2 or 4 answers!
const questions = [
    {
        question: "Quel groupe musical a composé les chansons utilisées dans le film Mamma Mia!?",
        answers: [
            "The Beatles",
            "Queen",
            "ABBA",
            "Bee Gees",
        ],
        correctAnswer: 3
    },
    {
        question: "Qui interprète le personnage de Donna Sheridan?",
        answers: [
            "Meryl Streep",
            "Amanda Seyfried",
            // "Julie Walters",
            // "Christine Baranski",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel personnage cherche à découvrir l'identité de son père biologique?",
        answers: [
            "Donna",
            "Sophie",
            "Rosie",
            "Tanya",
        ],
        correctAnswer: 2
    },
    {
        question: "Quelle chanson est interprétée par Sophie et ses amies lors de son enterrement de vie de jeune fille?",
        answers: [
            "Dancing Queen",
            "Super Trouper",
            "Mamma Mia",
            "Voulez-Vous",
        ],
        correctAnswer: 4
    },
    {
        question: "Quel est le nom de l'île grecque où se déroule l'action du film?",
        answers: [
            "Santorini",
            "Kalokairi",
            "Mykonos",
            "Crete",
        ],
        correctAnswer: 2
    },
    {
        question: "Qui est le réalisateur du film Mamma Mia! (2008)?",
        answers: [
            "Phyllida Lloyd",
            "Rob Marshall",
            "Baz Luhrmann",
            "Peter Jackson",
        ],
        correctAnswer: 1
    },
    {
        question: "Quel acteur joue le rôle de Sam Carmichael?",
        answers: [
            "Colin Firth",
            "Stellan Skarsgård",
            "Pierce Brosnan",
            "Dominic Cooper",
        ],
        correctAnswer: 3
    },
    {
        question: "Quelle chanson interprète Donna Sheridan dans la scène où elle découvre que Sam est sur l'île?",
        answers: [
            "SOS",
            "The Winner Takes It All",
            "Slipping Through My Fingers",
            "Money, Money, Money",
        ],
        correctAnswer: 2
    },
    {
        question: "Combien de pères potentiels Sophie a-t-elle invité à son mariage?",
        answers: [
            "Un",
            "Deux",
            "Trois",
            "Quatre",
        ],
        correctAnswer: 3
    },
    {
        question: "Quelle actrice joue le rôle de Tanya Chesham-Leigh?",
        answers: [
            "Christine Baranski",
            "Meryl Streep",
            "Amanda Seyfried",
            "Julie Walters",
        ],
        correctAnswer: 1
    },
    // {
    //     question: "Qui joue le rôle de Donna Sheridan dans le film Mamma Mia! ?",
    //     answers: [
    //         "Meryl Streep",
    //         "Amanda Seyfried",
    //         "Julie Walters",
    //         "Christine Baranski",
    //     ],
    //     correctAnswer: 1
    // },
    {
        question: "Quelle chanson ouvre le film Mamma Mia! ?",
        answers: [
            "Dancing Queen",
            "Mamma Mia",
            "I Have a Dream",
            "Honey, Honey",
        ],
        correctAnswer: 3
    },
    {
        question: "Comment s'appelle la fille de Donna qui se marie dans le film ?",
        answers: [
            "Lisa",
            "Tanya",
            "Sophie",
            "Rosie",
        ],
        correctAnswer: 3
    },
    {
        question: "Quel est le nom de l'hôtel que gère Donna ?",
        answers: [
            "Hotel Bella Donna",
            "Villa Donna",
            "Paradise Hotel",
            "Donna's Inn",
        ],
        correctAnswer: 1
    },
    {
        question: "Combien de pères potentiels Sophie a-t-elle ?",
        answers: [
            "Un",
            "Deux",
            "Trois",
            "Quatre",
        ],
        correctAnswer: 3
    },
    {
        question: "Qui est le premier père potentiel que Sophie rencontre dans le film ?",
        answers: [
            "Harry",
            "Bill",
            "Sam",
            "Sky",
        ],
        correctAnswer: 3
    },
    {
        question: "Quelle chanson Donna chante-t-elle avec ses amies Tanya et Rosie pour remonter le moral à Sophie ?",
        answers: [
            "Super Trouper",
            "Mamma Mia",
            "Dancing Queen",
            "Take a Chance on Me",
        ],
        correctAnswer: 3
    },
    // {
    //     question: "Quel acteur joue le rôle de Sam Carmichael ?",
    //     answers: [
    //         "Pierce Brosnan",
    //         "Colin Firth",
    //         "Stellan Skarsgård",
    //         "Dominic Cooper",
    //     ],
    //     correctAnswer: 1
    // },
    {
        question: "Comment s'appelle le fiancé de Sophie ?",
        answers: [
            "Sam",
            "Harry",
            "Sky",
            "Bill",
        ],
        correctAnswer: 3
    },
];


function get_score() {
    let points = 0;
    let len = Object.keys(answered).length;
    for (let i = 0; i < len; i++) {
        if (questions[i].correctAnswer - 1 == answered[i]) {
            points++;
        }
    }
    return points;
}

function resetCss() {
    document.querySelector(".answers").style.display = "";
    document.querySelector(".answers").style.gridTemplateRows = '1fr 1fr';
    document.querySelector(".perf").style.display = "";
}

function update() {
    resetCss();
    let len = Object.keys(answered).length;
    if (state < questions.length) {
        question.innerText = questions[state].question;
        for (let i = 0; i < questions[state].answers.length; i++) {
            buttons[i].innerText = buttons_name[i] + ": " + questions[state].answers[i];
            buttons[i].style.borderColor = "inherit";
            buttons[i].classList.remove("correct");
        }
        if (questions[state].answers.length == 2) {
            C.style.display = "none";
            D.style.display = "none";
            document.querySelector(".answers").style.gridTemplateRows = '1fr';
        } else {
            C.style.display = "block";
            D.style.display = "block";
        }

        if (state < len) {
            buttons[answered[state]].style.borderColor = "#050505";
        }

        buttons[questions[state].correctAnswer - 1].classList.add("correct");
    } else {
        question.innerText = "Bravo ! Vous avez fini le quizz !";
        document.querySelector(".answers").style.display = "none";
        document.querySelector(".perf").style.display = "block";

        // chart
        let labels = [];
        for (let i = 0; i < len; i++) {
            labels.push(i + 1);
        }
        let values = [];
        for (let i = 0; i < len; i++) {
            values.push((questions[i].correctAnswer - 1 === answered[i]) ? 1 : 0);
        }
        // if the chart already exists, update it (can't create a new one without destroying it)
        if (!created) {
            chart = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Réponses',
                        data: values
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            display: false
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        } else {
            chart.data.labels = labels;
            chart.data.datasets[0].data = values;
            chart.update();
        }
        created = true;
    }
    score.innerText = get_score() + " / " + questions.length;
}

function init() {

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            answer(i);
        });
    }
    // suffle questions
    questions.sort(() => Math.random() - 0.5);
    update();
}

function clamp(state) {
    if (state < 0) {
        return 0;
    } else if (state > questions.length) {
        return questions.length;
    } else {
        return state;
    }
}

function answer(n) {
    answered[state] = n;

    state++;
    state = clamp(state);
    update();
}

// precedent
document.getElementById("precedent").addEventListener("click", () => {
    state = clamp(state - 1);
    update();
});

// restart
document.getElementById("restart").addEventListener("click", () => {
    state = 0;
    answered = {};
    // suffle questions
    questions.sort(() => Math.random() - 0.5);
    update();
});


init();