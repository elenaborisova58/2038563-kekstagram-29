import { isEscapeKey } from "./util.js";
import { COMMENTS_DOSE } from "./constants.js";

const photoContainer =  document.querySelector('.pictures');
const bigPhoto = document.querySelector('.big-picture');
const buttonCloseBigPhoto = document.querySelector('.big-picture__cancel');

const imageInBigPhoto = bigPhoto.querySelector('.big-picture__img img');
const likesInBigPhoto = bigPhoto.querySelector('.social__likes');
const titleInBigPhoto = bigPhoto.querySelector('social__caption');
const commentsInBigPhoto = bigPhoto.querySelector('comments-count');

const commentItemInBIgPhoto = bigPhoto.querySelector('social__comment');
const commentContainerInBIgPhoto = bigPhoto.querySelector('social__comments');

//for more-comments module
const commentsInBigPhotoCount = bigPhoto.querySelector('social__comment-count');

const commentsLoader = bigPhoto.querySelector('.social__comments-loader');


const commentsList =[];
let commentsVolume = 0;

const renderButtonLoader = () => {
  if (!commentsList.length ) {
    commentsLoader.classList.add('hidden')
  }
  else {
    commentsLoader.classList.remove('hidden')
  }
};



const renderStatistic = () => {
  commentsInBigPhotoCount.innerHTML = `${commentsVolume - commentsList.length} из <span class="comments-count">${commentsVolume}</span> комментариев`
};
//----------------------------------------


const renderOneComment = (item) => {
  const commentElement = commentItemInBIgPhoto.cloneNode(true);
  commentElement.querySelector('.social__picture').src = item.avatar;
  commentElement.querySelector('.social__text').textContent = item.message;
  commentElement.querySelector('.social__picture').textContent = item.name;
  return commentElement;
};



const renderCommentsInBIgPhoto = () => {
  const fragment = document.createDocumentFragment();
  commentsList.splice(0, COMMENTS_DOSE).forEach((e) => {
   fragment.append(renderOneComment(e));
  });

  commentContainerInBIgPhoto.append(fragment);//вставляем строку эту аппендом
  renderButtonLoader();
  renderStatistic ();
};


const openBigPhoto = (elem) => {
  commentsVolume = elem.comments.length;
  commentContainerInBIgPhoto.innerHTML = '';//чистим контейнер перед тем как вставить в него фрагмент
  bigPhoto.classList.remove('hidden');
  imageInBigPhoto.src = elem.url;
  likesInBigPhoto.textContent = elem.likes;
  titleInBigPhoto.textContent =  elem.description;


  commentsList.length = 0; //обнулили массив
  commentsList.push(...elem.comments.slice());

  renderCommentsInBIgPhoto(elem.comments);

  document.addEventListener('keydown', onClickEsc);
};

//for more-comments

commentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();

  renderCommentsInBIgPhoto();
});

//---------------------------------------------------

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onClickEsc);
};



buttonCloseBigPhoto.addEventListener('click', (evt) => {
  closeBigPhoto();
});

/*document.addEventListener('keydown',  (evt) =>{
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
});
*/

function onClickEsc (evt) {
  if (evt.key === 'Escape') {
    closeBigPhoto();
  }
};

export {openBigPhoto}




