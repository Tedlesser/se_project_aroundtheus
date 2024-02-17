export default class FormValidator {
  constructor(settings, formElement) {
    this._modalInput = settings.modalInput;
    this._modalButton = settings.modalButton;
    this._modalButtonInactive = settings.modalButtonInactive;
    this._modalFormInputTypeError = settings.modalFormInputTypeError;
    this._formInputErrorActive = settings.formInputErrorActive;
    this._form = formElement;
    console.log(this);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._modalFormInputTypeError);
    //Shows the error message
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formInputErrorActive);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._modalFormInputTypeError);
    //Hides the error message format
    errorElement.classList.remove(this._formInputErrorActive);
    //Removes error message
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    // Fixed parameter name
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  enableValidation() {
    console.log(this._form);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }

  resetValidation() {
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState = (buttonElement, inputList) => {
    // Added settings as parameter
    if (this._hasInvalidInput(inputList)) {
      // Call _hasInvalidInput using 'this'
      buttonElement.classList.add(this._modalButtonInactive);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._modalButtonInactive);
      buttonElement.removeAttribute("disabled");
    }
  };

  _toggleInputError = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListener() {
    const inputList = Array.from(this._form.querySelectorAll(this._modalInput));
    const buttonElement = this._form.querySelector(this._modalButton);

    this._toggleButtonState(buttonElement, inputList); // Pass inputList to _toggleButtonState

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputError(inputElement); // Call _toggleInputError using 'this'
        this._toggleButtonState(buttonElement, inputList); // Pass inputList to _toggleButtonState
      });
    });
  }
}

const settings = {
  modalInput: ".modal__input",
  modalButton: ".modal__button",
  modalButtonInactive: "modal__button-inactive",
  modalFormInputTypeError: "modal_form__input_type_error",
  formInputErrorActive: "form__input-error_active",
};
