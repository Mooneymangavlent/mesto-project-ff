"use strict";

const template = document.querySelector("#card-template");
const gallery = document.querySelector(".places__list");

function removeElement(element) {
  element.closest(".card").remove();
}

function updateCard(cardElement, cardData) {
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.title;
}

function addCards(card) {
  const newCard = template.content.cloneNode(true);

  updateCard(newCard, card);

  newCard.querySelector(".card").addEventListener("click", (event) => {
    if (event.target.classList.contains("card__delete-button")) {
      removeElement(event.target);
    }
  });

  gallery.append(newCard);
}

initialCards.forEach((element) => {
  addCards(element);
});
