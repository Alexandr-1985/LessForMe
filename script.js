"use strict";

let slider = {
  imageUrls: [
    "https://images11.popmeh.ru/upload/img_cache/3af/3af8647f548d6773bc92022ef4ce1c6b_cropped_1332x888.jpg",
    "https://lookw.ru/8/840/1476174600-monaco.-hd-wallpapers-part-1-42.jpg",
    "http://fotovideoforum.ru/gallery/image.php?album_id=333&image_id=5616",
    "https://www.free-wallpapers.su/data/media/2277/big/wf0069.jpg",
  ],
  currentSlider: 0,
  prevBtn: document.getElementById("prev"),
  nextBtn: document.getElementById("next"),
  slideImage: document.getElementById("slider-img"),
  start: function () {
    slider.prevBtn.addEventListener("click", slider.onShowPrev);
    slider.nextBtn.addEventListener("click", slider.onShowNext);
    slider.slideImage.src = slider.imageUrls[slider.currentSlider];
  },

  onShowPrev: function () {
    slider.currentSlider--;
    if (slider.currentSlider < 0) {
      slider.currentSlider = slider.imageUrls.length - 1;
    }
    slider.slideImage.src = slider.imageUrls[slider.currentSlider];
  },
  onShowNext: function () {
    slider.currentSlider++;
    if (slider.currentSlider === slider.imageUrls.length - 1) {
      slider.currentSlider = 0;
    }
    slider.slideImage.src = slider.imageUrls[slider.currentSlider];
  },
};
slider.start();
// let slider = {
//   imageUrls: [],
//   currentSlider: 0,
//   prevBtn: document.getElementById("prev"),
//   nextBtn: document.getElementById("next"),
//   slideImage: document.getElementById("slider-img"),
//   start: function () {
//     console.log(this);
//     this.prevBtn.addEventListener("click", this.onShowPrev);
//     this.nextBtn.addEventListener("click", this.onShowNext);
//     this.imageUrls.push(
//       "https://images11.popmeh.ru/upload/img_cache/3af/3af8647f548d6773bc92022ef4ce1c6b_cropped_1332x888.jpg"
//     );
//     this.imageUrls.push(
//       "https://lookw.ru/8/840/1476174600-monaco.-hd-wallpapers-part-1-42.jpg"
//     );
//     this.imageUrls.push(
//       "https://avatars.mds.yandex.net/get-zen_doc/1852570/pub_5cfcfda13033ae00af00cab9_5cfcfebe34ace300afb34e32/scale_1200"
//     );
//     this.imageUrls.push(
//       "https://www.free-wallpapers.su/data/media/2277/big/wf0069.jpg"
//     );
//     this.imageUrls.push(
//       "http://fotovideoforum.ru/gallery/image.php?album_id=333&image_id=5616"
//     );

//     this.slideImage.src = this.imageUrls[this.currentSlider];
//     console.log(this);
//   },

//   onShowPrev: function () {
//     console.log(this);
//     this.currentSlider--;
//     this.slideImage.src = this.imageUrls[this.currentSlider];
//     this.nextBtn.disabled = false;
//     if (this.currentSlider === 0) {
//       this.prevBtn.disabled = true;
//     }
//   },
//   onShowNext: function () {
//     console.log(this);
//     this.currentSlider++;
//     this.slideImage.src = this.imageUrls[slider.currentSlider];
//     this.prevBtn.disabled = false;
//     if (this.currentSlider === this.imageUrls.length - 1) {
//       this.nextBtn.disabled = true;
//     }
//   },
// };
// let slider = {
//   imageUrls: [],
//   currentSlider: 0,
//   prevBtn: document.getElementById("prev"),
//   nextBtn: document.getElementById("next"),
//   slideImage: document.getElementById("slider-img"),
//   start: function () {
//     console.log(this);
//     this.prevBtn.addEventListener("click", this.onShowPrev.bind(this));
//     this.nextBtn.addEventListener("click", this.onShowNext.bind(this));
//     this.imageUrls.push(
//       "https://images11.popmeh.ru/upload/img_cache/3af/3af8647f548d6773bc92022ef4ce1c6b_cropped_1332x888.jpg"
//     );
//     this.imageUrls.push(
//       "https://lookw.ru/8/840/1476174600-monaco.-hd-wallpapers-part-1-42.jpg"
//     );
//     this.imageUrls.push(
//       "https://avatars.mds.yandex.net/get-zen_doc/1852570/pub_5cfcfda13033ae00af00cab9_5cfcfebe34ace300afb34e32/scale_1200"
//     );
//     this.imageUrls.push(
//       "https://www.free-wallpapers.su/data/media/2277/big/wf0069.jpg"
//     );
//     this.imageUrls.push(
//       "http://fotovideoforum.ru/gallery/image.php?album_id=333&image_id=5616"
//     );

//     this.slideImage.src = this.imageUrls[this.currentSlider];
//     console.log(this);
//   },

//   onShowPrev: function () {
//     console.log(this);
//     this.currentSlider--;
//     this.slideImage.src = this.imageUrls[this.currentSlider];
//     this.nextBtn.disabled = false;
//     if (this.currentSlider === 0) {
//       this.prevBtn.disabled = true;
//     }
//   },
//   onShowNext: function () {
//     console.log(this);
//     this.currentSlider++;
//     this.slideImage.src = this.imageUrls[slider.currentSlider];
//     this.prevBtn.disabled = false;
//     if (this.currentSlider === this.imageUrls.length - 1) {
//       this.nextBtn.disabled = true;
//     }
//   },
// };
// slider.start();
