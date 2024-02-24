import FormValidator from "../Components/FormValidator.js";
import Card from "../Components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*------------------------------------------------------------------*/
/*                              Element                             */
/*------------------------------------------------------------------*/
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardAddBtn = document.querySelector(".card__add-button");
const addEditForm = document.querySelector("#card-edit-modal");
const cardCloseBtn = document.querySelector("#edit-close-button");
const cardEditForm = document.querySelector("#card-add-form");
const cardSaveBtn = document.querySelector("#edit-save-button");
const cardImageModal = document.querySelector("#card-image-modal");
const imageCloseBtn = document.querySelector("#image-close-button");
const modalImageEl = cardImageModal.querySelector(".modal__image");
const modalCaption = cardImageModal.querySelector(".image__caption");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Validation activation
const validationSettings = {
  modalForm: ".modal__form",
  modalInput: ".modal__input",
  modalButton: ".modal__button",
  modalButtonInactive: "modal__button-inactive",
  modalFormInputTypeError: "modal_form__input_type_error",
  formInputErrorActive: "form__input-error_active",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, cardEditForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

function fillProfileInputs() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  openPopup(profileEditModal);
  fillProfileInputs();
}

function openImageModal() {
  openPopup(cardImageModal);
}

function closeEditProfileModal() {
  closePopup(profileEditModal);
}

function openEditCardModal() {
  openPopup(addEditForm);
  addFormValidator.resetValidation();
}

function closeEditCardModal() {
  closePopup(addEditForm);
}

function closeImageModal() {
  closePopup(cardImageModal);
}

//prepend to card list
function addCard(cardEl) {
  cardListEl.prepend(cardEl);
}

// Declare the keydown event listener function
function handleKeydown(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");

    closePopup(openedModal);
  }
}

// Function to add the keydown event listener
function addKeydownEventListener() {
  document.addEventListener("keydown", handleKeydown);
}

// Function to remove the keydown event listener
function removeKeydownEventListener() {
  document.removeEventListener("keydown", handleKeydown);
}

function handleOutsideClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closePopup(event.target);
  }
}

// Function to add the global click listener
function addGlobalClickListener() {
  document.addEventListener("click", handleOutsideClick);
}

// Function to remove the global click listener
function removeGlobalClickListener() {
  document.removeEventListener("click", handleOutsideClick);
}

function openPopup(modal) {
  // Open the popup logic...
  modal.classList.add("modal_opened");
  // Add global click listener when the popup is opened
  addGlobalClickListener();
  addKeydownEventListener();
}

// Function to close the popup
function closePopup(modal) {
  // Close the popup logic...
  modal.classList.remove("modal_opened");
  // Remove global click listener when the popup is closed
  removeGlobalClickListener();
  removeKeydownEventListener();
}

/*------------------------------------------------------------------*/
/*                          Event Object                            */
/*------------------------------------------------------------------*/

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
function handleAddSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  const title = event.target.title.value;
  const link = event.target.link.value;

  // Clear the input
  event.target.title.value = "";
  event.target.link.value = "";

  // Add the new card element to the DOM
  const card = createCard({ title, link });
  addCard(card);

  // Close the popup
  closePopup(addEditForm);
}

/*------------------------------------------------------------------*/
/*                          Event Listener                          */
/*------------------------------------------------------------------*/

profileEditBtn.addEventListener("click", openEditProfileModal);

profileCloseBtn.addEventListener("click", closeEditProfileModal);

cardAddBtn.addEventListener("click", openEditCardModal);

cardCloseBtn.addEventListener("click", closeEditCardModal);

imageCloseBtn.addEventListener("click", closeImageModal);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardEditForm.addEventListener("submit", handleAddSubmit);

initialCards.forEach((item) => {
  const card = createCard(item);
  addCard(card);
});

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function handleImageClick(name, link) {
  // replace src with card link
  modalImageEl.src = link;
  // replace alt with card title
  modalCaption.textContent = name;
  // set the alt to image title
  modalImageEl.alt = name;
  openImageModal(modalImageEl);
}
