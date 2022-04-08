function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll(".img")];
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalImages = getElement(".modal-images");
  this.closeBtn = getElement(".close-btn");
  this.nextBtn = getElement(".next-btn");
  this.prevBtn = getElement(".prev-btn");
  this.modalImageName = getElement(".image-name");

  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.selectfromModalImages = this.selectfromModalImages.bind(this);
  this.container.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("img")) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}
Gallery.prototype.openModal = function (selectedImg, list) {
  this.setMainImage(selectedImg);
  this.modalImages.innerHTML = list
    .map(function (img) {
      return ` <img
            src="${img.src}"
            title="${img.title}"
            class="${
              selectedImg.dataset.id === img.dataset.id
                ? "modal-img selected"
                : "modal-img"
            }"
            data-id="${img.dataset.id}"
          />`;
    })
    .join("");
  this.modal.classList.add("open");
  this.closeBtn.addEventListener("click", this.closeModal);
  this.nextBtn.addEventListener("click", this.nextImage);
  this.prevBtn.addEventListener("click", this.prevImage);

  this.modalImages.addEventListener(
    "click",
    function (e) {
      console.log(e.target);
      if (e.target.classList.contains("modal-img")) {
        this.selectfromModalImages(e.target, this.list);
      }
    }.bind(this)
  );
};
Gallery.prototype.selectfromModalImages = function (selectedImg, list) {
  list.forEach(function (image) {
    image.classList.remove("selected");
  });
  selectedImg.classList.add("selected");
  this.setMainImage(selectedImg);
};
Gallery.prototype.setMainImage = function (selectedImg) {
  this.modalImg.src = selectedImg.src;
  this.modalImageName.textContent = selectedImg.title;
};
Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.closeBtn.removeEventListener("click", this.closeModal);
  this.nextBtn.removeEventListener("click", this.nextBtn);
  this.prevBtn.removeEventListener("click", this.prevBtn);
  this.modalImages.removeEventListener("click", this.selectfromModalImages);
};
Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove("selected");
  next.classList.add("selected");
  this.setMainImage(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove("selected");
  prev.classList.add("selected");
  this.setMainImage(prev);
};
const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
