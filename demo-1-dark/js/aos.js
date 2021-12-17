// Animations on scroll

document.addEventListener('DOMContentLoaded', init)

function init(){
    // Options for animations on scroll
    const animateOptions = {
        threshold: 0.5
    }

    // Create new intersection observer
    const animateOnScroll = new IntersectionObserver(function (entries, animateOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add 'animate' class to intersecting entries
                entry.target.classList.add('animate');
                // Stop observing entries once they intersect
                animateOnScroll.unobserve(entry.target)
            }
        })
    }, animateOptions)

    const aos = Array.from(document.querySelectorAll('.aos'));

    aos.forEach(element => animateOnScroll.observe(element))
}