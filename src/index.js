"use strict";
import "./styles/index.css";
import { initialCards } from "./modules/card";
import { createCard } from "./modules/card";
import {
  openModal,
  closeModal,
  closeOnEscape,
  closeOnClickOutside,
} from "./modules/modal";

const gallery = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
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

function removeElement(event) {
  event.currentTarget.closest(".card").remove();
}

function toggleLike(event) {
  event.currentTarget.classList.toggle("card__like-button_is-active");
}

function openImagePopup(event) {
  const card = event.currentTarget.closest(".card");
  const imageSrc = card.querySelector(".card__image").src;
  const cardTitle = card.querySelector(".card__title").textContent;

  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imageCaption = imagePopup.querySelector(".popup__caption");

  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = cardTitle;
  imageCaption.textContent = cardTitle;

  openModal(imagePopup);
}

function openEditPopup() {
  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closeEditPopup() {
  closeModal(editPopup);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

function openNewPlacePopup() {
  openModal(newPlacePopup);
}

function closeNewPlacePopup() {
  closeModal(newPlacePopup);
  placeNameInput.value = "";
  linkInput.value = "";
}

function saveEditChanges(event) {
  event.preventDefault();
  closeEditPopup();
}

function saveNewPlace(event) {
  event.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  const card = createCard(cardData, removeElement, toggleLike, openImagePopup);
  gallery.prepend(card);
  closeNewPlacePopup();
}

function initialize() {
  initialCards.forEach((cardData) => {
    const card = createCard(
      cardData,
      removeElement,
      toggleLike,
      openImagePopup
    );
    gallery.prepend(card);
  });

  const editButton = document.querySelector(".profile__edit-button");
  editButton.addEventListener("click", openEditPopup);

  const newPlaceButton = document.querySelector(".profile__add-button");
  newPlaceButton.addEventListener("click", openNewPlacePopup);

  const closeButtonImagePopup = document.querySelector(
    ".popup_type_image .popup__close"
  );
  closeButtonImagePopup.addEventListener("click", () => closeModal(imagePopup));

  document.addEventListener("click", (event) =>
    closeOnClickOutside(event, imagePopup, editPopup, newPlacePopup)
  );

  const closeButtonEdit = editPopup.querySelector(".popup__close");
  closeButtonEdit.addEventListener("click", closeEditPopup);

  const closeButtonNewPlace = newPlacePopup.querySelector(".popup__close");
  closeButtonNewPlace.addEventListener("click", closeNewPlacePopup);

  document.addEventListener("keydown", (event) =>
    closeOnEscape(event, editPopup, newPlacePopup, imagePopup)
  );

  const saveButton = editPopup.querySelector(".popup__button");
  saveButton.addEventListener("click", saveEditChanges);

  const saveButtonNewPlace = newPlacePopup.querySelector(".popup__button");
  saveButtonNewPlace.addEventListener("click", saveNewPlace);
}

document.addEventListener("DOMContentLoaded", initialize);
