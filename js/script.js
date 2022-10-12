'use strict';

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

menu.addEventListener('click', (e) => {
  console.log(e.target); 
  // УДАЛИТЬ

  if (e.target.classList.contains('header-bottom__link--drop')) {
    e.preventDefault();
    e.target.closest('.header-bottom__list').classList.add('transformation');
    e.target.closest('.header-bottom__item').querySelector('.header-bottom__sub-list').classList.add('transformation');
    scrollTop();
  }

  if (e.target.classList.contains('mobile-back__link')) {
    e.preventDefault();
    e.target.closest('.header-bottom__sub-list').classList.remove('transformation');
    e.target.closest('.header-bottom__nav').querySelector('.header-bottom__list').classList.remove('transformation');
    scrollTop();
  }

  if (e.target.classList.contains('header-bottom__link') && !e.target.classList.contains('header-bottom__link--drop')) {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    unlockScroll();
  }
});

const swiper1 = new Swiper('.swiper1', {
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

const swiper2 = new Swiper('.swiper2', {
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





