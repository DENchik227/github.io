let ToprotateButton = document.getElementById('top-rotate-button');
let DownrotateButton = document.getElementById('down-rotate-button');
let RightrotateButton = document.getElementById('right-rotate-button');
let LeftrotateButton = document.getElementById('left-rotate-button');

let frontFace = document.querySelector('.front');
let backFace = document.querySelector('.back');
let leftFace = document.querySelector('.left');
let rightFace = document.querySelector('.right');
let topFace = document.querySelector('.top');
let bottomFace = document.querySelector('.bottom');

let rotateInterval;

// Инициализация углов
let angleFrontX = 0;
let angleBackX = 0;
let angleLeftX = 0;
let angleRightX = 0;
let angleTopX = -90;
let angleBottomX = 90;

let angleFrontY = 0;
let angleBackY = 180;
let angleLeftY = -90;
let angleRightY = 90;
let angleTopY = 0;
let angleBottomY = 0;

let angleFront = 0;
let angleBack = 0;
let angleLeft = 0;
let angleRight = 0;
let angleTop = 0;
let angleBottom = 0;

// ↑ .front rotateX(+)
// ↑ .back rotateX(-)
// ↑ .left rotate(-)
// ↑ .right rotate(+)
// ↑ .top rotateX(+)
// ↑ .bottom rotateX(+)
// Функция для вращения куба
function rotateCube(direction) {
    rotateInterval = setInterval(function () {
        if (direction === 'up') {
            angleFrontX += 2;
            angleBackX += 2;
            angleTopX += 2;
            angleBottomX += 2;
            // angleLeft -= 2;
            // angleLeft -= 2;
            angleLeft += angleLeftY / 90 * 2;
            angleLeftX += (1 + angleLeftY / 90) * 2;
            // angleLeftY -= Math.cos(angleLeftY * (Math.PI / 180)) - Math.cos(angleLeftY * (Math.PI / 180));

            // console.log(Math.cos(angleLeftY * (Math.PI / 180)));            
            angleRight += Math.sin(angleRightY * (Math.PI / 180)) * 2;
            angleRightX -= Math.cos(angleRightY * (Math.PI / 180)) * 2;
        } else if (direction === 'down') {
            angleFrontX -= 2;
            angleBackX -= 2;
            angleTopX -= 2;
            angleBottomX -= 2;
            angleLeft -= Math.sin(angleLeftY * (Math.PI / 180)) * 2;
            angleLeftX -= Math.cos(angleLeftY * (Math.PI / 180)) * 2;
            angleRight -= Math.sin(angleRightY * (Math.PI / 180)) * 2;
            angleRightX += Math.cos(angleRightY * (Math.PI / 180)) * 2;
        } else if (direction === 'right') {
            
            angleFrontY += 2;
            angleBackY += 2;
            angleLeftY += 2;
            angleRightY += 2;
            angleTop += 2;
            angleBottom -= 2;
        } else if (direction === 'left') {
            
            angleFrontY -= 2;
            angleBackY -= 2;
            angleLeftY -= 2;
            angleRightY -= 2;
            angleTop -= 2;
            angleBottom += 2;
        }

        // Применение трансформаций
        frontFace.style.transform = `rotateX(${angleFrontX}deg) rotateY(${angleFrontY}deg) rotate(${angleFront}deg) translateZ(50px)`;
        backFace.style.transform = `rotateX(${angleBackX}deg) rotateY(${angleBackY}deg) rotate(${angleBack}deg) translateZ(50px)`;
        leftFace.style.transform = `rotateX(${angleLeftX}deg) rotateY(${angleLeftY}deg) rotate(${angleLeft}deg) translateZ(50px)`;
        rightFace.style.transform = `rotateX(${angleRightX}deg) rotateY(${angleRightY}deg) rotate(${angleRight}deg) translateZ(50px)`;
        topFace.style.transform = `rotateX(${angleTopX}deg) rotateY(${angleTopY}deg) rotate(${angleTop}deg) translateZ(-50px)`;
        bottomFace.style.transform = `rotateX(${angleBottomX}deg) rotateY(${angleBottomY}deg) rotate(${angleBottom}deg) translateZ(-50px)`;
    }, 10);
}

// Привязка к кнопкам
ToprotateButton.addEventListener('mousedown', function () {
    rotateCube('up');
});

DownrotateButton.addEventListener('mousedown', function () {
    rotateCube('down');
});

RightrotateButton.addEventListener('mousedown', function () {
    rotateCube('right');
});

LeftrotateButton.addEventListener('mousedown', function () {
    rotateCube('left');
});

// Остановка вращения
function stopRotation() {
    clearInterval(rotateInterval);
}

ToprotateButton.addEventListener('mouseup', stopRotation);
ToprotateButton.addEventListener('mouseleave', stopRotation);

DownrotateButton.addEventListener('mouseup', stopRotation);
DownrotateButton.addEventListener('mouseleave', stopRotation);

RightrotateButton.addEventListener('mouseup', stopRotation);
RightrotateButton.addEventListener('mouseleave', stopRotation);

LeftrotateButton.addEventListener('mouseup', stopRotation);
LeftrotateButton.addEventListener('mouseleave', stopRotation);



// ↑ .front rotateX(+)
// ↑ .back rotateX(-)
// ↑ .left rotate(-)
// ↑ .right rotate(+)
// ↑ .top rotateX(+)
// ↑ .bottom rotateX(+)