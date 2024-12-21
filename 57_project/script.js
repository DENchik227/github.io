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