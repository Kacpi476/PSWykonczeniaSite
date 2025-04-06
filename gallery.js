// carousel
const images = document.querySelectorAll('#zdj');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
// Modal
images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});
modal.addEventListener('click', () => {
    modal.style.display = 'none';
});
    
const toggleArrowIcons = (carousel, arrowIcons) => {
    setTimeout(() => {
        const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
        arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
        arrowIcons[1].style.display = Math.round(carousel.scrollLeft) >= maxScroll ? "none" : "block";
    }, 100);
};
const scrollCarousel = (carousel, direction) => {
    const cardWidth = carousel.querySelector("img").clientWidth + 14; // Image width + margin
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
    carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);
    const arrowIcons = carousel.closest('.gallery_wrapper').querySelectorAll("i");
    toggleArrowIcons(carousel, arrowIcons);
};
const autoCenterImage = (carousel) => {
    const cardWidth = carousel.querySelector("img").clientWidth + 14;
    const offset = carousel.scrollLeft % cardWidth;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft > 0 && carousel.scrollLeft < maxScroll) {
        if (offset > cardWidth / 3) {
            carousel.scrollLeft += cardWidth - offset;
        } else {
            carousel.scrollLeft -= offset;
        }
    }
    const arrowIcons = carousel.closest('.gallery_wrapper').querySelectorAll("i");
    toggleArrowIcons(carousel, arrowIcons);
};
const startDragging = (carousel, event) => {
    let isDragging = true;
    let startX = event.pageX || event.touches[0].pageX;
    let scrollStart = carousel.scrollLeft;
    let scrollDiff = 0;
    const duringDrag = (event) => {
        if (!isDragging) return;
        const currentX = event.pageX || event.touches[0].pageX;
        scrollDiff = currentX - startX;
        carousel.scrollLeft = scrollStart - scrollDiff;
    };
    const stopDragging = () => {
        if (!isDragging) return;
        isDragging = false;
        if (Math.abs(scrollDiff) > 10) {
            autoCenterImage(carousel);
        }
    };
    document.addEventListener("mousemove", duringDrag);
    carousel.addEventListener("touchmove", duringDrag);
    document.addEventListener("mouseup", stopDragging);
    carousel.addEventListener("touchend", stopDragging);
};
// Dodanie do każdej galerii
document.querySelectorAll('.gallery_wrapper').forEach((galleryWrapper) => {
    const carousel = galleryWrapper.querySelector(".gallery_carousel");
    const arrowIcons = galleryWrapper.querySelectorAll("i");
    arrowIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            const direction = icon.id === "right" ? "right" : "left";
            scrollCarousel(carousel, direction);
        });
    });
    carousel.addEventListener("mousedown", (event) => startDragging(carousel, event));
    carousel.addEventListener("touchstart", (event) => startDragging(carousel, event));
    toggleArrowIcons(carousel, arrowIcons);
});