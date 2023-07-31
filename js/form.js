import { isEscapeKey } from './util.js';
import {validateForm} from './validation-form.js';
import {resetScale} from './scale.js';
import { resetEffects } from './effects.js';
import {postPhoto} from './api.js';
import { showPopupSuccess, showPopupError } from './popup.js';

const uploadPhoto = document.querySelector('.img-upload__input');
const uploadModalWindow = document.querySelector('.img-upload__overlay');
const buttonUploadCancel = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadModalImg = document.querySelector('.img-upload__preview img');
const uploadModalEffectsPreviewItems = document.querySelectorAll('.effects__preview');

const renderPreviewImage = () => {
  const fileImage = uploadPhoto.files[0];// возмемься за файл, который выбрал пользователь
  uploadModalImg.src = URL.createObjectURL(fileImage);//из папки на компе у пользователя для предпросмотра без загрузки на сайт
  uploadModalEffectsPreviewItems.forEach((item) => {
    item.style.backgroundImage = `url("${URL.createObjectURL(fileImage)}")`;
  });
};

const showModalWindow = () => {
  uploadModalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onClickEsc);;//-----------------------------------???УУУВ
  renderPreviewImage();
  resetScale();
  resetEffects();
};

const closeModalWindow = () => {
  uploadModalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onClickEsc);//-----------------------------------???УУУВ
  uploadForm.reset(); //---------------------------read about it

};


uploadPhoto.addEventListener('change', () => {
  showModalWindow();

});

buttonUploadCancel.addEventListener('click', () => {
  closeModalWindow();
});
//доделать закрытие esc и закрытие по шторке


//---------------библиотека
 //1 отправка данных на сервер
uploadForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  if (validateForm()) {
    evt.preventDefault();
    postPhoto(new FormData(evt.target)).then((response) => {
      if (response.ok) {
        showPopupSuccess();
       closeModalWindow();
       } else {
        showPopupError();
        document.removeEventListener('keydown', onClickPopupEsc);
      }

    })
    .cath (() => {
      showPopupError();
    });
    .finally(() => {
      enableSubmitButton();
    })
  }
});

function onClickEsc (evt) {
  const isFocusedInput = evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('text__description');
  if (isFocusedInput) {
    return false;
  }
  if (isEscapeKey) {
    closeModalWindow();
  }
};

function onClickOutside (evt) {
  if (evt.target.classList.contains('overlay')){
    closeModalWindow();
  }
};
