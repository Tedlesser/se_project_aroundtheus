/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.modal_form__input_type_error);
  //Shows the error message
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.form__input_error_active);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.modal_form__input_type_error);
  //Hides the error message format
  errorElement.classList.remove(config.form__input_error_active);
  //Removes error message
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.modal__button_inactive);
    buttonElement.setAttribute("disabled", false);
  } else {
    buttonElement.classList.remove(config.modal__button_inactive);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.modal__input)
  );
  const buttonElement = formElement.querySelector(config.modal__button);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.modal__form));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const config = {
  modal__form: ".modal__form",
  modal__input: ".modal__input",
  modal__button: ".modal__button",
  modal__button_inactive: "modal__button-inactive",
  modal_form__input_type_error: "modal_form__input_type_error",
  form__input_error_active: "form__input-error_active",
};

enableValidation(config);
