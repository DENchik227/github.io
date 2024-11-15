function validateLengthcvc(input) {
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
    }
    if (input.value > 999) input.value = 999;
    if (input.value < 0) input.value = 0;
};

function validateLengthyear(input) {
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
    if (input.value > 99) input.value = 99;
    if (input.value < 24) input.value = 24;
}

function validateLengthmonth(input) {
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
    if (input.value > 12) input.value = 12;
    if (input.value < 1) input.value = 1;
}

function validateLengthnumer(input) {
    if (input.value.length > 16) {
        input.value = input.value.slice(0, 16);
    }
}