import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  initialCards,
  profileEditBtn,
  profileEditModal,
  profileCloseBtn,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  cardListEl,
  cardAddBtn,
  addEditForm,
  cardCloseBtn,
  cardEditForm,
  cardSaveBtn,
  cardImageModal,
  imageCloseBtn,
  modalImageEl,
  modalCaption,
  cardTemplate,
  validationSettings,
} from "../components/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
// import PupupWithForm from "../components/PopupWithForm.js";

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
  const title = event.target.title.value;
  const link = event.target.link.value;

  // Clear the input
  event.target.title.value = "";
  event.target.link.value = "";

  // Add the new card element to the DOM
  const card = createCard({
    name: title,
    link: link,
  });
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

const previewPopup = new PopupWithImage({
  popupSelector: "#card-image-modal",
});

function handleImageClick(cardData) {
  previewPopup.open(cardData);
}

previewPopup.setEventListeners();

const profileEditPopup = new PopupWithForm({
  popupSelector: "#card-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileEditSubmit(data);
  },
});
profileEditPopup.setEventListeners();
