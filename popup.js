const overlayTime = 3000;

function read() {
    var q = new Promise((res, rej) => {
        chrome.storage.sync.get(['value'], value => res(value));
    })

    return q;
}

function display(time) {
    const timeElement = document.getElementById("time");
    timeElement.textContent = time + " hours";
}

function calculateTime(ms) {
    const timeSavedInMs = ms * overlayTime;
    const timeSavedInHours = ((timeSavedInMs / (1000 * 60 * 60)) % 24);
    const time = Number.parseFloat(timeSavedInHours).toFixed(3);
    display(time);
}


document.getElementById('reset').addEventListener('click', reset);

function reset() {
    chrome.storage.sync.set({ 'value': 0 });
    init();
}

function init() {
    read().then(val => {
        const count = val["value"];
        calculateTime(count);
    });    
}

read().then(val => {
    if(!val["value"]) {
        reset();
    } else {
        init();
    }
})