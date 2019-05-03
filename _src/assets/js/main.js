'use strict';

const url = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
const button = document.querySelector('.button');
const radioButtons = document.querySelectorAll('.radio__button');
let fullUrl;
const resultsList = document.querySelector('.results__list');

const getValue = event => {
  fullUrl = `${url}${event.currentTarget.value}.json`;
};

function createCards(data) {
  for (const pokemon of data) {
    console.log(pokemon.image);
  }
}

const startGame = () => {
  fetch(fullUrl)
    .then(response => response.json())
    .then(data => {
      createCards(data);
    });
};


for (const radioButton of radioButtons) {
  radioButton.addEventListener('click', getValue);
}

button.addEventListener('click', startGame);
