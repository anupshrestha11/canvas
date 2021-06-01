const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
canvas.style.border = "10px solid #fff";
canvas.style.background = "#fff";

const ctx = canvas.getContext("2d");

class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 40;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#22d1ee";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    }
    update() {
        this.draw();
    }
}

let boxes;
function init() {
    boxes = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            boxes.push(new Box(j * 100, i * 40));
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    boxes.forEach((box) => box.update());
}

init();
animate();
