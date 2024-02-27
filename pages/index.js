import { initialCards, containerSelector } from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// Create instances of the class.
const cardPreview = new PopupWithImage(containerSelector.previewModal);

const CardSection = new Section({
  renderer: ({ name, link }) => {
    const cardEl = new Card(
      { name, link },
      containerSelector.cardTemplate,
      handleImageClick
    );
    CardSection.addItem(cardEl.getView());
  },
  containerSelector: containerSelector.cardSection,
});

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, cardEditForm);

const newCardPopup = new PopupWithForm("#card-edit-modal", () => {});

// Initialize all my instances.
CardSection.renderItems(initialCards);
cardPreview.setEventListeners();
addFormValidator.enableValidation();
editFormValidator.enableValidation();
newCardPopup.open();
newCardPopup.close();

// all the rest.

function fillProfileInputs() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  openPopup(profileEditModal);
  fillProfileInputs();
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

function openImageModal() {
  openPopup(cardImageModal);
}

profileEditBtn.addEventListener("click", openEditProfileModal);

profileCloseBtn.addEventListener("click", closeEditProfileModal);

cardAddBtn.addEventListener("click", openEditCardModal);

cardCloseBtn.addEventListener("click", closeEditCardModal);

imageCloseBtn.addEventListener("click", closeImageModal);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardEditForm.addEventListener("submit", handleAddSubmit);

/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

//prepend to card list
function addCard(cardEl) {
  cardListEl.prepend(cardEl);
}

// Declare the keydown event listener function
// function handleKeydown(event) {
//   if (event.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");

//     closePopup(openedModal);
//   }
// }

// // Function to add the keydown event listener
// function addKeydownEventListener() {
//   document.addEventListener("keydown", handleKeydown);
// }

// // Function to remove the keydown event listener
// function removeKeydownEventListener() {
//   document.removeEventListener("keydown", handleKeydown);
// }

// function handleOutsideClick(event) {
//   if (event.target.classList.contains("modal_opened")) {
//     closePopup(event.target);
//   }
// }

// // Function to add the global click listener
// function addGlobalClickListener() {
//   document.addEventListener("click", handleOutsideClick);
// }

// // Function to remove the global click listener
// function removeGlobalClickListener() {
//   document.removeEventListener("click", handleOutsideClick);
// }

// function openPopup(modal) {
//   // Open the popup logic...
//   modal.classList.add("modal_opened");
//   // Add global click listener when the popup is opened
//   addGlobalClickListener();
//   addKeydownEventListener();
// }

// // Function to close the popup
// function closePopup(modal) {
//   // Close the popup logic...
//   modal.classList.remove("modal_opened");
//   // Remove global click listener when the popup is closed
//   removeGlobalClickListener();
//   removeKeydownEventListener();
// }

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
  const card = createCard({
    name: title,
    link: link,
  });
  addCard(card);

  // Close the popup
  closePopup(addEditForm);
}

initialCards.forEach((item) => {
  const card = createCard(item);
  addCard(card);
});

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

// function handleImageClick(name, link) {
//   // replace src with card link
//   modalImageEl.src = link;
//   // replace alt with card title
//   modalCaption.textContent = name;
//   // set the alt to image title
//   modalImageEl.alt = name;
//   openImageModal(modalImageEl);
// }
