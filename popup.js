// Initializing buttons and diplay
let start = document.getElementById("start");
let stopp = document.getElementById("stop");
let display = document.querySelector('#countdown');
let display2 = document.querySelector('#look');
let timeAmount = "20:00";

display.innerHTML = timeAmount;


// Weird solution to null
if(start !== null) {
    start.addEventListener('click', prepStart);
}

if(stopp !== null) {
    stopp.addEventListener('click', clearAlarms);
}

chrome.storage.sync.get(['clicked'], function(result) {
    if(result.clicked === true) {
        startTimer(display, display2);
    }
});

// Start Button events
function prepStart(event) {
    chrome.storage.sync.get(['clicked'], function(result) {
        if(result.clicked) {
            ;
        }
        else {
            chrome.storage.sync.set({clicked: true});
            let timerDate = Date.now() + 1200000;
            chrome.storage.sync.set({timerDate: timerDate});
            let minutes = 20;
            chrome.alarms.create('main', {
                delayInMinutes: minutes,
                periodInMinutes: minutes + 1/3
            });
            chrome.alarms.create('second', {
                delayInMinutes: minutes + 1/3,
                periodInMinutes: minutes + 1/3
            });
            startTimer(display, display2);
        }
    });
}

// Stop button events
function clearAlarms(event) {
    chrome.storage.sync.set({clicked: false});
    chrome.storage.sync.set({twentySecondTimer: false});
    chrome.alarms.clearAll();
}

// Display
function startTimer(display, display2) {
    var intervalTimer = setInterval(function() {
        chrome.storage.sync.get(['clicked', 'twentySecondTimer'], function(result) {
            if(result.twentySecondTimer === true) {
                display2.innerHTML = "LOOK AWAY!";
            }
            else {
                display2.innerHTML = "";
            }

            if(result.clicked === false) {
                display.innerHTML = timeAmount;
                display2.innerHTML = "";
                clearInterval(intervalTimer);
            }
            else {
                chrome.storage.sync.get(['timerDate'], function(result) {
                    let timeInSeconds = Math.ceil(((result.timerDate - Date.now()) / 1000));
                    let minutes2 = parseInt(timeInSeconds / 60, 10);
                    let seconds2 = parseInt(timeInSeconds % 60, 10);
        
                    minutes2 = minutes2 < 10 ? "0" + minutes2 : minutes2;
                    seconds2 = seconds2 < 10 ? "0" + seconds2 : seconds2;
                    
                    if(display !== null) {
                        display.innerHTML = minutes2 + ":" + seconds2;
                    }
                });
            }
        });
    }, 10);
}