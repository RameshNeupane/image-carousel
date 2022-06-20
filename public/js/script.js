// list of image objects to create img tag
const images = [
  {
    src: "../images/boy-n-dog.jpg",
    alt: "boy and dog",
  },
  {
    src: "../images/lakeside.jpg",
    alt: "lakeside",
  },
  {
    src: "../images/love-nature.jpg",
    alt: "love nature",
  },
  {
    src: "../images/mountain.jpg",
    alt: "mountain",
  },
  {
    src: "../images/tiger.jpg",
    alt: "tiger",
  },
];

const container = document.querySelector(".container");

// carousel class creates viewport and carousel container with images
class Carousel {
  constructor() {
    this.carouselContainerLeft = 0;
  }

  // create caraousel
  create() {
    this.createViewport();
    this.createCarouselContainer();
    this.createImageList();
    this.createLeftButton();
    this.createRightButton();
    this.createDots();
  }

  // create viewport and add to the container
  createViewport() {
    this.viewport = document.createElement("div");
    this.viewport.classList.add("viewport");
    container.appendChild(this.viewport);
  }

  // create carousel container and add to the viewport
  createCarouselContainer() {
    this.carouselContainer = document.createElement("div");
    this.carouselContainer.classList.add("carousel-container");
    this.carouselContainer.style.left = `${this.carouselContainerLeft}px`;
    this.viewport.appendChild(this.carouselContainer);
  }

  // create image list and add to the carousel container
  createImageList() {
    for (let i = 0; i <= images.length - 1; i++) {
      this.img = document.createElement("img");
      this.img.setAttribute("src", `${images[i]["src"]}`);
      this.img.setAttribute("alt", images[i]["alt"]);
      this.img.classList.add("carousel-img");
      this.carouselContainer.appendChild(this.img);
      this.img.style.left = `${i * 100}%`;
    }
  }

  // create automated slide animation
  createSlideAnimation() {
    let count = 0;
    let slideFlag = -1;
    let numSlides = images.length;

    // automate slide animation in every 2 seconds
    const showCarouselId = setInterval(() => {
      if (count === numSlides - 1) {
        count = 0;
        slideFlag *= -1;
      }
      this.carouselContainerLeft += slideFlag * 1200;
      this.carouselContainer.style.left = `${this.carouselContainerLeft}px`;
      console.log(this.carouselContainerLeft);
      count++;
    }, 2000);
  }

  // create left click button
  createLeftButton() {
    this.btnLeftWrapper = document.createElement("div");
    this.viewport.appendChild(this.btnLeftWrapper);
    this.btnLeftWrapper.classList.add("btn-wrapper", "btn-left-wrapper");

    this.btnLeft = document.createElement("div");
    this.btnLeftWrapper.appendChild(this.btnLeft);
    this.btnLeft.classList.add("btn", "btn-left");
  }

  // create right click button
  createRightButton() {
    this.btnRightWrapper = document.createElement("div");
    this.viewport.appendChild(this.btnRightWrapper);
    this.btnRightWrapper.classList.add("btn-wrapper", "btn-right-wrapper");

    this.btnRight = document.createElement("div");
    this.btnRightWrapper.appendChild(this.btnRight);
    this.btnRight.classList.add("btn", "btn-right");
  }

  // create bottom dots for each of the images
  createDots() {
    this.dotsWrapper = document.createElement("div");
    this.dotsWrapper.classList.add("dots-wrapper");
    this.viewport.appendChild(this.dotsWrapper);
    for (let i = 0; i <= images.length - 1; i++) {
      this.dot = document.createElement("div");
      this.dot.classList.add("dot");
      this.dotsWrapper.appendChild(this.dot);

      if (i === 0) {
        this.dot.classList.add("active");
      }
    }
  }

  // handles the slide animation when right button is clicked
  handleRightButtonClick() {
    this.btnRightWrapper.addEventListener("click", () => {
      // after the end of the list, slides to the first image
      if (this.carouselContainerLeft === -4800) {
        this.animateSlide(4800);
      } else {
        this.animateSlide(-1200);
      }
    });
  }

  // handles the slide animation when left button is clicked
  handleLeftButtonClick() {
    this.btnLeftWrapper.addEventListener("click", () => {
      // if the list ends, slides to the last image
      if (this.carouselContainerLeft === 0) {
        this.animateSlide(-4800);
      } else {
        this.animateSlide(1200);
      }
    });
  }

  // animates slides between the range with 60 fps
  animateSlide(range) {
    let count = 1;
    const id = setInterval(() => {
      if (count > 60) {
        clearInterval(id);
        this.displayActiveDot();
      } else {
        count++;
        this.carouselContainerLeft += range / 60;
        this.carouselContainer.style.left = `${this.carouselContainerLeft}px`;
      }
    }, 1000 / 60);
  }

  // animates slide when the particular dot is clicked
  handleDotClick() {
    const dots = document.querySelectorAll(".dot");
    for (let i = 0; i <= dots.length - 1; i++) {
      dots[i].addEventListener("click", () => {
        // animate the slide related to the cliked dot
        animateSlideOnDotClick(i);
      });
    }

    // calculates the range of the slide animation  and the animation is done
    const animateSlideOnDotClick = (i) => {
      const source = this.carouselContainerLeft; // current top left of the carousel
      const dest = -1200 * i; // top left of the carousel needed to be reached
      const range = dest - source; // range to animate from source to destination
      this.animateSlide(range); // animation function call
    };
  }

  // show different color for active dot
  displayActiveDot() {
    // removes the active class from all dots
    const removeActiveClass = () => {
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
    };

    const dots = document.querySelectorAll(".dot");
    const activeDotIndex = Math.abs(this.carouselContainerLeft) / 1200;
    removeActiveClass();
    dots[activeDotIndex].classList.add("active");
  }
}

// create carousel instance and function call for the different buttons click handlle
const carousel = new Carousel();
carousel.create();
carousel.handleRightButtonClick();
carousel.handleLeftButtonClick();
carousel.handleDotClick();
