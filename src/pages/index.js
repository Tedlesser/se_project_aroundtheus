import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as Constants from "../utils/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";

const editFormValidator = new FormValidator(
  Constants.validationSettings,
  Constants.profileEditForm
);
const addFormValidator = new FormValidator(
  Constants.validationSettings,
  Constants.cardEditForm
);

const popupImage = new PopupWithImage({
  popupSelector: "#card-image-modal",
});

const handleImageClick = ({ name, link }) => {
  popupImage.open({ name, link });
};

const userInfo = new UserInfo(
  Constants.profileTitleInput,
  Constants.profileDescriptionInput
);

const profileEditModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileEditSubmit(data);
  },
});

const addCardModal = new PopupWithForm({
  popupSelector: "#card-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileEditSubmit(data);
  },
});

const cardSection = new Section({
  items: Constants.initialCards,
  renderer: (data) => {
    const card = createCard(data);
    cardSection.addItem(card);
  },
});

addFormValidator.enableValidation();
editFormValidator.enableValidation();
popupImage.setEventListeners();
userInfo;
profileEditModal.setEventListeners();
addCardModal.setEventListeners();

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

Constants.initialCards.forEach((item) => {
  const card = createCard(item);
  addCard(card);
});

/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

function fillProfileInputs() {
  const currentUserInfo = userInfo.getUserInfo();
  Constants.profileTitleInput.value = currentUserInfo.name;
  Constants.profileDescriptionInput.value = currentUserInfo.description;
}

function openEditProfileModal() {
  profileEditModal.open(Constants.profileEditModal);
  fillProfileInputs();
}

function closeEditProfileModal() {
  profileEditModal.close(Constants.profileEditModal);
}

function openImageModal() {
  popupImage.open(Constants.cardImageModal);
}

function closeImageModal() {
  popupImage.close(Constants.cardImageModal);
}

function openEditCardModal() {
  addCardModal.open(Constants.addEditForm);
  addFormValidator.resetValidation();
}

function closeEditCardModal() {
  addCardModal.close(Constants.addEditForm);
}

//prepend to card list
function addCard(cardEl) {
  Constants.cardListEl.prepend(cardEl);
}

/*------------------------------------------------------------------*/
/*                          Event Objects                            */
/*------------------------------------------------------------------*/

function handleProfileEditSubmit(event) {
  console.log(event);
  event.preventDefault();
  Constants.profileTitle.textContent = Constants.profileTitleInput.value;
  Constants.profileDescription.textContent =
    Constants.profileDescriptionInput.value;
  profileEditModal.close(Constants.profileEditModal);
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
  addCardModal.close(Constants.addEditForm);
}

/*------------------------------------------------------------------*/
/*                          Event Listeners                          */
/*------------------------------------------------------------------*/

Constants.profileEditBtn.addEventListener("click", openEditProfileModal);

Constants.profileCloseBtn.addEventListener("click", closeEditProfileModal);

Constants.cardAddBtn.addEventListener("click", openEditCardModal);

Constants.cardCloseBtn.addEventListener("click", closeEditCardModal);

Constants.imageCloseBtn.addEventListener("click", closeImageModal);

Constants.imageCloseBtn.addEventListener("click", closeImageModal);

Constants.profileEditForm.addEventListener("submit", handleProfileEditSubmit);

Constants.cardEditForm.addEventListener("submit", handleAddSubmit);
