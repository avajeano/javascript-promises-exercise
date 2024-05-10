url = "https://deckofcardsapi.com/api/deck/";

// 1. request a single card 
$.getJSON(`${url}/new/draw`).then(data => {
    let {suit, value} = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});

// 2. make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck
let firstCard = null;
$.getJSON(`${url}/new/draw/`)
    .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${url}/${deckId}/draw/`);
    })
    .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(
                `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
        });
    });

// 3. new deck on page load, display a new card until there are no more
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`${url}/new/shuffle`).then(data => {
    deckId = data.deck_id;
    $btn.show();
});

$btn.on('click', function() {
    $.getJSON(`${url}/${deckId}/draw/`).then(data => {
        let cardSource = data.cards[0].image;
        $cardArea.append($('<img>', {src: cardSource}))
    });
    if (data.remaining == 0) $btn.remove();
});