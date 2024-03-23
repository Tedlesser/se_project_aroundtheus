
export const initialCards = [
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
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileCloseBtn = document.querySelector("#profile-close-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
  );
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const profileImageForm = document.querySelector("#profile-image-form")
  
export const cardListEl = document.querySelector(".cards__list");
export const cardAddBtn = document.querySelector(".card__add-button");
export const addEditForm = document.querySelector("#card-edit-modal");
export const cardCloseBtn = document.querySelector("#edit-close-button");
export const cardEditForm = document.querySelector("#card-add-form");
export const cardSaveBtn = document.querySelector("#edit-save-button");
export const cardImageModal = document.querySelector("#card-image-modal");
export const imageCloseBtn = document.querySelector("#image-close-button");
export const modalImageEl = cardImageModal.querySelector(".modal__image");
export const modalCaption = cardImageModal.querySelector(".image__caption");
  
export const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
export const deleteModal = document.querySelector("#delete-card-modal")  
export const profileImage = document.querySelector("#profile-image-icon")
export const profileSubmit = document.querySelector("#profile-image-submit")

  // Validation activation
export const validationSettings = {
    modalForm: ".modal__form",
    modalInput: ".modal__input",
    modalButton: ".modal__button",
    modalButtonInactive: "modal__button-inactive",
    modalFormInputTypeError: "modal_form__input_type_error",
    formInputErrorActive: "form__input-error_active",
  };

