const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
const refs = {
  ListGalleryItems: document.querySelector('.js-gallery'),
  modalGallery: document.querySelector('.js-lightbox'),
  btnClose: document.querySelector('.lightbox__button'),
  lightBoxImg: document.querySelector('.lightbox__image'),
  owerlay: document.querySelector('.lightbox__overlay'),
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








