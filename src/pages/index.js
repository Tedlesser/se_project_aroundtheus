import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as Constants from "../utils/Constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5764b9be-6485-485e-a9f1-d6c0fb47f479",
    "Content-Type": "application/json",
  },
});

const profileUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

profileUserInfo.getUserInfo();

const editFormValidator = new FormValidator(
  Constants.validationSettings,
  Constants.profileEditForm
);
const addFormValidator = new FormValidator(
  Constants.validationSettings,
  Constants.cardEditForm
);

// const validateAvatarModal = new FormValidator(
//   Constants.validationSettings,
//   Constants.profileImageForm,
// );


const popupImage = new PopupWithImage({
  popupSelector: "#card-image-modal",
});

const handleImageClick = ({ name, link }) => {
  popupImage.open({ name, link });
};

const profileEditModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileEditSubmit(data);
  },
});

const cardSection = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

const addCardModal = new PopupWithForm({
  popupSelector: "#card-edit-modal",
  handleFormSubmit: (data) => {
    console.trace(data);
    api.createCards(data).then((res) => {
      cardSection.addItem(createCard(res));
      Constants.cardEditForm.reset();
      addFormValidator.resetValidation();
    });
  },
});

const deleteCardModal = new PopupWithConfirm(
  "#delete-card-modal",
  handleDeleteClick
);
// set event listeners for delete card popup
deleteCardModal.setEventListeners();

const editAvatarModal = new PopupWithForm(
  {popupSelector:"#profile-image-modal"},
  handleAvatarFormSubmit
);

editAvatarModal.setEventListeners();

api.getInitialCards().then((res) => {
  console.log(res);
  cardSection.renderItems(res);
});

api
  .getUserInfo(profileUserInfo._name, profileUserInfo._description)
  .then((res) => {
    profileUserInfo.setUserInfo({ title: res.name, description: res.about });
  })
  .catch((err) => {
    console.error(err);
  });

addFormValidator.enableValidation();
editFormValidator.enableValidation();
// validateAvatarModal.enableValidation();
popupImage.setEventListeners();
profileEditModal.setEventListeners();
addCardModal.setEventListeners();

function createCard({ name, link, _id }) {
  const card = new Card(
    { name, link },
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    _id
  );
  const cardElement = card.getView();
  return cardElement;
}

/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

function openEditProfileModal() {
  api.updateProfileInfo().then((res) => {
    profileEditModal.open();
    const currentUserInfo = profileUserInfo.getUserInfo();
    Constants.profileTitleInput.value = currentUserInfo.name;
    Constants.profileDescriptionInput.value = currentUserInfo.description;
  });
}

function openEditCardModal() {
  addCardModal.open();
}

function openProfileImageModal() {
  editAvatarModal.open();
  // validateAvatarModal.toggleSubmitButton();
}

function handleDeleteClick(card) {
  // open the delete card popup
  console.log(card);
  deleteCardModal.open();
  deleteCardModal.setSubmitCallback(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card._handleDeleteCard();
      })
      .catch((err) => {
        console.error(err);
      });
      deleteCardModal.close();
  });
}

function handleAvatarFormSubmit(data) {
  api
    .updateProfileImage(data)
    .then((res) => {
      userInfo.setUserAvatar(data);
    })
    .catch((err) => {
      console.error(err);
    });
  editAvatarModal.close();
}

/*------------------------------------------------------------------*/
/*                          Event Objects                            */
/*------------------------------------------------------------------*/

function handleProfileEditSubmit({ title, description }) {
  api.updateProfileInfo({ title, description }).then((res) => {
    profileUserInfo.setUserInfo({ title, description });
    profileEditModal.close();
  });
}

/*------------------------------------------------------------------*/
/*                          Event Listeners                          */
/*------------------------------------------------------------------*/

Constants.profileEditBtn.addEventListener("click", openEditProfileModal);

Constants.cardAddBtn.addEventListener("click", openEditCardModal);

Constants.profileImage.addEventListener("click", openProfileImageModal);

// Constants.profileSubmit.addEventListener("click", );