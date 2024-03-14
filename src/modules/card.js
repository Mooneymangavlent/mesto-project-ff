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
function createCard(cardData) {
  const cardElement = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", removeElement);
  likeButton.addEventListener("click", toggleLike);
  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
}

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

  const imagePopup = document.querySelector(".popup_type_image");
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = cardTitle;

  const imageCaption = imagePopup.querySelector(".popup__caption");
  imageCaption.textContent = cardTitle;

  imagePopup.classList.add("popup_opened");
}

export { createCard, openImagePopup, initialCards};