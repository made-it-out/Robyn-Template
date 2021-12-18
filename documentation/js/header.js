document.addEventListener('DOMContentLoaded', init)

function init() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar__link');
    const headerToggle = document.querySelector('.header__toggle');

    // toggle navbar on small screens when hamburger is clicked/focus keydown
    headerToggle.addEventListener('click', toggleNavbar)
    headerToggle.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            toggleNavbar
        }
    })

    function toggleNavbar() {
        navbar.classList.toggle('navbar--shown');
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

    // Remove class from navbar
    function closeNavbar() {
        navbar.classList.remove('navbar--shown');
    }

    //if resized from small to larger screen - close navbar
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeNavbar();
        }
    });
}