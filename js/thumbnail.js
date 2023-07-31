import { openBigPhoto } from "./big-photo.js";


const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture')
const pictureContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const clearContainer = () => {
  document.querySelectorAll('.picture').forEach((el) => {el.remove()});
};

const renderThumbnails = (pictures) => {
 clearContainer();
  pictures.forEach((element) => {

    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.dataset.id = element.id;//возможность связать по айдишнику данные одной конкретн карточки
    pictureElement.querySelector('.picture__img').src = element.url;
    pictureElement.querySelector('.picture__img').alt = element.description;
    pictureElement.querySelector('.picture__comments').textContent = element.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = element.likes;
    pictureFragment.append(pictureElement);
  });
  pictureContainer.append(pictureFragment);

  pictureContainer.addEventListener('click', (evt) => {
    //погружение и выбираем классом выше ближайший
    if (evt.target.classList.contains('picture__img')) {
      const id = evt.target.closest('.picture').dataset.id;
      const picture = pictures.find((el) => el.id === id*1);// умножение превратит строку в число, сложение наоборот
      openBigPhoto(picture);
    };
  });
};


export {renderThumbnails}
