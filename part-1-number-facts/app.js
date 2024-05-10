let favoriteNumber = 11;
let url = "http://numbersapi.com";

// 1. make a request to get a fact about favorite number 
$.getJSON(`${url}/${favoriteNumber}?json`).then(data => {console.log(data)});

// 2. make a request for multiple numbers 
let favoriteNumbers = [11, 21, 18]
$.getJSON(`${url}/${favoriteNumbers}?json`).then(data => {console.log(data)});

// 3. get 4 facts on favorite number
Promise.all(
    Array.from({length:4}, () => {
        return $.getJSON(`${url}/${favoriteNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
})