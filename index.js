function read() {
    var q = new Promise((res, rej) => {
        chrome.storage.sync.get(['value'], value => res(value));
    })

    return q;
}

function write(value) {
    chrome.storage.sync.set({ 'value': value });
}

read().then(val => {
    let tmp = val["value"];
    tmp += 1;
    write(tmp);
});