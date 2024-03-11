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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

userInfo.getUserInfo();

const profileEditModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileEditSubmit(data);
  },
});

const addCardModal = new PopupWithForm({
  popupSelector: "#card-edit-modal",
  handleFormSubmit: (data) => {
    console.trace(data);

    cardSection.addItem(createCard(data));

    Constants.cardEditForm.reset();

    addFormValidator.resetValidation();
  },
});

const cardSection = new Section(
  {
    items: Constants.initialCards,
    renderer: (data) => {
      const card = createCard(data);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

cardSection.renderItems();
addFormValidator.enableValidation();
editFormValidator.enableValidation();
popupImage.setEventListeners();
profileEditModal.setEventListeners();
addCardModal.setEventListeners();

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

function openEditProfileModal() {
  profileEditModal.open(Constants.profileEditModal);
  const currentUserInfo = userInfo.getUserInfo();
  Constants.profileTitleInput.value = currentUserInfo.name;
  Constants.profileDescriptionInput.value = currentUserInfo.description;
}

function openEditCardModal() {
  addCardModal.open();
}

/*------------------------------------------------------------------*/
/*                          Event Objects                            */
/*------------------------------------------------------------------*/

function handleProfileEditSubmit() {
  const newInfo = {
    name: Constants.profileTitleInput.value,
    description: Constants.profileDescriptionInput.value,
  };
  userInfo.setUserInfo(newInfo);
  profileEditModal.close();
}

/*------------------------------------------------------------------*/
/*                          Event Listeners                          */
/*------------------------------------------------------------------*/

Constants.profileEditBtn.addEventListener("click", openEditProfileModal);

Constants.cardAddBtn.addEventListener("click", openEditCardModal);
