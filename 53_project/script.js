const slider = document.querySelector('.slider');
const comments = document.querySelectorAll('.comment');
const prevButton = document.querySelector('.slider_button.prev');
const nextButton = document.querySelector('.slider_button.next');

let currentIndex = 0;

function updateSlider() {
    const offset = -currentIndex * 100; 
    slider.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : comments.length - 1;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < comments.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
});


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = header.querySelector('nav');
    const ul = nav.querySelector('ul');
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('menu-toggle');
    toggleButton.textContent = '☰'; 

    const checkScreenWidth = () => {
        if (window.innerWidth < 800) {
            if (!header.contains(toggleButton)) {
                header.appendChild(toggleButton);
                nav.style.display = 'none'; 
            }
        } else {
            if (header.contains(toggleButton)) {
                header.removeChild(toggleButton);
                nav.style.display = ''; 
            }
        }
    };

    toggleButton.addEventListener('click', () => {
        const isMenuVisible = nav.style.display === 'block';
        nav.style.display = isMenuVisible ? 'none' : 'block';
    });

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
});
