"use strict";

import "./styles/index.css";
import { initialCards } from "./modules/card";
import { createCard } from "./modules/card";
import { openImagePopup } from "./modules/card";
const template = document.querySelector("#card-template");
const gallery = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const editPopup = document.querySelector(".popup_type_edit");
const newPlacePopup = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);
const placeNameInput = newPlacePopup.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = newPlacePopup.querySelector(".popup__input_type_url");

function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}

function addCard(cardElement) {
  gallery.prepend(cardElement);
  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", openImagePopup);
}

function openEditPopup() {
  editPopup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closeEditPopup() {
  editPopup.classList.remove("popup_opened");
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

function openNewPlacePopup() {
  newPlacePopup.classList.add("popup_opened");
}

function closeNewPlacePopup() {
  newPlacePopup.classList.remove("popup_opened");
  placeNameInput.value = "";
  linkInput.value = "";
}

function closeOnEscape(event) {
  if (event.key === "Escape") {
    closeEditPopup();
    closeNewPlacePopup();
    closeImagePopup();
  }
}

function closeOnClickOutside(event) {
  if (event.target.classList.contains("popup_opened")) {
    closeEditPopup();
    closeNewPlacePopup();
    closeImagePopup();
  }
}

function initialize() {
  initialCards.forEach((element) => {
    const card = createCard(element);
    addCard(card);
  });

  const editButton = document.querySelector(".profile__edit-button");
  editButton.addEventListener("click", openEditPopup);

  const newPlaceButton = document.querySelector(".profile__add-button");
  newPlaceButton.addEventListener("click", openNewPlacePopup);

  const closeButtonImagePopup = document.querySelector(
    ".popup_type_image .popup__close"
  );
  closeButtonImagePopup.addEventListener("click", closeImagePopup);

  document.addEventListener("click", closeOnClickOutside);

  const closeButtonEdit = editPopup.querySelector(".popup__close");
  closeButtonEdit.addEventListener("click", closeEditPopup);

  const closeButtonNewPlace = newPlacePopup.querySelector(".popup__close");
  closeButtonNewPlace.addEventListener("click", closeNewPlacePopup);

  document.addEventListener("keydown", closeOnEscape);

  const saveButton = editPopup.querySelector(".popup__button");
  saveButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    closeEditPopup();
  });

  const saveButtonNewPlace = newPlacePopup.querySelector(".popup__button");
  saveButtonNewPlace.addEventListener("click", function (evt) {
    evt.preventDefault();
    const cardData = {
      name: placeNameInput.value,
      link: linkInput.value,
    };
    const card = createCard(cardData);
    addCard(card);
    closeNewPlacePopup();
  });
}

document.addEventListener("DOMContentLoaded", initialize);
