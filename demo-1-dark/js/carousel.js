// Carousel used for testimonials

class Carousel extends HTMLElement {
    constructor() {
        super();

        this.slider = this.querySelector('.carousel__slider');
        this.slides = Array.from(this.querySelectorAll('.carousel__slide'));
        this.previous = this.querySelector('button[name="previous"]');
        this.next = this.querySelector('button[name="next"]');

        // clone slides
        this.clones = [];

        this.slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('.carousel__slide--clone');
            this.clones.push(clone);
        });

        // Add clones to slider
        this.clones.reverse().forEach(clone => {
            this.slides.unshift(clone);
            this.slider.prepend(clone);
        })

        // default position
        this.slider.style.transform = `translateX(-50%)`;
        this.slider.style.width = `${100 * this.slides.length}%`;
        this.direction = null;

        /*
        ======
        Events
        ======
        */

        // Change slide on next button click/keydown
        this.next.addEventListener('click', (e) => this.increment())
        this.next.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.increment
            }
        })

        // Change slide on previous button click/keydown
        this.previous.addEventListener('click', (e) => this.decrement())
        this.previous.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.decrement
            }
        })


        // When slider is done moving
        this.slider.addEventListener('transitionend', () => {
            // If slider went right, add the last element to the beginning
            if (this.direction === 'right') {
                this.slider.prepend(this.slider.lastElementChild);
            }
            // If slider went left, add the first element to the end
            else if (this.direction === 'left') {
                this.slider.appendChild(this.slider.firstElementChild);
            }

            // Disable the transition, then transform and reset the transition
            this.slider.style.transition = 'none'
            this.slider.style.transform = `translateX(-50%)`;
            setTimeout(() => {
                this.slider.style.transition = 'transform 600ms ease-in-out'
            }, 0)
        })
    }
    increment() {
        if (this.direction === null) {
            this.slider.style.transition = 'transform 600ms ease-in-out';
        }
        // Change direction to left and translate based on length of slides
        this.direction = 'left';
        this.slider.style.transform = `translateX(-${(100 / this.slides.length) + 50}%)`;
    }

    decrement() {
        // If slider has not moved, give it a transition
        if (this.direction === null) {
            this.slider.style.transition = 'transform 600ms ease-in-out';
        }
        // Change direction to right and translate based on length of slides
        this.direction = 'right';
        this.slider.style.transform = `translateX(-${50 - 100 / this.slides.length}%)`;
    }
}

customElements.define('carousel-component', Carousel)