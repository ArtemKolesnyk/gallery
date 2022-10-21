import galleryItems from './js/data.js';


const refs = {
  ListGalleryItems: document.querySelector('.js-gallery'),
  modalGallery: document.querySelector('.js-lightbox'),
  btnClose: document.querySelector('.lightbox__button'),
  lightBoxImg: document.querySelector('.lightbox__image'),
  owerlay: document.querySelector('.lightbox__overlay'),
  lazyImg: document.querySelectorAll('img[loading="lazy"]'),
}

const ESC_KEY_CODE = 'Escape';
const ARR_RIHGT_KEY_CODE = 'ArrowRight';
const ARR_LEFT_KEY_CODE = 'ArrowLeft';

const markupItemGallery = creatMarkupGaleryItem(galleryItems);

refs.ListGalleryItems.insertAdjacentHTML('beforeend', markupItemGallery); 
refs.ListGalleryItems.addEventListener('click', clickOnImg);



function creatMarkupGaleryItem(galleryItems) {
  return galleryItems
    .map(({preview, original, description}) => {
    return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            loading="lazy"
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `
    }).join('');
};

function clickOnImg(e) {
  e.preventDefault();
  const isImg = e.target;
  if (!isImg) {
   return
  }
  refs.lightBoxImg.src = isImg.dataset.source;
  openModal();
}

function openModal() {
  refs.modalGallery.classList.add('is-open');
  addEventListener('keydown', onEscKeyPress);
  addEventListener('keydown', slideRight);
  addEventListener('keydown', slideLeft);
  refs.owerlay.addEventListener('click', onOwerlayClick);
  refs.btnClose.addEventListener('click', closeModalGalery);
}

function updataAtrr(src = '', alt = '') { 
  refs.lightBoxImg.src = src;
  refs.lightBoxImg.alt = alt;
}

function closeModalGalery() {
  refs.modalGallery.classList.remove('is-open');
  updataAtrr();
}

function onEscKeyPress(e) {
  const isEscKey = e.code;
  if (isEscKey === ESC_KEY_CODE) {
    closeModalGalery();
  }
}

function onOwerlayClick () {
  closeModalGalery();
}

function slider(idx) {
  const { original, description } = galleryItems[idx];
  updataAtrr(original, description);
}

function getIndex() {
 const source = galleryItems.map(({ original }) => original);
  return source.indexOf(refs.lightBoxImg.src);
}

function slideRight(e) {
  const isRightKey = e.code;
  if (isRightKey === ARR_RIHGT_KEY_CODE) {
    let indexOfCurentImg = getIndex();
    if (indexOfCurentImg + 1 > galleryItems.length -1) {
      indexOfCurentImg = -1;
    }
    slider(indexOfCurentImg +1)
  }
}

function slideLeft(e) {
  const isLeftKey = e.code;
  if (isLeftKey === ARR_LEFT_KEY_CODE) {
    let indexOfCurentImg = getIndex();
    if (indexOfCurentImg === 0) {
      indexOfCurentImg = galleryItems.length;
    }
    slider(indexOfCurentImg -1)
  } 
}












