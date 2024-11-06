import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiperGlobals = {
  sticky: false,
  loop: true,
  grabCursor: true,
};

const swiperPricingParams = {
  ...swiperGlobals,
  spaceBetween: 20,
  slidesPerView: 1,
};

const swiperGalleryParams = {
  ...swiperGlobals,
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};

const swiperPricing = new Swiper('#swiper-pricing', swiperPricingParams);
const swiperGallery = new Swiper('#swiper-gallery', swiperGalleryParams);
