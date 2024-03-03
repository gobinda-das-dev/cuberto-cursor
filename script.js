const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const rectWidth = 100;
const rectHeight = 50;
let initialAngle = 0;
let lastMouseX = canvas.width / 2;
let lastMouseY = canvas.height / 2;

function drawRectangle(x, y, angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
    ctx.restore();
}

function update(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    let angle = Math.atan2(dy, dx);

    if (dx === 0 && dy === 0) {
        angle = initialAngle;
    } else {
        initialAngle = angle;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }

    drawRectangle(mouseX, mouseY, angle);

    requestAnimationFrame(function () {
        update(event);
    });
}

canvas.addEventListener('mousemove', update);

update({ clientX: canvas.width / 2, clientY: canvas.height / 2 }); // Initialize with center mouse position
