// Card Deck used for About images

class CardDeck extends HTMLElement {
    constructor() {
        super();

        this.container = this.querySelector('.card-deck__container');
        this.cards = Array.from(this.querySelectorAll('.card-deck__card'));
        this.previous = this.querySelector('button[name="previous"]');
        this.next = this.querySelector('button[name="next"]');

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

        // // Change slide on previous button click/keydown
        this.previous.addEventListener('click', (e) => this.decrement())
        this.previous.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.decrement
            }
        })

    }
    increment() {
        this.container.classList.remove('starting-position');
        this.container.classList.remove('bottom-to-top');
        this.container.classList.add('top-to-bottom');
        // Get current card positions
        let topCard = this.querySelector('.card-deck__card--top');
        let nextCard = this.querySelector('.card-deck__card--next');
        let bottomCard = this.querySelector('.card-deck__card--bottom');

        // Change classes based on new positions
        bottomCard.classList.remove('card-deck__card--bottom');

        topCard.classList.remove('card-deck__card--top');
        topCard.classList.add('card-deck__card--bottom');

        nextCard.classList.remove('card-deck__card--next');
        nextCard.classList.add('card-deck__card--top');

        // If there is nextCard is the last element in the deck, give the class to the first element in the deck (cards[0])
        if(nextCard.nextElementSibling !== null){
            nextCard.nextElementSibling.classList.add('card-deck__card--next');
        } else{
            this.cards[0].classList.add('card-deck__card--next')
        }
    }

    decrement() {
        this.container.classList.remove('starting-position');
        this.container.classList.remove('top-to-bottom');
        this.container.classList.add('bottom-to-top');
        // Get current card positions
        let topCard = this.querySelector('.card-deck__card--top');
        let nextCard = this.querySelector('.card-deck__card--next');
        let bottomCard = this.querySelector('.card-deck__card--bottom');
        
        // Change classes based on new positions
        bottomCard.classList.remove('card-deck__card--bottom');
        bottomCard.classList.add('card-deck__card--top');

        topCard.classList.remove('card-deck__card--top');
        topCard.classList.add('card-deck__card--next');

        nextCard.classList.remove('card-deck__card--next');

        // If the bottomCard is the first element in the deck, give the class to the last element in the deck (cards[cards.length - 1])
        if(bottomCard.previousElementSibling !== null){
            bottomCard.previousElementSibling.classList.add('card-deck__card--bottom');
        } else{
            this.cards[this.cards.length -1].classList.add('card-deck__card--bottom')
        }
    }
}

customElements.define('card-deck', CardDeck)