let place;

$(document).ready(function(){
    $('ol').on('mouseover','.img-box',function(){
        $(this).attr("id", "over")
    });
    $('ol').on('mouseleave','.img-box',function(){
        $(this).attr("id", "")
    });
    $('ol').on('mouseover','div.animate__animated',function(){
        $(this).attr("id", "card")
    });
    $('ol').on('mouseleave','div.animate__animated',function(){
        $(this).attr("id", "")
    });

});

// declares and intializes needed variables
let BASE_URL, namesData, recoData, idx, currentList;
let date = 0
let listIndex = []
let publishDates = []
const API_KEY = `api-key=o9yKiaBtmcAU6APdCXJGOIKI42GxGHGy`


let updated = ""

// Requests a list of availble best sellers lists in the NYT API
$.ajax({
    url: `https://api.nytimes.com/svc/books/v3/lists/names.json?${API_KEY}`
}).then(
    (data) => {
        namesData = data.results
        console.log(namesData)
        namesData.forEach(function(element, index) {
            listIndex.push(element.list_name_encoded);
            let active = ""
            let freq = ""
            var d = new Date(); //Today's date
            var j = new Date(element.newest_published_date); //newswest Date
            if (j.getTime() < (d.getTime() - 1.314e+10)) {
                active = "*"
            }
            if (element.updated === "WEEKLY") {
                freq = ""
            } else if (element.updated === "MONTHLY") {
                freq = "^"
            };
            $(`#lists`).append(`<option id=${'name'+index}>${element.display_name} ${active} ${freq} </option>`);
        });
       

        
        // Sets the page to default the "Combined Print & E-Book Fiction"  
        idx = 0
        BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/current/`+listIndex[idx]+`.json?`;
        dateList();
        handler();  
    
        
    });

// Dropdown menu changes will alter the BASE_URL to a different list
$('#list-name').change(function () {
    $('#lists option:selected').each(function () {
        idx = $(this).index()
        BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/current/`+listIndex[idx]+`.json?`;
        console.log(idx)
        dateList();
        handler();
        
    });    
});

// changes the date of the request 
$('#list-date').change(function () {
    $('#dates option:selected').each(function () {
        if ($(this).index() < publishDates.length) {
            date = $(this).index();
            var selcDate = new Date(publishDates[date])
            var selcMonth;
            var selcDay;
            if (selcDate.getMonth() < 9) {
                selcMonth = `0${selcDate.getMonth() + 1}`
            } else {
                selcMonth = selcDate.getMonth() + 1
            }
            if (selcDate.getDate() < 9) {
                selcDay = `0${selcDate.getDate() + 1}`
            } else {
                selcDay = selcDate.getDate() + 1
            }
            console.log(date);      
            BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/${selcDate.getFullYear()}-${selcMonth}-${selcDay}/`+listIndex[idx]+`.json?`
            handler();  
        } else {
                var url = $(this).val(); 
                if (url) { 
                    window.location = url; 
                }    
            };
        });

    });

// ordinal suffix function for proper date grammar. citation (https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586)
    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    };


function dateList (evt) {
    $("#dates").text('');
    publishDates = []
        var newestDate = new Date(namesData[idx].newest_published_date)
        var oldestDate =  new Date(namesData[idx].oldest_published_date)
        if (namesData[idx].updated === "WEEKLY") {
            for (i = newestDate; i >= oldestDate; i = i - 604800000) {
                publishDates.push(i);
            }
        } else if (namesData[idx].updated === "MONTHLY") {
            for (i = newestDate; i >= oldestDate; i = i - 2.627942e+9) {
                publishDates.push(i);
            }
        }
    publishDates.forEach(function(element) {
        var date = new Date(element)
        let monthName = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        $(`#dates`).append(`<option>${monthName[date.getMonth()]} ${ordinal_suffix_of(date.getDate() + 1)}, ${date.getFullYear()}</option>`);
    })
    $(`#dates`).append(`<option value="https://en.wikipedia.org/wiki/Category:The_New_York_Times_Best_Seller_list">(Explore further back in time on Wikipedia)</option>`);
    console.log(publishDates);
};



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
                $('ol').append(`<div class="animate__animated animate__flipInX list-item" ><div id="ranking">${element.rank}</div><div class="img-box"><div></div><a href="https://www.goodreads.com/search?q=${element.primary_isbn13}" target="_blank"><img src="${element.book_image}" class="book_image"></a></div>
                <div id="info"><a href="https://www.goodreads.com/search?q=${element.primary_isbn13}" target="_blank"><p><strong> ${element.title}</p></a><p>by ${element.author}</p></strong><hr><p id="description">${element.description}</p><strong><p>Weeks on the list: ${element.weeks_on_list}</strong></p><a target="_blank" href="${element.buy_links[0].url}">${element.buy_links[0].name}</a><br><a target="_blank" href="${element.buy_links[1].url}">${element.buy_links[1].name}</a><br><a target="_blank" href="${element.buy_links[2].url}">${element.buy_links[2].name}</a></div>`)
            });
        },
        (error) => {
            console.log(`failure to request!`);
        },
         
        )
    } 
        
