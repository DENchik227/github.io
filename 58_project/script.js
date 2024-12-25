document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(".dropdown__button");
        const menu = dropdown.querySelector(".dropdown__menu");

        button.addEventListener("click", (event) => {
            event.stopPropagation();
            dropdown.classList.toggle("active");
        });

    });
});

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const menu = document.querySelector(".menu");
    const account_buttons = document.querySelector(".account_buttons");

    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active");
        menu.classList.remove("active", "reverse");
        account_buttons.classList.remove("active", "reverse");

        setTimeout(() => {
            if (burgerMenu.classList.contains("active")) {
                menu.classList.add("active");
                account_buttons.classList.add("active");
            } else {
                menu.classList.add("reverse");
                account_buttons.classList.add("reverse");
            }
        }, 0);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-content]").forEach(title => {
        title.addEventListener("click", () => {
            document.querySelectorAll(".active").forEach(activeElement => {
                activeElement.classList.remove("active");
            });

            title.classList.add("active");
            const content = document.getElementById(title.dataset.content);
            if (content) content.classList.add("active");
        });
    });

    const dropdownButton = document.querySelector('.dropdown__button');
    const dropdownMenu = document.querySelector('.dropdown__menu');

    if (dropdownButton && dropdownMenu) {
        dropdownButton.addEventListener("click", () => {
            dropdownMenu.style.display =
                dropdownMenu.style.display === "block" ? "none" : "block";
        });
    }
});

