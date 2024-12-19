document.querySelectorAll(".tools_row button").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tools_row button, .vector_all path").forEach((el) => {
            el.classList.remove("active");
        });

        button.classList.add("active");
        const correspondingVector = document.querySelector(`.${button.classList[0]}`);
        if (correspondingVector) {
            correspondingVector.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".reviews__slider");
    const cards = document.querySelectorAll(".reviews__card");
    const prevButton = document.querySelector(".buttons button:first-child");
    const nextButton = document.querySelector(".buttons button:last-child");

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 24;

    const updateSliderPosition = () => {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    prevButton.addEventListener("click", () => {
        if (currentIndex === 0) {
            currentIndex = cards.length - 1;
        } else {
            currentIndex--;
        }
        updateSliderPosition();
    });
    nextButton.addEventListener("click", () => {
        if (currentIndex === cards.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSliderPosition();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const customSelects = document.querySelectorAll(".custom-select");

    customSelects.forEach(customSelect => {
        const selectButton = customSelect.querySelector(".select-button");
        const selectOptions = customSelect.querySelector(".select-options");
        const optionsList = customSelect.querySelectorAll(".select-options li");

        selectButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            selectOptions.style.display =
                selectOptions.style.display === "block" ? "none" : "block";
        });

        optionsList.forEach(option => {
            option.addEventListener("click", () => {
                const selectedValue = option.dataset.value;
                const selectedText = option.textContent.trim();
                const selectedImg = option.querySelector("img");

                selectButton.innerHTML = selectedImg
                    ? `<img src="${selectedImg.src}" alt="${selectedText} Icon" /> ${selectedText}`
                    : `${selectedText}`;

                selectOptions.style.display = "none";
            });
        });
    });

    document.addEventListener("click", (e) => {
        customSelects.forEach(customSelect => {
            const selectOptions = customSelect.querySelector(".select-options");
            if (!customSelect.contains(e.target)) {
                selectOptions.style.display = "none";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const menuAndButtons = document.querySelector(".menu_and_buttons");

    burgerMenu.addEventListener("click", () => {
        menuAndButtons.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!menuAndButtons.contains(e.target) && !burgerMenu.contains(e.target)) {
            menuAndButtons.classList.remove("active");
        }
    });
});
