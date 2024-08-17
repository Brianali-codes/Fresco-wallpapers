//declared thiese variables as global in order to acess them every time I fetch images from the API
let pageNumber = 1;
let purity = 100;//ahem rather not say
let categories = 100; //general = 100, anime = 101, people = 111.
let sort = "random";//date_added*,relevance, random, views, favorites, toplist
let wallPapers = document.getElementById("wallpapers")
let loader = document.getElementById("LOADER");
let targetImg; // Declare without initial value
const triggerElement = document.getElementById("surch");
const searchBar = document.getElementById("surch2");
const backButton = document.getElementById("back")


function makeButton(){
    if (pageNumber <= 1) {
        backButton.style.display = "none";
    } 
    else {
        backButton.style.display = "block";
    }
}


//Mini functions here ...
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
    let input2 = document.getElementById("display").value
    let searcher = document.getElementById("search-result")
    searcher.textContent = `${input} images`
    searcher.textContent = `${input2} images`
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
function reloaderImg() {
    let wallpapers1 = document.getElementById("wallpapers")
    let searcher = document.getElementById("search-result")
    searcher.textContent = `Trending Now`
    wallpapers1.innerHTML = ""
    defaultImages()
}
// Check if elements exist in in order to have the switch logic
if (loader && (targetImg = document.getElementById("bg"))) {
    targetImg.onload = function () {
        loader.style.display = "none";       
};

} else {
    getJoke()
}
function changeBgPopup() {

    let BG = document.getElementById("changeBG")
    if (BG.style.display == "none" || BG.style.display == "") {
        BG.style.display = "flex"
    }
    else {
        BG.style.display = "none"
    }
}
function changetoCB() {
    document.getElementById("bg").style.backgroundImage = "url(assets/menu9.gif)"
}
function changetoWARM() {
    document.getElementById("bg").style.backgroundImage = "url(assets/WARM.webp)"
}
function changetoDARK() {
    document.getElementById("bg").style.backgroundImage = "url(assets/DARK.webp)"
}
function changetoDEF() {
    document.getElementById("bg").style.backgroundImage = "url(assets/main.webp)"
}
function changeSort() {

    document.getElementById("categories").style.display = "none"
    document.getElementById("Filter-controls").style.display = "none"
    document.getElementById("sort-controls").style.display = "flex"
    sort = ""
}
function changeCategory() {
    document.getElementById("sort-controls").style.display = "none"
    document.getElementById("Filter-controls").style.display = "none"
    document.getElementById("categories").style.display = "flex"
    category = ""
}
function changeFilter() {
    document.getElementById("sort-controls").style.display = "none"
    document.getElementById("categories").style.display = "none"
    document.getElementById("Filter-controls").style.display = "flex"
    //coming soon (reason is NSFW wallpapers)
}
function changeDate() {
    wallPapers.innerHTML = ""
    sort = "date_added"
    defaultImages()
}
function changerandomizer() {
    wallPapers.innerHTML = ""
    sort = "random"
    defaultImages()
}
//so hard to come up with names LOL
function changerelevancer() {
    wallPapers.innerHTML = ""
    sort = "relevance"
    defaultImages()
}
function changetoGeneral() {
    wallPapers.innerHTML = ""
    categories = "100"
    defaultImages()
}
function changetoPeople() {
    wallPapers.innerHTML = ""
    categories = "111"
    defaultImages()
}
function changetoAnime() {
    wallPapers.innerHTML = ""
    categories = "101"
    defaultImages()
}

let NEXT2 = document.getElementById("NXT2");

    
    NEXT2.addEventListener("click", () => {
    wallPapers.innerHTML = ""
    pageNumber = pageNumber + 1;
    defaultImages();
    pagiNate()
    });

let NEXT1 = document.getElementById("NXT1");

    NEXT1.addEventListener("click", () => {
      wallPapers.innerHTML = ""
      pageNumber++;
      fetchImages();
      pagiNate()
    });

let backButton1 = document.getElementById("back")

backButton1.addEventListener("click", () => {
    wallPapers.innerHTML = ""
    pageNumber = pageNumber - 1;
    fetchImages();
    pagiNate()
  });


//Main functions here.
async function defaultImages() {

    makeButton()
    document.getElementById("NXT2").style.display = "flex"
    document.getElementById("NXT1").style.display = "none"
    const mainurl = "https://wallhaven.cc/api/v1/search"


    const wallPapers = document.getElementById("wallpapers");
    const corsProxyUrl = 'https://corsproxy.io/?';
    const url = `${corsProxyUrl}${mainurl}?q=&sorting=${sort}&page=${pageNumber}&purity${purity}&categories${categories}`;

    try {
        const response = await fetch(url);
        const data = await response.json(); // JSON PARSER


        for (let i = 0; i < Math.min(24, data.data.length); i++) { // Limits to 24 images per page

            const image = data.data[i];
            const imageLink = document.createElement("a");
            const imageElement = document.createElement("img");
            imageElement.src = image.thumbs.large; // image url from the API.
            wallPapers.appendChild(imageLink);
            wallPapers.appendChild(imageElement);
            imageLink.appendChild(imageElement)
            imageLink.href = image.url
            imageLink.target = "_blank"
            imageElement.dataset.originalUrl = image.url,
            imageElement.style = "border-radius:10px;"
            imageElement.alt = "wallpapers"



            let loader2 = document.getElementById("loader2")
            let loader3 = document.getElementById("loader3")
            let loader4 = document.getElementById("loader4")

            if (loader2 && (targetImg = imageElement) || loader3 && (targetImg = imageElement) || loader4 && (targetImg = imageElement)) {
                imageElement.onload = function () {
                    loader2.style.display = "none"; 
                    loader3.style.display = "none";  
                    loader4.style.display = "none";        
            };
            }
            

            imageElement.addEventListener("click", downloadImage); // Add event listener for downloading the image from its url in the API too bad i didnt use it cause i found an easier way and removing it just made my whole code explode LOL...

        }


    } catch (error) {
        console.error("Error fetching images:", error); // Log the error details
    }

}

async function fetchImages() {


    document.getElementById("NXT2").style.display = "none"
    document.getElementById("NXT1").style.display = "flex"

    updateSearch()
    makeButton()
    let input = document.getElementById("display").value
    const corsProxyUrl = 'https://corsproxy.io/?'; // CORS Proxy url This was so annoying i had to look it up LOL
    const mainurl = "https://wallhaven.cc/api/v1/search" // main endpoint for the API. 


    const wallPapers = document.getElementById("wallpapers");
    wallPapers.innerHTML = " "

    const url = `${corsProxyUrl}${mainurl}?q=${input}&page=${pageNumber}&purity${purity}&categories${categories}&sorting${sort}`;

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

    


}
////MAGIC!!!
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            searchBar.style.display = 'flex'; // Show search bar
        } else {
            searchBar.style.display = 'none'; // Hide search bar
        }
    });
});

observer.observe(triggerElement);


async function fetchImages2() {


    document.getElementById("NXT2").style.display = "none"
    document.getElementById("NXT1").style.display = "flex"

    updateSearch()
    makeButton()
    let input2 = document.getElementById("display2").value
    const corsProxyUrl = 'https://corsproxy.io/?'; // CORS Proxy url This was so annoying i had to look it up LOL
    const mainurl = "https://wallhaven.cc/api/v1/search" // main endpoint for the API. 

    const apiKey = "xz8sPhbXuW8qZGrvXex7Nvavrn1v5QhK" // irrelevant for now unless.....................


    const wallPapers = document.getElementById("wallpapers");
    wallPapers.innerHTML = " "

    const url = `${corsProxyUrl}${mainurl}?q=${input2}&page=${pageNumber}&purity${purity}&categories${categories}&sorting${sort}`;

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

}
///






//button clicks organised here (ORGANISED LMAO)//
document.getElementById("CB").addEventListener('click', changetoCB)
document.getElementById("WARM").addEventListener('click', changetoWARM)
document.getElementById("DARK").addEventListener('click', changetoDARK)
document.getElementById("DEF").addEventListener('click', changetoDEF)
document.getElementById("SC").addEventListener('click', changeSort)
document.getElementById("CT").addEventListener('click', changeCategory)
document.getElementById("FC").addEventListener('click', changeFilter)
document.getElementById("date-added").addEventListener('click', changeDate)
document.getElementById("randomizer").addEventListener('click', changerandomizer)
document.getElementById("relevancer").addEventListener('click', changerelevancer)
document.getElementById("general").addEventListener('click', changetoGeneral)
document.getElementById("people").addEventListener('click', changetoPeople)
document.getElementById("anime").addEventListener('click', changetoAnime)




async function getJoke(){

    let options = {
        method: 'GET',
        headers: { 'x-api-key': 'P5GA/QalIjAbjjMW4BGOdw==LQf1ZnVopDt0AAK9' }
      }
      
      let url = 'https://api.api-ninjas.com/v1/jokes'
      
      
      fetch(url,options)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              let displayer = document.getElementById("OH")
              displayer.textContent = data[0].joke

            })
            .catch(err => {
                console.log(`error ${err}`)
            }); 
    
    

}

setInterval(getJoke, 5000)

function pagiNate(){
    document.getElementById("1").textContent = pageNumber
}
makeButton()
