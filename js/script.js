'use strict';

swiper();
function swiper() {
  const sliderIndex1 = document.querySelector('.swiper1');
  const sliderIndex2 = document.querySelector('.swiper2');
  const sliderProductPreview = document.querySelector('.swiper__thumbs');
  const sliderProductImages = document.querySelector('.swiper__images');

  if (sliderIndex1) {
    const swiper1 = new Swiper(sliderIndex1, {
      slidesPerView: 1,
      speed: 800,
      grabCursor: true,
      autoHeight: true,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
    });
  }

  if (sliderIndex2) {
    const swiper2 = new Swiper(sliderIndex2, {
      slidesPerView: 'auto',
      spaceBetween: 25,
      grabCursor: true,
      autoHeight: true,
      loop: true,
      slideToClickedSlide: true,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  if (sliderProductPreview && sliderProductImages) {

    const sliderThumbs = new Swiper(sliderProductPreview, {
      slidesPerView: 3,
      spaceBetween: 25,
    });

    const sliderImages = new Swiper(sliderProductImages, {
      slidesPerView: 1,
      spaceBetween: 10,
      mousewheel: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      thumbs: {
        swiper: sliderThumbs,
      },
    });
  }
}

sidePanel();
function sidePanel() {
  // Бургер меню на разрешении < 991.98px
  burgerMenu();
  function burgerMenu() {
    const menu = document.querySelector('.header-bottom__nav');
    const burger = document.querySelector('.burger');
    const overlay = document.querySelector('.overlay');

    const lockScroll = () => {
      document.body.classList.add('lock');
    };

    const unlockScroll = () => {
      document.body.classList.remove('lock');
    };

    const scrollTop = () => {
      menu.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const initialMenu = () => {
      document.querySelector('.header-bottom__sub-list').classList.remove('transformation');
      document.querySelector('.header-bottom__nav').querySelector('.header-bottom__list').classList.remove('transformation');
      scrollTop();
    };

    burger.addEventListener('click', () => {
      menu.classList.add('open');
      overlay.classList.add('open');
      lockScroll();
      initialMenu();
    });

    overlay.addEventListener('click', () => {
      menu.classList.remove('open');
      overlay.classList.remove('open');
      unlockScroll();
    });

    menu.addEventListener('click', event => {
      if (event.target.classList.contains('header-bottom__link--drop')) {
        event.preventDefault();
        event.target.closest('.header-bottom__list').classList.add('transformation');
        event.target.closest('.header-bottom__item').querySelector('.header-bottom__sub-list').classList.add('transformation');
        scrollTop();
      }

      if (event.target.classList.contains('mobile-back__link')) {
        event.preventDefault();
        event.target.closest('.header-bottom__sub-list').classList.remove('transformation');
        event.target.closest('.header-bottom__nav').querySelector('.header-bottom__list').classList.remove('transformation');
        scrollTop();
      }

      if (event.target.classList.contains('header-bottom__link') && !event.target.classList.contains('header-bottom__link--drop')) {
        menu.classList.remove('open');
        overlay.classList.remove('open');
        unlockScroll();
      }
    });

    // Фильтр каталога на разрешении < 991.98px
    filterCatalog();
    function filterCatalog() {
      const filterButton = document.querySelector('.catalog__button-filter');

      if (filterButton) {
        filterButton.addEventListener('click', () => {
          const applyButton = document.querySelector('.filter-products__apply');

          document.querySelector('.catalog__filter').classList.add('transformation');

          lockScroll();

          overlay.classList.add('open');

          const exitPanel = () => {
            document.querySelector('.catalog__filter').classList.remove('transformation');
            overlay.classList.remove('open');
            unlockScroll();
          }

          overlay.addEventListener('click', exitPanel);
          applyButton.addEventListener('click', exitPanel);
        });
      }
    }
  }
}

// Кнопка показать больше в фильтре
checkboxShowMore();
function checkboxShowMore() {
  const buttonShowMore = document.querySelector('.filter-products__show-more');

  if (buttonShowMore) {
    const checkboxLength = document.querySelector('.filter-products__list--show-more').children.length;
    let checkboxItems = 8;

    buttonShowMore.addEventListener('click', event => {
      event.preventDefault();

      checkboxItems += 11;

      const checkboxArray = Array.from(document.querySelector('.filter-products__list--show-more').children);
      const visibleItems = checkboxArray.slice(0, checkboxItems);

      visibleItems.forEach(elem => elem.classList.add('is-visible'));

      if (visibleItems.length === checkboxLength) {
        buttonShowMore.style.display = 'none';
      }
    });
  }
}

// Счетчик товара (stepper)
countProduct();
function countProduct() {
  const stepper = document.querySelector('.stepper__wrapper');
  const stepperInput = document.querySelector('.stepper__input');
  const stepperButtonUp = document.querySelector('.stepper__button--up');
  const stepperButtonDown = document.querySelector('.stepper__button--down');

  if (stepper) {
    let count = stepperInput.value;

    const buttonDisabled = () => {
      if (count == 1) {
        stepperButtonDown.classList.add('stepper__button--disabled');
      } else {
        stepperButtonDown.classList.remove('stepper__button--disabled');
      }
    };

    const allowNumbersOnly = event => {
      let code = (event.which) ? event.which : event.keyCode;

      if (code > 31 && (code < 48 || code > 57)) {
        event.preventDefault();
      }
    };

    stepperInput.addEventListener('keyup', (event) => {
      let self = event.currentTarget;

      if (self.value == '0') {
        self.value = 1;
      }

      self.style.width = `${self.value.length + 1}ex`;

      count = stepperInput.value;

      buttonDisabled();
    });

    stepperInput.addEventListener('keypress', (event) => {
      allowNumbersOnly(event);
    });

    stepperInput.addEventListener('change', (event) => {
      let self = event.currentTarget;

      if (!self.value) {
        self.value = 1;
      }

      count = stepperInput.value;

      buttonDisabled();
    });

    stepperButtonUp.addEventListener('click', (event) => {
      event.preventDefault();

      count++;

      buttonDisabled();

      stepperInput.value = count;

      stepperInput.style.width = `${stepperInput.value.length + 1}ex`;
    });

    stepperButtonDown.addEventListener('click', (event) => {
      event.preventDefault();

      count--;

      buttonDisabled();

      stepperInput.value = count;

      stepperInput.style.width = `${stepperInput.value.length + 1}ex`;
    });
  }
}

// Яндекс карта
ymaps.ready(init);
function init() {
  let map = new ymaps.Map('map', {
    center: [55.93768627309534,37.307784846548074],
    zoom: 17
  });
}


