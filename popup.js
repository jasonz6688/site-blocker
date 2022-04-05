function addUrlP(url) {
    var entry = document.createElement("p");
    entry.innerHTML = url;
    entry.id = url;
    document.getElementsByTagName("body")[0].appendChild(entry);
}

function removeUrlP(url) {
    var entry = document.getElementById(url);
    document.getElementsByTagName("body")[0].removeChild(entry);
}


chrome.storage.sync.get(["urls"], function(result) {
    for (const url of result.urls) {
        addUrlP(url);
    }
});

function addLink() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let url = tabs[0].url;
        chrome.storage.sync.get(["urls"], function(result) {
            var urls = [];
            if (result.urls) {
                urls = result.urls;
            }

            if (!urls.includes(url)) {
                urls.push(url);
                addUrlP(url);
                chrome.storage.sync.set({"urls": urls});
            }
        });
    });
}

document.getElementById("Add").onclick = addLink;


function removeLink() {
    let url = document.getElementById("Site").value;
    chrome.storage.sync.get(["urls"], function(result) {
        if (!result.urls) {
            return;
        }

        var urls = result.urls;
        const index = urls.indexOf(url);
        if (index > -1) {
            urls.splice(index, 1);
            removeUrlP(url);
            chrome.storage.sync.set({"urls": urls});
        }
    });
}

document.getElementById("Remove").onclick = removeLink;


document.getElementById("Clear").onclick = function() {
    let children = document.getElementsByTagName("body")[0].getElementsByTagName("p");
    while (children.length > 0) {
        document.getElementsByTagName("body")[0].removeChild(children[0]);
    }
    chrome.storage.sync.set({"urls": []});
}