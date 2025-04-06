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
let workArrow = document.querySelector(".work-arrow");
workArrow.onclick = function() {
    navLinks.classList.toggle("show1");
}

const createOdometer = (el,value) => {
    const odometer = new Odometer({
        el: el,
        value: 0,
    });
    let hasRun = false

    const options = {
        threshold:[0,0.9],
    }
    const callback=(entries,observer) =>{
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                if(!hasRun){
                    odometer.update(value)
                    hasRun = true;
                }
            }
        })
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el)
};

const expOdometer = document.querySelector(".exp_odometer")
createOdometer(expOdometer, 17)


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




