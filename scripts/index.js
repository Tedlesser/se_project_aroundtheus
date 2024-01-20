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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

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

function createCard(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardEl = cardTemplate.cloneNode(true);
  // access the card title, card like button, card delete button and image and store them in variables
  const cardImageEl = cardEl.querySelector(".card__image");
  const cardTitleEl = cardEl.querySelector(".card__title");
  const cardLikeBtn = cardEl.querySelector(".card__like-button");
  const cardDeleteBtn = cardEl.querySelector(".card__delete-button");
  // set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  //add card to card list;

  //add event listener for like button/
  cardLikeBtn.addEventListener("click", (e) => {
    e.target.classList.toggle("card__like-button_active");
  });
  //add event listener for delete button
  cardDeleteBtn.addEventListener("click", (e) => {
    e.target.closest(".card").remove();
  });
  //add event listener for image
  cardImageEl.addEventListener("click", () => {
    console.log(cardData.link);
    const modalImageEl = cardImageModal.querySelector(".modal__image");
    const modalCaption = cardImageModal.querySelector(".image__caption");
    // replace src with card link
    modalImageEl.src = cardData.link;
    // replace alt with card title
    modalCaption.textContent = cardData.name;
    // set the alt to image title
    modalImageEl.alt = cardData.name;
    openImageModal(modalImageEl);
  });
  return cardEl;
}

/*------------------------------------------------------------------*/
/*                          Event Handler                           */
/*------------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddSubmit(e) {
  e.preventDefault();
  console.log(e.target);
  const title = e.target.title.value;
  const link = e.target.link.value;

  // clear the input
  e.target.title.value = "";
  e.target.link.value = "";

  createCard({
    name: title,
    link: link,
  });
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

initialCards.forEach((cardData) => {
  const newCardEl = createCard(cardData);
  addCard(newCardEl);
});
