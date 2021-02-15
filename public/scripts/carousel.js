"use strict";

let slidersBase = [
  // {
  // items: 0,
  // active: 0,
  // btns: arr,
  // controls: arr,
  // sliderCon: obj,
  // }
];

let slidersClass = ".slider";
let sliderContainerClass = ".slider__container";
let sliderItemClass = ".slider__item";
let btnClass = ".slider__btn";
let dotBoxClass = ".slider__controls";
let dotClass = ".slider__control";
let dotActiveClass = "slider__control--active";
let dotTextClass = ".slider__control-text";
let dotTextText = "Slide to";

let sliders = document.querySelectorAll(slidersClass);

for (let i = 0; i < sliders.length; i++) {
  let items = sliders[i].querySelectorAll(sliderItemClass).length;
  createDotFunc(sliders[i], items);

  let btns = sliders[i].querySelectorAll(btnClass);
  let dots = sliders[i].querySelectorAll(dotClass);
  let sliderCon = sliders[i].querySelector(sliderContainerClass);

  slidersBase.push({});

  slidersBase[i]["items"] = items;
  slidersBase[i]["active"] = 0;
  slidersBase[i]["btns"] = btns;
  slidersBase[i]["dots"] = dots;
  slidersBase[i]["sliderCon"] = sliderCon;
}

// create dot indicator

function createDotFunc(arr, len) {
  const dotBox = arr.querySelector(dotBoxClass);
  let dots = "";

  for (let i = 0; i < len; i++) {
    dots += dotBox.innerHTML;
  }
  dotBox.innerHTML = dots;

  dots = arr.querySelectorAll(dotClass);

  for (let i = 0; i < len; i++) {
    dots[i].classList.remove(dotActiveClass);
    dots[i].querySelector(dotTextClass).innerHTML = `${dotTextText} ${i + 1}`;
  }
  dots[0].classList.add(dotActiveClass);
}

// event

for (let i = 0; i < sliders.length; i++) {
  // event for dots click

  for (let j = 0; j < slidersBase[i]["items"]; j++) {
    slidersBase[i]["dots"][j].onclick = function () {
      slideFunc(
        slidersBase[i],
        slidersBase[i]["dots"],
        slidersBase[i]["dots"][j],
        j,
        slidersBase[i]["items"],
        slidersBase[i]["active"],
        slidersBase[i]["sliderCon"]
      );
    };
  }

  // event for btn prev next click

  slidersBase[i]["btns"][0].onclick = function () {
    slideBtnFunc(
      "prev",
      slidersBase[i],
      slidersBase[i]["items"],
      slidersBase[i]["active"],
      slidersBase[i]["sliderCon"],
      slidersBase[i]["dots"]
    );
  };

  slidersBase[i]["btns"][1].onclick = function () {
    slideBtnFunc(
      "next",
      slidersBase[i],
      slidersBase[i]["items"],
      slidersBase[i]["active"],
      slidersBase[i]["sliderCon"],
      slidersBase[i]["dots"]
    );
  };
}

// slide func for dots click

function slideFunc(arr, dots, dot, btnIndex, len, active, container) {
  container.style.transform = `translateX(-${btnIndex * 100}%)`;

  for (let i = 0; i < len; i++) {
    dots[i].classList.remove(dotActiveClass);
  }

  dot.classList.add(dotActiveClass);
  arr["active"] = btnIndex;
}

// slide func for btn prev next click

function slideBtnFunc(direction, arr, len, active, container, dots) {
  if (direction === "prev") {
    if (active === 0) {
      container.style.transform = `translateX(-${(len - 1) * 100}%)`;
      active = len - 1;
    } else {
      container.style.transform = `translateX(-${(active - 1) * 100}%)`;
      active -= 1;
    }
  } else {
    if (active === len - 1) {
      container.style.transform = `translateX(${0}%)`;
      active = 0;
    } else {
      container.style.transform = `translateX(-${(active + 1) * 100}%)`;
      active += 1;
    }
  }

  for (let i = 0; i < len; i++) {
    dots[i].classList.remove(dotActiveClass);
  }

  dots[active].classList.add(dotActiveClass);
  arr["active"] = active;
}

// autoplay

// let autoplay;

// const smallDevice = window.matchMedia('(max-width: 899px)');

// smallDevice.addListener(handleDeviceChange);

// function handleDeviceChange(event) {
//   if (event.matches) {
//     autoplay = setInterval(autoplayFunc, 10000);
//   } else {
//     clearInterval(autoplay);
//   }
// }

// handleDeviceChange(smallDevice);

autoplay = setInterval(autoplayFunc, 4000);

function autoplayFunc() {
  for (let i = 0; i < sliders.length; i++) {
    slideBtnFunc(
      "next",
      slidersBase[i],
      slidersBase[i]["items"],
      slidersBase[i]["active"],
      slidersBase[i]["sliderCon"],
      slidersBase[i]["dots"]
    );
  }
}
