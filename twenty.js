display = document.querySelector('#countdown_twenty');

twentyTimer(display);
function twentyTimer(display) {
    var secondTimer = setInterval(function() {
        chrome.storage.sync.get(['timerDate'], function(result) {  
            let timeInSeconds = Math.ceil((result.timerDate - Date.now()) / 1000);  
            let timeInDecimal = (result.timerDate - Date.now()) / 1000;
            let minutes2 = parseInt(timeInSeconds / 60, 10);
            let seconds2 = parseInt(timeInSeconds % 60, 10);

            minutes2 = minutes2 < 10 ? "0" + minutes2 : minutes2;
            seconds2 = seconds2 < 10 ? "0" + seconds2 : seconds2;

            if (timeInDecimal < 0.1) {
                clearInterval(secondTimer);
                chrome.windows.getCurrent(removewindow);
            }
            else {
                display.innerHTML = minutes2 + ":" + seconds2;
            }
        });
    }, 10);
}

function removewindow(win) {
    chrome.windows.remove(win.id);
}