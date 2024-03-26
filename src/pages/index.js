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

/*------------------------------------------------------------------*/
/*                             API                                  */
/*------------------------------------------------------------------*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5764b9be-6485-485e-a9f1-d6c0fb47f479",
    "Content-Type": "application/json",
  },
});

/*------------------------------------------------------------------*/
/*                          USER INFO                               */
/*------------------------------------------------------------------*/

const profileUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

profileUserInfo.getUserInfo();

/*------------------------------------------------------------------*/
/*                          USER INFO                               */
/*------------------------------------------------------------------*/

const editFormValidator = new FormValidator(
  Constants.validationSettings,
  Constants.profileEditForm
);

editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  Constants.validationSettings,
  Constants.cardEditForm
);

addFormValidator.enableValidation();

const validateAvatarModal = new FormValidator(
  Constants.validationSettings,
  Constants.profileImageForm
); 

console.log(Constants.profileImageForm)

validateAvatarModal.enableValidation();

/*------------------------------------------------------------------*/
/*                          CARD SECTION                            */
/*------------------------------------------------------------------*/

const cardSection = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

/*------------------------------------------------------------------*/
/*                          POPUP WITH                               */
/*------------------------------------------------------------------*/

const popupImage = new PopupWithImage({
  popupSelector: "#card-image-modal",
});

popupImage.setEventListeners();

const profileEditModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileEditSubmit(data);
  },
});

profileEditModal.setEventListeners();

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

addCardModal.setEventListeners();

const editAvatarModal = new PopupWithForm(
  { popupSelector: "#profile-image-modal" ,
  handleFormSubmit: (data) => {
  handleAvatarFormSubmit(data);
     }
  });

editAvatarModal.setEventListeners();

/*------------------------------------------------------------------*/
/*                          DELETE CARD                             */
/*------------------------------------------------------------------*/

const deleteCardModal = new PopupWithConfirm(
  "#delete-card-modal",
  handleDeleteClick
);

deleteCardModal.setEventListeners();

api.getInitialCards().then((res) => {
  console.log(res);
  cardSection.renderItems(res);
});

api
  .getUserInfo(profileUserInfo._name, profileUserInfo._description)
  .then((res) => {
    profileUserInfo.setUserInfo({
      title: res.name,
      description: res.about,
      avatar: res.avatar,
    });
    profileUserInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

function createCard({ name, link, _id }) {
  const card = new Card(
    { name, link },
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    _id, 
    handleLikeButton,
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
}

/*------------------------------------------------------------------*/
/*                          EVENT HANDLERS                            */
/*------------------------------------------------------------------*/

function handleProfileEditSubmit({ title, description }) {
  api.updateProfileInfo({ title, description }).then((res) => {
    profileUserInfo.setUserInfo({ title, description });
    profileEditModal.close();
  });
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

function handleAvatarFormSubmit(link) {
  editAvatarModal.setLoading(true);
  api
    .updateAvatar(link)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      editAvatarModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => editAvatarModal.setLoading(false));
}

const handleImageClick = ({ name, link }) => {
  popupImage.open({ name, link });
};

function handleLikeButton(card) {
  api
    .setLike(card._id, card.isLiked())
    .then((res) => {
      card.handleLikeIcon(res);
    })
    .catch((err) => {
      alert(`Error! ${err}`);
    });
}

/*------------------------------------------------------------------*/
/*                          Event Listeners                          */
/*------------------------------------------------------------------*/

Constants.profileEditBtn.addEventListener("click", openEditProfileModal);

Constants.cardAddBtn.addEventListener("click", openEditCardModal);

Constants.profileImage.addEventListener("click", openProfileImageModal);

// document
  // .querySelector("#profile-image-form")
  // .addEventListener("submit", handleAvatarFormSubmit); // handleAvatarFormSubmit
