function toggleNavbar() {
    let MENU = document.getElementById("MENUPOP")

    if (MENU.style.display == "none" || MENU.style.display == "") {
        MENU.style.display = "flex"
    }
    else {
        MENU.style.display = "none"
    }

}


function updateSearch() {
    let input = document.getElementById("display").value
    let searcher = document.getElementById("search-result")
    searcher.textContent = `Search results for "${input}"`
}


let pageNumber = 1;

async function fetchImages() {

    updateSearch()
    let input = document.getElementById("display").value
    const corsProxyUrl = "https://api.codetabs.com/v1/proxy?quest="; // CORS Proxy url This was so annoying i had to look it up LOL
    const mainurl = "https://wallhaven.cc/api/v1/search" // main endpoint for the API. 

    const apiKey = "xz8sPhbXuW8qZGrvXex7Nvavrn1v5QhK"
    
    let pageNumber = 1;

    const wallPapers = document.getElementById("wallpapers");
    wallPapers.innerHTML = " "

    const url = `${corsProxyUrl}${mainurl}?q=${input}&page=${pageNumber}&purity100&categories100`;

    try {
        
        const response = await fetch(url);
        const data = await response.json(); //awaits JSON parsing

        for (let i = 0; i < Math.min(21, data.data.length); i++) { // Limits to 21 images per page

            const image = data.data[i];
            const imageLink = document.createElement("a");
            const imageElement = document.createElement("img");
            imageElement.src = image.thumbs.original; // image url from the API
            imageElement.dataset.originalUrl = image.path;
            imageElement.addEventListener("click", downloadImage); // Add event listener
            wallPapers.appendChild(imageLink);
            wallPapers.appendChild(imageElement);
            imageLink.appendChild(imageElement)

            imageLink.href = image.url
            imageLink.target = "_blank"

        }
    }  
    catch (error) {
        window.alert("Error fetching images:", error); // Log the error details
    }

    let NEXT = document.getElementById("next")

    NEXT.addEventListener("click", () => {
        fetchImages()
        pageNumber++;
    });

}

async function defaultImages() {

    const mainurl = "https://wallhaven.cc/api/v1/search"
    let pageNumber = 1;

    const wallPapers = document.getElementById("wallpapers");
    const corsProxyUrl = "https://api.codetabs.com/v1/proxy?quest=";
    const url = `${corsProxyUrl}${mainurl}?q=&sorting=random&page=${pageNumber}&purity100&categories100`;

    try {
        const response = await fetch(url);
        const data = await response.json(); // JSON PARSER

        for (let i = 0; i < Math.min(21, data.data.length); i++) { // Limits to 21 images per page


            const image = data.data[i];
            const imageLink = document.createElement("a");
            const imageElement = document.createElement("img");
            imageElement.src = image.thumbs.large; // image url from the API.
            wallPapers.appendChild(imageLink);
            wallPapers.appendChild(imageElement);
            imageLink.appendChild(imageElement)
            imageLink.href = image.url
            imageLink.target = "_blank"
            imageElement.dataset.originalUrl = image.path,
            imageElement.addEventListener("click", downloadImage); // Add event listener for downloading the image from its url in the API.

        }
    } catch (error) {
        console.error("Error fetching images:", error); // Log the error details
    }

    let NEXT = document.getElementById("next")

    NEXT.addEventListener("click", () => {
        defaultImages()
    });
}

window.addEventListener("DOMContentLoaded", () => {
    defaultImages()
    hidePageLoader()
});

function downloadImage(event) {
        
}

function reloadPage() {
    window.location.reload();
    console.log("reloaded")
}

function reloaderImg(){
    let wallpapers1 = document.getElementById("wallpapers")
    let searcher = document.getElementById("search-result")
    searcher.textContent = `"trending now"`
    wallpapers1.innerHTML = ""
    defaultImages()
}
function hidePageLoader(){
    let loader = document.getElementById("PL")
    loader.style.display = "none"
}










