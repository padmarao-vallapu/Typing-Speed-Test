let countEl = document.getElementById("counter");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let subMitBtnEl = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let msgEl = document.getElementById('result');

let spinnerEl = document.getElementById("spinner");


let secons;

let timerId;

function startTimer() {
    secons = parseInt(countEl.textContent);
    timerId = setInterval(function() {
        secons = secons + 1;
        countEl.textContent = secons;
        console.log(secons);
    }, 1000);

}

function getRandomeQoute() {

    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    fetch(url, options)

        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            startTimer();
            spinnerEl.classList.add("d-none");
            let quote = jsonData.content;
            quoteDisplayEl.textContent = quote;

        });
}

getRandomeQoute();

function onsubMit() {
    let quoteText = quoteDisplayEl.textContent;
    let typedText = quoteInputEl.value;
    console.log(typedText);
    if (quoteText === typedText) {
        clearInterval(timerId);
        msgEl.textContent = "You typed in  " + secons + " secons";
    } else {
        msgEl.textContent = "You typed incorrect sentance";
    }
}

function onReset() {
    getRandomeQoute();
    countEl.textContent = '0';
    msgEl.textContent = '';
    quoteInputEl.value = "";

    clearInterval(timerId);
}

subMitBtnEl.addEventListener("click", onsubMit);
resetBtn.addEventListener('click', onReset);
