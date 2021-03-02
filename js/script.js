let namesData, recoData, idx, currentList;


// $('form
').on('submit', handler)
const API_KEY = `api-key=#`

$.ajax({
    url: `https://api.nytimes.com/svc/books/v3/lists/names.json?${API_KEY}`
}).then(
    (data) => {
        namesData = data.results
        namesData.forEach(function(element, index) {
            $(`select`).append(`<option id=${'name'+index}>${element.display_name}</option>`)
        });     
    }
    )
    
idx = 0

console.log(idx)
$('#list-name').change(function () {
    $('select option:selected').each(function () {
        idx = $(this).index()
        currentList = namesData
    });
    
})
.change()

// $.ajax({
//     url: `https://api.nytimes.com/svc/books/v3/lists/current/${namesData[index].list_name_encoded}.json${API_KEY}`
// }).then (
//     (data) => {
//         console.log(data)
//     },
// )


// let BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/{date}/${currentList}.json?`


function handler (evt) {
    $.ajax({
        url: `${BASE_URL}${API_KEY}`
    }).then(
        (data) => {
            console.log(recoData);
        },
        (error) => {
            console.log(`failure to request!`);
        }
    )
} 
