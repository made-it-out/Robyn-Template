class AccordionComponent extends HTMLElement {
    constructor(){
        super();
        // add class 'ready' for js-enabled styles
        this.classList.add('ready');

        this.multiple = this.dataset.multiple        

        this.items = this.querySelectorAll('.accordion__item');

        this.activeItem = null;
        this.activeItems = [];
        this.padding = 24;

        this.items.forEach((item, index) => {
            const heading = item.querySelector('.accordion__heading');
            const content = item.querySelector('.accordion__content');
    
            // Set unique ids for each item and content
            const itemId = `accordion-item-${this.id}-${index}`;
            const itemContentId = `accordion-content-${this.id}-${index}`;
    
            // Keyboard accessibility
            item.id = itemId;
            item.setAttribute('tabIndex', '0');
            item.setAttribute('aria-controls', itemContentId);
    
            content.id = itemContentId;
            content.setAttribute('aria-labelledby', itemId);
            content.setAttribute('role', 'region');
    
            // reset
            this.closeItem(item)

            // make open by default
            if(item.dataset.openByDefault == "true"){
                this.openItem(item);

                if(this.dataset.multiple == "true"){
                    this.activeItems.push(item)
                }
                else{
                    this.activeItem = item
                }
            }
    
            heading.addEventListener('click', () => this.toggleItem(item, index))
    
            // If item is focused and 'Enter/Return' or 'Space' is pressed
            item.addEventListener('keydown', (e) => {
                if (e.keyCode === 13 || e.keyCode === 32) {
                    this.toggleItem(item, index)
                }
            })
        })
    }

    closeItem(item) {
        if (item !== null) {
            const content = item.querySelector('.accordion__content');

            item.setAttribute('aria-expanded', 'false');
            item.classList.remove('active');
            content.style.maxHeight = '0px';
            content.style.padding = '0px';
        }
    }
    openItem(item) {
        const content = item.querySelector('.accordion__content');

        item.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
        // use scrollHeight in order to transition the max-height (unable to with 'auto')
        content.style.maxHeight = `${content.scrollHeight + (this.padding * 10)}px`;
        content.style.padding = `${this.padding}px`;
    }

    toggleItem(item) {
        // if multiple items can be open
        if(this.multiple === "true"){
            // if item is already active
            if(this.activeItems.includes(item)){
                // close item
                this.closeItem(item)
                // remove from array
                this.activeItems = this.activeItems.filter(activeItem => activeItem !== item)
            }
            // else add item to array
            else{
                this.openItem(item)
                this.activeItems.push(item)
            }
        }
        else{
            if (item !== this.activeItem) {
                // close active
                this.closeItem(this.activeItem);
                // make this active
                this.openItem(item);
    
                this.activeItem = item;
            }
            else {
                // close this item
                this.closeItem(item);
    
                this.activeItem = null;
            }
        }
        
    }
}

customElements.define('accordion-component', AccordionComponent)