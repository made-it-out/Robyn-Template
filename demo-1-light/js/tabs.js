// Tabs used for Experience section

class TabsComponent extends HTMLElement {
    constructor() {
        super();

        this.headings = this.querySelectorAll('.tabs__heading');
        this.contents = this.querySelectorAll('.tabs__content');

        this.activeIndex = null;

        this.headings.forEach((heading, index) => {
            // Set unique ids for each heading
            const headingId = `tabs-heading-${this.id}-${index}`;

            // Keyboard accessibility
            heading.id = headingId;
            heading.setAttribute('tabIndex', '0');
            heading.setAttribute('aria-controls', headingId.replace('heading', 'content'));

            // Reset/close all tabs initially
            this.closeTab(index)

            // Make first tab open by default
            this.openTab(0);
            this.activeIndex = 0;

            heading.addEventListener('click', () => this.toggleTab(index))

            // If heading is focused and 'Enter/Return' or 'Space' is pressed
            heading.addEventListener('keydown', (e) => {
                if (e.keyCode === 13 || e.keyCode === 32) {
                    this.toggleTab(index)
                }
            })
        })

        this.contents.forEach((content, index) => {
            // Set unique ids for each content
            const contentId = `tabs-content-${this.id}-${index}`;

            content.id = contentId;
            content.setAttribute('aria-labelledby', contentId.replace('content', 'heading'));
            content.setAttribute('role', 'region');
        })
    }

    closeTab(index) {
        if (index !== null) {
            this.contents[index].setAttribute('aria-expanded', 'false');
            this.headings[index].classList.remove('tabs__heading--active');
            this.contents[index].classList.remove('tabs__content--active');
        }
    }
    openTab(index) {
        this.contents[index].setAttribute('aria-expanded', 'true');
        this.headings[index].classList.add('tabs__heading--active');
        this.contents[index].classList.add('tabs__content--active');
    }

    toggleTab(index) {
        if (index !== this.activeIndex) {
            // close active
            this.closeTab(this.activeIndex);
            // make this active
            this.openTab(index);

            this.activeIndex = index;
        }
    }
}

customElements.define('tabs-component', TabsComponent)