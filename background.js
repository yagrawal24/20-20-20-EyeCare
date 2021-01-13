chrome.storage.sync.set({clicked: false});

chrome.alarms.onAlarm.addListener(function(alarm){
    let name = alarm.name;
    console.log("alarms fired", name);
    if(name === 'second') {
        chrome.storage.sync.set({timerDate: Date.now() + 1200000});
        chrome.storage.sync.set({twentySecondTimer: false});
    }
    else if(name === 'main') {
        chrome.storage.sync.set({timerDate: Date.now() + 20000});
        chrome.storage.sync.set({twentySecondTimer: true});
        chrome.windows.create({
            url: chrome.runtime.getURL("index.html"),
            type: "popup",
            height: 500,
            width: 500,
            top: 100,
        });
    }
});
