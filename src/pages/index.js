import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as Constants from "../utils/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5764b9be-6485-485e-a9f1-d6c0fb47f479",
    "Content-Type": "application/json",
  },
});

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

const profileUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

profileUserInfo.getUserInfo();

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
    cardSection.addItem(createCard());
    Constants.cardEditForm.reset();
    addFormValidator.resetValidation();
  },
});

api.getInitialCards().then((res) => {
  const cardSection = new Section(
    {
      items: res,
      renderer: (data) => {
        const card = createCard(data);
        cardSection.addItem(card);
      },
    },
    ".cards__list"
  )  
  cardSection.renderItems();
});

api.getUserInfo(profileUserInfo._name, profileUserInfo._description)
.then ((res) => {
  profileUserInfo.setUserInfo({title: res.name, description: res.about});
}).catch ((err) => {
  console.error(err); 
}); 

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
  profileEditModal.open();
  const currentUserInfo = profileUserInfo.getUserInfo();
  Constants.profileTitleInput.value = currentUserInfo.name;
  Constants.profileDescriptionInput.value = currentUserInfo.description;
}

function openEditCardModal() {
  addCardModal.open();
}

/*------------------------------------------------------------------*/
/*                          Event Objects                            */
/*------------------------------------------------------------------*/

function handleProfileEditSubmit({ title, description }) {
  profileUserInfo.setUserInfo({ title, description });
  profileEditModal.close();
}

/*------------------------------------------------------------------*/
/*                          Event Listeners                          */
/*------------------------------------------------------------------*/

Constants.profileEditBtn.addEventListener("click", openEditProfileModal);

Constants.cardAddBtn.addEventListener("click", openEditCardModal);
