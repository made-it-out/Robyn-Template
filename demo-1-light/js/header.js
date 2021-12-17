document.addEventListener('DOMContentLoaded', init)

function init() {
    const header = document.querySelector('.header');
    const navbar = header.querySelector('.navbar');
    const navLinks = navbar.querySelectorAll('.navbar__link');
    const headerToggle = header.querySelector('.header__toggle');

    // toggle navbar on small screens when hamburger is clicked/focus keydown
    headerToggle.addEventListener('click', toggleNavbar)
    headerToggle.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            toggleNavbar
        }
    })

    function toggleNavbar() {
        navbar.classList.toggle('navbar--shown');
        header.classList.toggle('header--navbar-shown');
        document.body.classList.toggle('body--navbar-shown');
    }

    // Close navbar whenever a link is clicked (for links to different sections)
    navLinks.forEach(link => {
        link.addEventListener('click', closeNavbar);
        link.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                closeNavbar()
            }
        })
    })

    // Remove classes from navbar, header, and body
    function closeNavbar() {
        navbar.classList.remove('navbar--shown');
        header.classList.remove('header--navbar-shown');
        document.body.classList.remove('body--navbar-shown');
    }

    //if resized from small to larger screen - close navbar
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeNavbar();
        }
    });
}