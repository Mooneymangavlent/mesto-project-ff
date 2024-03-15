// modal.js

export function openModal(modalElement) {
  modalElement.classList.add("popup_opened");
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_opened");
}

export function closeOnEscape(event, ...modalElements) {
  if (event.key === "Escape") {
    modalElements.forEach(modal => closeModal(modal));
  }
}

export function closeOnClickOutside(event, ...modalElements) {
  modalElements.forEach(modal => {
    if (event.target.classList.contains("popup_opened")) {
      closeModal(modal);
    }
  });
}
