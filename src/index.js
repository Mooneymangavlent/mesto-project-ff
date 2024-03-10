"use strict";
import "./styles/index.css";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const template = document.querySelector("#card-template");
const gallery = document.querySelector(".places__list");

function removeElement(element) {
  element.closest(".card").remove();
}

function createCard(cardData, deleteHandler) {
  const newCard = template.content.cloneNode(true);

  newCard.querySelector(".card__image").src = cardData.link;
  newCard.querySelector(".card__title").textContent = cardData.name;
  newCard.querySelector(".card__image").alt = cardData.name;

  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteHandler);

  return newCard;
}

function addCard(cardElement) {
  gallery.append(cardElement);
}
const init = () => {
  initialCards.forEach((element) => {
    const card = createCard(element, (event) => {
      removeElement(event.target);
    });
    addCard(card);
  });
};
init();
