const buttonSearch = document.querySelector("#page-home .btn-bottom");
const buttonSearch2 = document.querySelector("#page-home .btn-bottom2");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide");
});

close.addEventListener("click", () => {
  modal.classList.add("hide");
});

buttonSearch2.addEventListener("click", () => {
  modal.classList.remove("hide");
});

close.addEventListener("click", () => {
  modal.classList.add("hide");
});
