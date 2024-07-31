document.querySelector('.pinterest_wrapper').addEventListener('mouseover', function () {
    document.querySelector('.twitter').classList.add('active');
});

document.querySelector('.pinterest_wrapper').addEventListener('mouseout', function () {
    document.querySelector('.twitter').classList.remove('active');
});
document.addEventListener("DOMContentLoaded", function() {
    const review = document.querySelector('.review');
    const leftButton = document.querySelector('.clients button:first-of-type');
    const rightButton = document.querySelector('.clients button:last-of-type');
    let movedLeft = true;
    let movedRight = false;  // Initial state since it's already at max right

    leftButton.addEventListener('click', () => {
        if (!movedLeft) {
            review.style.transform = 'translateX(0px)';
            movedLeft = true;
            movedRight = false; // Allow moving right again
        }
    });

    rightButton.addEventListener('click', () => {
        if (!movedRight) {
            review.style.transform = 'translateX(-331px)';
            movedRight = true;
            movedLeft = false; // Allow moving left again
        }
    });
});
