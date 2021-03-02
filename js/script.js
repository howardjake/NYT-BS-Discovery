let BASE_URL, namesData, recoData, idx, currentList;
let listIndex = []
// $('form').on('submit', handler)
const API_KEY = `api-key=#`

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
        idx = 0
        BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/current/`+listIndex[idx]+`.json?` 
        handler();  
    }
)
    



console.log(idx)

$('#list-name').change(function () {
    $('select option:selected').each(function () {
        idx = $(this).index()
        currentList = namesData
        BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/current/`+listIndex[idx]+`.json?`
        console.log(idx)
        handler();
    });    
})

.change()


function handler (evt) {
    $.ajax({
        url: `${BASE_URL}${API_KEY}`
    }).then(
        (data) => {
            let currentList = data.results.books
            console.log(data);
            $('ol').html('');
            currentList.forEach(function(element, index) {
                $('ol').append(`<hr><li><h4>${element.title}</h4><p>by ${element.author}</p><img src="${element.book_image}"></li><hr>`)
            });
        },
        (error) => {
            console.log(`failure to request!`);
        }
    )
} 

function render() {
    
}