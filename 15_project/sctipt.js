document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('.section6 article');
    const leftButton = document.querySelector('.yellow_button_right');
    const rightButton = document.querySelector('.yellow_button');
    let selectedIndex = 0;

    function updateArticles() {
        articles.forEach((article, index) => {
            article.classList.toggle('selected', index === selectedIndex);
        });
    }

    rightButton.addEventListener('click', function() {
        if (selectedIndex < articles.length - 1) {
            selectedIndex++;
            updateArticles();
        }
    });

    leftButton.addEventListener('click', function() {
        if (selectedIndex > 0) {
            selectedIndex--;
            updateArticles();
        }
    });

    // Initialize the first article as selected
    updateArticles();
});
