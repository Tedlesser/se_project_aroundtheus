/*------------------------------------------------------------------*/
/*                             Functions                            */
/*------------------------------------------------------------------*/

const config = {
  modalForm: ".modal__form",
  modalInput: ".modal__input",
  modalButton: ".modal__button",
  modalButtonInactive: "modal__button-inactive",
  modalFormInputTypeError: "modal_form__input_type_error",
  formInputErrorActive: "form__input-error_active",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.modalFormInputTypeError);
  //Shows the error message
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.formInputErrorActive);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.modalFormInputTypeError);
  //Hides the error message format
  errorElement.classList.remove(config.formInputErrorActive);
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
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(config.modalButtonInactive);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.modalInput));
  const buttonElement = formElement.querySelector(config.modalButton);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleInputError(formElement, inputElement, config);
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

const toggleInputError = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

enableValidation(config);
