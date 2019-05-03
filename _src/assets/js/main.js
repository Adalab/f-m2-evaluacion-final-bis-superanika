'use strict';

const url = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
const button = document.querySelector('.button');
const radioButtons = document.querySelectorAll('.radio__button');
let fullUrl;
const resultsList = document.querySelector('.results__list');
let numberOfCards =  getNumberOfCardsFromLocalStorage();
const radioFour = document.getElementById('four');
const radioSix = document.getElementById('six');
const radioEight = document.getElementById('eight');

function getNumberOfCardsFromLocalStorage() {
  let savedNumberOfCards = localStorage.getItem('savedValue');
  if (savedNumberOfCards) {
    return parseInt(savedNumberOfCards);
  } else {
    return 4;
  }
}

const getValue = event => {
  numberOfCards = event.currentTarget.value;
  localStorage.setItem('savedValue', event.currentTarget.value);
};

function createCards(data) {
  for (const pokemon of data) {
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    const imageFront = document.createElement('img');
    imageFront.src = pokemon.image;
    imageFront.classList.add('image__front', 'image', 'hidden');
    const imageBack = document.createElement('img');
    imageBack.src = 'assets/images/back.png';
    imageBack.classList.add('image__back', 'image');
    resultsList.appendChild(listItem);
    listItem.appendChild(imageFront);
    listItem.appendChild(imageBack);
    listItem.addEventListener('click', turnCard);
  }
}
function turnCard(event) {
  event.currentTarget.firstChild.classList.toggle('hidden');
  event.currentTarget.lastChild.classList.toggle('hidden');
}

const startGame = () => {
  resultsList.innerHTML = '';
  fullUrl = `${url}${numberOfCards}.json`;
  fetch(fullUrl)
    .then(response => response.json())
    .then(data => {
      createCards(data);
    });
};

function fakeClick(input) {
  input.click();
}

if (numberOfCards === null) {
  fakeClick(radioFour);
}else if (numberOfCards === 6) {
  fakeClick(radioSix);
}else if (numberOfCards === 8) {
  fakeClick(radioEight);
}else {
  fakeClick(radioFour);
}

for (const radioButton of radioButtons) {
  radioButton.addEventListener('click', getValue);
}

button.addEventListener('click', startGame);
