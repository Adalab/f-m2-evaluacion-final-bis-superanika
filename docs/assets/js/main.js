"use strict";const url="https://raw.githubusercontent.com/Adalab/cards-data/master/",button=document.querySelector(".button"),radioButtons=document.querySelectorAll(".radio__button");let fullUrl;const resultsList=document.querySelector(".results__list");let numberOfCards=getNumberOfCardsFromLocalStorage();const radioFour=document.getElementById("four"),radioSix=document.getElementById("six"),radioEight=document.getElementById("eight"),message=document.querySelector(".message");let cardsFound=0;function getNumberOfCardsFromLocalStorage(){let e=localStorage.getItem("savedValue");return e?parseInt(e):4}const getValue=e=>{numberOfCards=e.currentTarget.value,localStorage.setItem("savedValue",e.currentTarget.value)};function createCards(e){let s=1;for(const t of e){const e=document.createElement("li");e.classList.add("list__item");const a=document.createElement("img");a.src=t.image,a.classList.add("image__front","image","hidden"),a.setAttribute("data-name",t.name),a.id=s,s++;const r=document.createElement("img");r.src="assets/images/back.png",r.classList.add("image__back","image"),resultsList.appendChild(e),e.appendChild(a),e.appendChild(r),e.addEventListener("click",turnCard)}orderCards(e)}function orderCards(e){6===e.length?resultsList.classList.add("six__cards"):resultsList.classList.remove("six__cards")}let pairsOfCards=[];const removeMessage=()=>{message.innerHTML=""};function turnCard(e){const s=e.currentTarget.firstChild,t=e.currentTarget.lastChild;let a;if(s.classList.contains("pair")||(s.classList.contains("hidden")?(s.classList.remove("hidden"),t.classList.add("hidden"),a=!0):(s.classList.add("hidden"),t.classList.remove("hidden"),a=!1)),a){if(1===pairsOfCards.length?pairsOfCards[0].id!==s.id&&pairsOfCards.push(s):pairsOfCards.push(s),2===pairsOfCards.length)if(pairsOfCards[0].dataset.name===pairsOfCards[1].dataset.name){for(const e of pairsOfCards)e.classList.add("pair");pairsOfCards=[],(cardsFound+=2)<numberOfCards?(message.innerHTML="¡Has encontrado pareja!",setTimeout(removeMessage,2e3)):(message.innerHTML="¡Enhorabuena, has ganado!",setTimeout(removeMessage,2e3))}else{const e=[...pairsOfCards];setTimeout(()=>{for(const s of e)s.classList.add("hidden"),s.nextSibling.classList.remove("hidden")},1e3),pairsOfCards=[]}}else pairsOfCards=[]}function shuffle(e){let s,t,a=e.length;for(;a>0;)t=Math.floor(Math.random()*a),s=e[--a],e[a]=e[t],e[t]=s;return e}const startGame=()=>{resultsList.innerHTML="",message.innerHTML="",cardsFound=0,fetch(fullUrl=`${url}${numberOfCards}.json`).then(e=>e.json()).then(e=>{shuffle(e),createCards(e)})};function fakeClick(e){e.click()}null===numberOfCards?(fakeClick(radioFour),resultsList.classList.remove("six__cards")):6===numberOfCards?(fakeClick(radioSix),resultsList.classList.add("six__cards")):8===numberOfCards?(fakeClick(radioEight),resultsList.classList.remove("six__cards")):(fakeClick(radioFour),resultsList.classList.remove("six__cards"));for(const e of radioButtons)e.addEventListener("click",getValue);button.addEventListener("click",startGame);