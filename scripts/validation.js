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

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.modalButtonInactive);
    buttonElement.setAttribute("disabled", false);
  } else {
    buttonElement.classList.remove(config.modalButtonInactive);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.modalInput)
  );
  const buttonElement = formElement.querySelector(config.modalButton);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.modalForm));

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
  modalForm: ".modal__form",
  modalInput: ".modal__input",
  modalButton: ".modal__button",
  modalButtonInactive: "modal__button-inactive",
};

enableValidation(config);
