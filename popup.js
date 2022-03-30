function saveLinks () {
    var links = [];

    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        tabs.forEach(function(tab) {
            links.push(tab.url + "\n");
        });


        links[links.length - 1] = links[links.length - 1].substring(0, links[links.length - 1].length - 1);

        var blob = new Blob(links, { type: "text/plain" });
        const cUrl = URL.createObjectURL(blob);
        chrome.downloads.download({ url: cUrl, filename: "links.txt"});
    });
}

document.getElementById("Save").onclick = saveLinks;


function openLinks() {
    var fileToLoad = document.getElementById("toOpen").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        const incog = document.getElementById("incognito").checked;
        const links = fileLoadedEvent.target.result.split("\n");
        chrome.windows.create({ url: links, incognito: incog });
    };

    if (fileToLoad) {
        fileReader.readAsText(fileToLoad, "UTF-8");
    } else {
        console.log("No File Chosen");
    }
}

document.getElementById("Open").onclick = openLinks;