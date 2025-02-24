let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
var currentImage = 0

menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
    navLinks.style.left = "-100%";
}
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
    navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
    navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
    navLinks.classList.toggle("show3");
}



// slider
    $('.banner_slider').slick({
        dots:true,
        arrows: true,
        infinite: true,
        speed:1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        drag: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<div class="slick-arrow prev"><</div>',
        nextArrow: '<div class="slick-arrow next">></div>'
    })


// carousel


// Select elements
const carousel = document.querySelector(".carousel");
const firstImage = carousel.querySelector("img");
const arrowIcons = document.querySelectorAll(".wrapper i");
// Variables for state management
let isDragging = false;
let startX = 0;
let scrollStart = 0;
let scrollDiff = 0;
// Helper function to toggle arrow visibility
const toggleArrowIcons = () => {
    setTimeout(() => {
        const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
        arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
        arrowIcons[1].style.display = Math.round(carousel.scrollLeft) >= maxScroll ? "none" : "block";
    }, 100);
};
// Helper function to smoothly scroll the carousel
const scrollCarousel = (direction) => {
const cardWidth = firstImage.clientWidth + 14; // Image width + margin
const maxScroll = carousel.scrollWidth - carousel.clientWidth;
const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);
toggleArrowIcons();
};
// Event listeners for arrows
arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        const direction = icon.id === "right" ? "right" : "left";
        scrollCarousel(direction);
    });
});
// Automatic adjustment after dragging
const autoCenterImage = () => {
const cardWidth = firstImage.clientWidth + 14;
const offset = carousel.scrollLeft % cardWidth;
const maxScroll = carousel.scrollWidth - carousel.clientWidth;
if (carousel.scrollLeft > 0 && carousel.scrollLeft < maxScroll) {
    if (offset > cardWidth / 3) {
      carousel.scrollLeft += cardWidth - offset; // Snap to the next image
    } else {
      carousel.scrollLeft -= offset; // Snap to the previous image
    }
}
toggleArrowIcons();
};
// Dragging logic
const startDragging = (event) => {
isDragging = true;
startX = event.pageX || event.touches[0].pageX;
scrollStart = carousel.scrollLeft;
carousel.classList.add("dragging");
};
const duringDrag = (event) => {
if (!isDragging) return;
const currentX = event.pageX || event.touches[0].pageX;
scrollDiff = currentX - startX;
carousel.scrollLeft = scrollStart - scrollDiff;
};
const stopDragging = () => {
if (!isDragging) return;
isDragging = false;
carousel.classList.remove("dragging");
if (Math.abs(scrollDiff) > 10) {
    autoCenterImage(); }
};
// Attach event listeners
carousel.addEventListener("mousedown", startDragging);
carousel.addEventListener("touchstart", startDragging);
document.addEventListener("mousemove", duringDrag);
carousel.addEventListener("touchmove", duringDrag);
document.addEventListener("mouseup", stopDragging);
carousel.addEventListener("touchend", stopDragging);
// Initial setup
toggleArrowIcons();