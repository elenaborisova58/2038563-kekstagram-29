import { onClickEsc, onClickOutside } from "./big-photo.js";
import { isEscapeKey } from "./util.js";


const successTemplate  = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showPopupSuccess = () => {
  const successPopupElement = successTemplate.cloneNode(true);
  document.body.append(successPopupElement);
  successPopupElement.classList.add('popup');
};

const showPopupError = () => {
  const errorPopupElement = errorTemplate.cloneNode(true);
  document.body.append(errorPopupElement);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', onClickEsc);
  document.addEventListener('click', onClickOutside);
};

const closePopup = () => {
  document.querySelector('.popup').remove();

  document.removeEventListener('keydown', onClickEsc);
  document.removeEventListener('click', onClickOutside);
  document.addEventListener('keydown', onClickPopupEsc);
};

function onClickEsc(evt) {
  if (isEscapeKey) {
    closePopup();
  }
};

function onClickOutside(evt) {
  if (evt.target.classList.contains('success')|| evt.target.classList.contains('error')) {
    closePopup();
  }
};

export {
  showPopupSuccess,
  showPopupError
};