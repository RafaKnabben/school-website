//navbar fixed and scrolling transformation

const nav = document.querySelector("nav");
const spot = document.querySelector(".spot");

const handleScroll = (entries) => {
    const spotIsVisible = entries[0].isIntersecting;
    if (spotIsVisible) {
        nav.classList.remove("nav-fixed");
    } else {
        nav.classList.add("nav-fixed");
    }
};

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
};

const observer = new IntersectionObserver(handleScroll, options);
observer.observe(spot);

// dropdrown activating

const überButton = document.querySelector("#über-button");
const fachButton = document.querySelector("#fach-button");
const burguerButton = document.querySelector(".burguer");
const dropÜber = document.querySelector(".drop-list-über");
const dropFach = document.querySelector(".drop-list-fach");
const dropBurguer = document.querySelector(".drop-list-burguer");
const dropActivateFach = document.querySelector(".drop-activate_fach");
const dropActivateÜber = document.querySelector(".drop-activate_über");
const dropActiveBurguer = document.querySelector(".drop-active_burguer");

überButton.addEventListener("click", (e) =>{
    e.preventDefault();

        dropFach.classList.remove("drop-activate_fach");
        dropÜber.classList.toggle("drop-activate_über");

})

fachButton.addEventListener("click", (e) =>{
    e.preventDefault();

        dropÜber.classList.remove("drop-activate_über");
        dropFach.classList.toggle("drop-activate_fach");

})

burguerButton.addEventListener("click", (e) => {
    e.preventDefault();

        dropBurguer.classList.toggle("drop-active_burguer");
})

//nav burguer sliding

// const navSlide = () => {
//     const burguer = document.querySelector(".burguer");
//     const nav = document.querySelector(".nav-list");

//     burguer.addEventListener("click", () => {
//         nav.classList.toggle("nav_active")
//     })
// };

// navSlide();

// carousel sliding

const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");
const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current_slide");
    targetSlide.classList.add("current_slide");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current_slide");
    targetDot.classList.add("current_slide");
}

const navLoop = (track, currentSlide, firstSlide) => {
    track.style.transform = "translateX(" + firstSlide.style.left + ")";
    currentSlide.classList.remove("current_slide");
    firstSlide.classList.add("current_slide");
    }

const dotLoop = (currentDot, firstDot) => {
    currentDot.classList.remove("current_slide");
    firstDot.classList.add("current_slide");
}

const navBackLoop = (track, currentSlide, lastSlide) => {
    track.style.transform = "translateX(-" + lastSlide.style.left + ")";
    currentSlide.classList.remove("current_slide");
    lastSlide.classList.add("current_slide");
}

const dotBackLoop = (currentDot, lastDot) => {
    currentDot.classList.remove("current_slide");
    lastDot.classList.add("current_slide");
}

// carousel clockwise loop

const navClockwise = () => {
    const currentSlide = track.querySelector(".current_slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current_slide");
    const nextDot = currentDot.nextElementSibling;
    const firstSlide = slides[0];
    const firstDot = dots[0];

        if(currentSlide === slides[slides.length-1]) {
            navLoop(track, currentSlide, firstSlide);
            dotLoop(currentDot, firstDot);
        } else {
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        }
}

// carousel anti clockwise loop

const navAntiClockwise = () => {
    const currentSlide = track.querySelector(".current_slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current_slide");
    const prevDot = currentDot.previousElementSibling;
    const lastSlide = slides[slides.length -1];
    const lastDot = dots[dots.length -1];

    if (currentSlide === slides[0]) {
        navBackLoop(track, currentSlide, lastSlide);
        dotBackLoop(currentDot, lastDot);
    } else {
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    }
}

// carousel automatic sliding
const slideInterval = setInterval(
        navClockwise, 5000);

    // slideInterval();

    if (window.innerWidth < 800) {
        clearInterval(slideInterval);
    };

// carousel buttons

nextButton.addEventListener("click", e => {
    navClockwise()
})

prevButton.addEventListener("click", e => {
    navAntiClockwise();
})

//carousel nav dots

dotsNav.addEventListener("click", e => {
    const targetDot = e.target.closest("button");

    const currentSlide = track.querySelector(".current_slide");
    const currentDot = dotsNav.querySelector(".current_slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentDot, targetSlide);
    updateDots(currentDot, targetDot);
})