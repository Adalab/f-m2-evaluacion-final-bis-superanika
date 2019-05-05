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
  let i = 1;
  for (const pokemon of data) {
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    const imageFront = document.createElement('img');
    imageFront.src = pokemon.image;
    imageFront.classList.add('image__front','image', 'hidden');
    imageFront.setAttribute('data-name', pokemon.name);
    imageFront.id = i;
    i++;
    const imageBack = document.createElement('img');
    imageBack.src = 'assets/images/back.png';
    imageBack.classList.add('image__back', 'image');
    resultsList.appendChild(listItem);
    listItem.appendChild(imageFront);
    listItem.appendChild(imageBack);
    listItem.addEventListener('click', turnCard);
  }
  orderCards(data);
}

function orderCards (data) {
  if (data.length === 6) {
    resultsList.classList.add('six__cards');
  }else {
    resultsList.classList.remove('six__cards');
  }
}

let pairsOfCards = [];

function turnCard(event) {
  const frontCard = event.currentTarget.firstChild;
  const backCard = event.currentTarget.lastChild;
  let visible;
  if (!(frontCard.classList.contains('pair'))) {
    if (frontCard.classList.contains('hidden')){
      frontCard.classList.remove('hidden');
      backCard.classList.add('hidden');
      visible = true;
    }else {
      frontCard.classList.add('hidden');
      backCard.classList.remove('hidden');
      visible = false;
    }
  }

  if (visible) {
    if (pairsOfCards.length === 1) {
      if (pairsOfCards[0].id !== frontCard.id) {
        pairsOfCards.push(frontCard);
      }
    }else {
      pairsOfCards.push(frontCard);
    }
    if (pairsOfCards.length === 2) {
      if (pairsOfCards[0].dataset.name === pairsOfCards[1].dataset.name) {
        for (const card of pairsOfCards) {
          card.classList.add('pair');
        }
        pairsOfCards = [];
      }else {
        const cardsToHide = [...pairsOfCards];
        setTimeout(() => {
          for (const card of cardsToHide){
            card.classList.add('hidden');
            card.nextSibling.classList.remove('hidden');
          }
        }, 1000);
        pairsOfCards = [];
      }
    }
  } else {
    pairsOfCards = [];
  }
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
  resultsList.classList.remove('six__cards');
}else if (numberOfCards === 6) {
  fakeClick(radioSix);
  resultsList.classList.add('six__cards');
}else if (numberOfCards === 8) {
  fakeClick(radioEight);
  resultsList.classList.remove('six__cards');
}else {
  fakeClick(radioFour);
  resultsList.classList.remove('six__cards');
}

for (const radioButton of radioButtons) {
  radioButton.addEventListener('click', getValue);
}

button.addEventListener('click', startGame);
