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


    document.getElementById("NXT2").style.display = "none"
    document.getElementById("NXT1").style.display = "flex"

    updateSearch()
    let input = document.getElementById("display").value
    const corsProxyUrl = 'https://corsproxy.io/?'; // CORS Proxy url This was so annoying i had to look it up LOL
    const mainurl = "https://wallhaven.cc/api/v1/search" // main endpoint for the API. 

    const apiKey = "xz8sPhbXuW8qZGrvXex7Nvavrn1v5QhK"
    

    const wallPapers = document.getElementById("wallpapers");
    wallPapers.innerHTML = " "

    const url = `${corsProxyUrl}${mainurl}?q=${input}&page=${pageNumber}&purity100&categories100`;

    try {
        
        const response = await fetch(url);
        const data = await response.json(); //awaits JSON parsing

        for (let i = 0; i < Math.min(24, data.data.length); i++) { // Limits to 24 images per page

            const image = data.data[i];
            const imageLink = document.createElement("a");
            const imageElement = document.createElement("img");
            imageElement.src = image.thumbs.original; // image url from the API
            imageElement.dataset.originalUrl = image.path;
            imageElement.addEventListener("click", downloadImage); // Add event listener
            wallPapers.appendChild(imageLink);
            wallPapers.appendChild(imageElement);
            imageLink.appendChild(imageElement)
            imageElement.style = "border-radius:10px;"

            imageLink.href = image.url
            imageLink.target = "_blank"

        }
    }  
    catch (error) {
        window.alert("Error fetching images:", error); // Log the error details
    }

    let NEXT = document.getElementById("next")

    NEXT.addEventListener("click", () => {
        pageNumber++;
        fetchImages()
    });

}


async function defaultImages() {


    document.getElementById("NXT2").style.display = "flex"
    document.getElementById("NXT1").style.display = "none"
    const mainurl = "https://wallhaven.cc/api/v1/search"
    

    const wallPapers = document.getElementById("wallpapers");
    const corsProxyUrl = 'https://corsproxy.io/?';
    const url = `${corsProxyUrl}${mainurl}?q=&sorting=random&page=${pageNumber}&purity100&categories100`;

    try {
        const response = await fetch(url);
        const data = await response.json(); // JSON PARSER

        console.log(data.data)

        for (let i = 0; i < Math.min(24, data.data.length); i++) { // Limits to 24 images per page
 
            const image = data.data[i];
            const imageLink = document.createElement("a");
            const imageElement = document.createElement("img");
            imageElement.src = image.thumbs.large; // image url from the API.
            wallPapers.appendChild(imageLink);
            wallPapers.appendChild(imageElement);
            imageLink.appendChild(imageElement)
            imageLink.href = image.path
            imageLink.target = "_blank"
            imageElement.dataset.originalUrl = image.url,
            imageElement.style = "border-radius:10px;"

            imageElement.addEventListener("click", downloadImage); // Add event listener for downloading the image from its url in the API too bad i didnt use it cause i found an easier way and removing it just made my whole code explode LOL...

        }


    } catch (error) {
        console.error("Error fetching images:", error); // Log the error details
    }

    let NEXT2 = document.getElementById("next2")

    NEXT2.addEventListener("click", () => {
        pageNumber++;
        defaultImages()
    });
}

window.addEventListener("DOMContentLoaded", () => {
    defaultImages()
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

let loader = document.getElementById("PL");
let targetImg; // Declare without initial value

// Check if elements exist
if (loader && (targetImg = document.getElementById("bg"))) {
  targetImg.onload = function() {
    loader.style.display = "none";
  };
} else {
  console.error("Elements with IDs 'PL' or 'bg' not found!");
}

document.getElementById("CHANGEBG").addEventListener('click', changeBgPopup)

function changeBgPopup(){
    
    let BG = document.getElementById("changeBG")
    if(BG.style.display == "none"|| BG.style.display == ""){
        BG.style.display = "flex"
    }
    else{
        BG.style.display = "none"
    }
}

document.getElementById("CB").addEventListener('click', changetoCB)
document.getElementById("WARM").addEventListener('click', changetoWARM)
document.getElementById("DARK").addEventListener('click', changetoDARK)
document.getElementById("DEF").addEventListener('click', changetoDEF)


function changetoCB(){
    document.getElementById("bg").style.backgroundImage = "url(assets/menu9.gif)"
}

function changetoWARM(){
    document.getElementById("bg").style.backgroundImage = "url(assets/WARM.webp)"
}
function changetoDARK(){
    document.getElementById("bg").style.backgroundImage = "url(assets/DARK.webp)"
}
function changetoDEF(){
    document.getElementById("bg").style.backgroundImage = "url(assets/main.webp)"
}

function interact(){

    const remarks = ["Oh man whats this, WIFI? or data connection? LOL", "Check your connection this is taking longer than expected", "These wallpapers are not mine they are from the wallhaven API ", "Fresco means a painting done rapidly in watercolour on wet plaster on a wall or ceiling, so that the colours penetrate the plaster and become fixed as it dries.", "just a moment this is taking longer than expected ", "We are adding more features by we i mean me. LMAO", "Happy browsing cause these wallpapers are so fire."]

    let talk = document.getElementById("OH!")

    talk.textContent = remarks[Math.floor(Math.random() * remarks.length)]
}
interact();
setInterval(interact, 5000);
