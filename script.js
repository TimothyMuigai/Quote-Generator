function getQuotesApi(selected){
    const quotesApi ='iaw24s9GiNZPRCHG0/YA3w==Q4hKLuzl8mgbZqX5';
    const url = `https://api.api-ninjas.com/v1/quotes?category=${selected}`
    return fetch(url, {
        method: "GET",
        headers: {
        "X-Api-Key": quotesApi
        }
    })
    .then(res => res.json())
}

const displayCategories = document.querySelector('.dropdown-content');
const selectedCategories = document.querySelector('.selected-categories');
const selectedText = document.querySelector('span');
const removeButton =document.querySelector('#closeBtn');

removeButton.addEventListener("click", function(){
    selectedText.innerText="";
    selectedCategories.style.display="none";    
})

displayCategories.addEventListener("click", async function(e){
    const target =e.target;

    if(target.matches('li')){
        selectedCategories.style.display = "flex";
        
        selectedText.innerText = e.target.innerText;
        const selected= selectedText.innerText;
        if(selected){
            try {
                const data = await getQuotesApi(selected);
                    displayData(data);
            } catch (error) {
                console.error(error+"error")
            }
        }
        
    }
})

const author =document.querySelector('.author');
const quotedText =document.querySelector('.quoted');
const generateRandom = document.querySelector('.generateQuote');

function displayData(data) {
    const { author: Author, quote: quotes } = data[0];
    author.innerText = `--${Author}--`;
    quotedText.innerText = `"${quotes}"`;
    console.log(data)
}

generateRandom.addEventListener("click", async function () {
    const selected = selectedText.innerText;
    if (selected) {
        try {
            const data = await getQuotesApi(selected);
            displayData(data);
        } catch (error) {
            console.error(error + "error");
        }
    } else {
        alert("Please select a category first!");
    }
});