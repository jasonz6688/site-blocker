url = window.location.href;
chrome.storage.sync.get(["urls"], function(result) {
    if (!result.urls) {
        return;
    }
    var urls = result.urls;
    console.log(urls);
    console.log(url);
    
    if (urls.includes(url)) {
        var newBody = document.createElement("body");
        newBody.innerHTML = "Hey, this is a blocked site";
        document.body = newBody;
    }
});