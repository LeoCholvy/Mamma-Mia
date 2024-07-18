const icons = {
    "honey": document.querySelector("#honey .action i"),
    "dancing": document.querySelector("#dancing .action i"),
    "mamma": document.querySelector("#mamma .action i"),
    "money": document.querySelector("#money .action i"),
    "lay": document.querySelector("#lay .action i"),
    "gimme": document.querySelector("#gimme .action i"),
}
const buttons = {
    "honey": document.querySelector("#honey .action"),
    "dancing": document.querySelector("#dancing .action"),
    "mamma": document.querySelector("#mamma .action"),
    "money": document.querySelector("#money .action"),
    "lay": document.querySelector("#lay .action"),
    "gimme": document.querySelector("#gimme .action"),
}
const audios = {
    "honey": document.querySelector("#audio_honey"),
    "dancing": document.querySelector("#audio_dacing"),
    "mamma": document.querySelector("#audio_mamma"),
    "money": document.querySelector("#audio_money"),
    "lay": document.querySelector("#audio_lay"),
    "gimme": document.querySelector("#audio_gimme"),
}
const inputs = {
    "honey": document.querySelector("#honey input"),
    "dancing": document.querySelector("#dancing input"),
    "mamma": document.querySelector("#mamma input"),
    "money": document.querySelector("#money input"),
    "lay": document.querySelector("#lay input"),
    "gimme": document.querySelector("#gimme input"),
}
const answers = {
    "honey": "Honey, Honey",
    "dancing": "Dancing Queen",
    "mamma": "Mamma Mia",
    "money": "Money, Money, Money",
    "lay": "Lay All Your Love On Me",
    "gimme": "Gimme! Gimme! Gimme!",
}

function pause(id) {
    icons[id].classList.remove("fa-pause");
    icons[id].classList.remove("fa-play");
    icons[id].classList.add("fa-play");
    audios[id].pause();
}

function play(id) {
    let state = icons[id].classList.contains("fa-play");

    if (state) {
        for (let i in audios) {
            pause(i);
        }
        audios[id].play();
        icons[id].classList.remove("fa-play");
        icons[id].classList.add("fa-pause");
    } else {
        pause(id);
    }
}

function normalize(txt) {
    return txt.replace(/[^\w\s]/gi, "").toLowerCase();
}

function check(event, id) {
    if (event.key != "Enter") {
        return;
    }
    // check answer
    let answer = normalize(inputs[id].value);
    if (answer == normalize(answers[id])) {
        console.log("correct");
        buttons[id].classList.add("correct");
        inputs[id].value = answers[id];
        inputs[id].readOnly = true;
    } else {
        buttons[id].classList.add("incorrect");
        setTimeout(() => {
            buttons[id].classList.remove("incorrect");
        }, 500);
    }

    // check if all correct
    let len = Object.keys(answers).length;
    let correct = 0;
    for (let i in answers) {
        if (buttons[i].classList.contains("correct")) {
            correct++;
        }
    }
    if (correct == len) {
        console.log("all correct");
    }
}



// TODO: implémenter le visualisateur de spectre audio

// const btn = document.getElementById("btn");
// const audio = document.querySelector("video");
// const visualizer = document.querySelector(".visualizer");
// const txt = document.querySelector("p");

// var feur = 0;

// function init() {
//     window.AudioContext = window.AudioContext || window.webkitAudioContext;
//     const ctx = new window.AudioContext();
//     const analyser = ctx.createAnalyser();
//     const source = ctx.createMediaElementSource(audio);
//     source.connect(analyser);
//     source.connect(ctx.destination);
//     analyser.fftSize = 64;
//     var bufferLength = analyser.frequencyBinCount;

//     let dataArray = new Uint8Array(bufferLength);
//     let elements = [];
//     bufferLength = 22; // for the pedro pedro remix because it is more esthetical
//     // (the quality is bad so no sound in the end)
//     for (let i = 0; i < bufferLength; i++) {
//         const element = document.createElement('span');
//         element.classList.add('element');
//         elements.push(element);
//         visualizer.appendChild(element);
//     }

//     const clamp = (num, min, max) => {
//         if (num >= max) return max;
//         if (num <= min) return min;
//         return num;
//     }

//     const update = () => {
//         requestAnimationFrame(update);
//         analyser.getByteFrequencyData(dataArray);
//         for (let i = 0; i < bufferLength; i++) {
//             let item = dataArray[i];
//             item = (item - 80) ^ 2 + 20; //------------------------------------
//             // this if is used for the pedro pedro remix
//             // it is more esthetical like this
//             if (i in [0, 1, 2, 3]) {
//                 item -= 100 - 20 * i;
//             }
//             elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(calc(${clamp(item, 0, 130)}*min(0.15vh, 0.2vw) + min(20vh, 20vw)), 0)`;
//         }
//     };
//     update();
// }

// //audio = video
// audio.addEventListener("click", e => {
//     if (feur == 0) {
//         feur = 1;
//         init();
//     }
//     txt.style.display = "none";
// });