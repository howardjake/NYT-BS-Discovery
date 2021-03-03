// declares and intializes needed variables
let BASE_URL, namesData, recoData, idx, currentList;
let listIndex = []
const API_KEY = `api-key=o9yKiaBtmcAU6APdCXJGOIKI42GxGHGy`

// Requests a list of availble best sellers lists in the NYT API
$.ajax({
    url: `https://api.nytimes.com/svc/books/v3/lists/names.json?${API_KEY}`
}).then(
    (data) => {
        namesData = data.results
        console.log(namesData)
        namesData.forEach(function(element, index) {
            listIndex.push(element.list_name_encoded);
            $(`select`).append(`<option id=${'name'+index}>${element.display_name}</option>`);
        });
        // Sets the page to default the "Combined Print & E-Book Fiction"  
        idx = 0
        BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/current/`+listIndex[idx]+`.json?` 
        handler();  
    }
)

// Dropdown menu changes will alter the BASE_URL to a different list
$('#list-name').change(function () {
    $('select option:selected').each(function () {
        idx = $(this).index()
        currentList = namesData
        BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/current/`+listIndex[idx]+`.json?`
        console.log(idx)
        handler();
    });    
});

// makes a new request and prints the list data to the page 
function handler (evt) {
    $.ajax({
        url: `${BASE_URL}${API_KEY}`
    }).then(
        (data) => {
            let currentList = data.results.books
            console.log(data);
            $('ol').html('');
            currentList.forEach(function(element) {
                $('ol').append(`<div id="list-item"><div id="ranking">${element.rank}</div><div id="img-box"><div></div><a href="https://www.google.com/search?q=${element.title}+by+${element.author}" target="_blank"><img src="${element.book_image}" id="book_image"></a></div>
                <div id="info"><a href="https://www.google.com/search?q=${element.title}+by+${element.author}" target="_blank"><p><strong> ${element.title}</strong></p></a><p>by ${element.author}</p><hr><p id="description">${element.description}</p><a target="_blank" href="${element.buy_links[0].url}">${element.buy_links[0].name}</a><br><a target="_blank" href="${element.buy_links[1].url}">${element.buy_links[1].name}</a><br><a target="_blank" href="${element.buy_links[2].url}">${element.buy_links[2].name}</a></div>`)
            });
        },
        (error) => {
            console.log(`failure to request!`);
        }
    )} 