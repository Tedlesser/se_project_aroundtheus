
// // Declare the keydown event listener function
// function handleKeydown(event) {
//   if (event.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");

//     closePopup(openedModal);
//   }
// }

// // Function to add the keydown event listener
// function addKeydownEventListener() {
//   document.addEventListener("keydown", handleKeydown);
// }

// // Function to remove the keydown event listener
// function removeKeydownEventListener() {
//   document.removeEventListener("keydown", handleKeydown);
// }

// function handleOutsideClick(event) {
//   if (event.target.classList.contains("modal_opened")) {
//     closePopup(event.target);
//   }
// }

// // Function to add the global click listener
// function addGlobalClickListener() {
//   document.addEventListener("click", handleOutsideClick);
// }

// // Function to remove the global click listener
// function removeGlobalClickListener() {
//   document.removeEventListener("click", handleOutsideClick);
// }