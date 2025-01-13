import './index.css';

const returnButton = document.getElementById("return-button");
const forwardButton = document.getElementById("forward-button");
const reloadButton = document.getElementById("reload-button");
const searchButton = document.getElementById("search-button");
const newWindowButton = document.getElementById("new-window-button");
const goButton = document.getElementById("go");
const consoleButton = document.getElementById("console-button");


const searchBar = document.getElementById("search-bar");

const webView = document.getElementById("webview");

searchBar.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        console.log("key pressed")
        event.preventDefault();
        console.log(searchBar.value);
        HandleUrl()
    }
});

consoleButton.addEventListener("click", () => {
    webView.openDevTools()
});

webView.addEventListener("did-navigate", (event) => {
    let url = event.url;
    searchBar.value = url
});

returnButton.addEventListener("click", () => {
    webView.goBack();
});

forwardButton.addEventListener("click", () => {
    webView.goForward();
})

reloadButton.addEventListener("click", () => {
    webView.reload();
})

searchButton.addEventListener("click", () => {
    console.log("research clicked")
    let url = "http://cornmium.web.app";
    searchBar.value = url
    webView.src = url
})

newWindowButton.addEventListener("click", () => {
    api.newWindow();
});

goButton.addEventListener("click", (event) => {
    event.preventDefault()
    HandleUrl()
})

function HandleUrl() {
    let url = "";
    const inputurl = searchBar.value
    searchBar.value

    if (inputurl.startsWith("https://") || inputurl.startsWith("http://")) {
        url = inputurl
    } else {

        url = `https://cornmium.web.app/pages/research?research=${inputurl}&page=1`
    }

    webView.src = url;
    console.log(webView.src)
}   