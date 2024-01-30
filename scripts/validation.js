/*------------------------------------------------------------------*/
/*                              Element                             */
/*------------------------------------------------------------------*/
const formElement = document.querySelector(".modal__form");
const inputElement = formElement.querySelector(".modal__input");
const formError = formElement.querySelector(`.${inputElement.id}-error`);
const buttonElement = formElement.querySelector(".modal__button");

/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("modal_form__input_type_error");
  //Shows the error message
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("modal_form__input_type_error");
  //Hides the error message format
  errorElement.classList.remove("form__input-error_active");
  //Removes error message
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button-inactive");
  } else {
    buttonElement.classList.remove("modal__button-inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/*------------------------------------------------------------------*/
/*                          Event Listener                          */
/*------------------------------------------------------------------*/

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

inputElement.addEventListener("input", isValid);




