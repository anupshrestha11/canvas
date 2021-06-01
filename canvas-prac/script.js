const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(window.innerHeight);
const body = document.createElement("body");
console.log(body.innerHeight);

const c = canvas.getContext("2d");

// * c.fillRect(x, y, width, height);
// c.fillStyle = "hsl(25, 50%, 50%)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "hsl(235, 50%, 50%)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "hsl(125, 50%, 50%)";
// c.fillRect(250, 200, 100, 100);

//*Line
c.beginPath();

// *c.moveTo(x, y) same for lineTo function
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 200);
// c.strokeStyle = "hsl(140, 50%, 50%)";
// c.stroke();

// *arc / circle lines
//* c.arc(x: int, y: int, r: int, startAngle : Float, endAngle: Float, anticlockwise: boolean(true/false));
// let x = 0;
// let y = 0;
// for (let i = 0; i < 10; i++) {
//     x = Math.random() * window.innerWidth;
//     y = Math.random() * window.innerHeight;
//     console.log(y);
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = `hsl(${255 * Math.random()}, 50%, 50%)`;
//     c.stroke();
// }

const mouse = {
    x: undefined,
    y: undefined,
};

let maxRadius = 40;
// let minRadius = 5;

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

canvas.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

canvas.addEventListener("click", (e) => {
    addNewCircle();
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius, fillstyle) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 50;
    this.fillStyle = fillstyle;
    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = `hsl(${255 * Math.random()}, 50%, 50%)`;
        c.stroke();
        c.fillStyle = this.fillStyle;
        c.fill();
    };
    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        // * interactivity
        if (
            mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50
        ) {
            if (this.radius < this.maxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 2;
            this.radius = Math.abs(this.radius);
        }
    };
}

let radius = 10;
let circleArray = [];
let colorArray = ["#292F36", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D"];

function init() {
    circleArray = [];
    for (let i = 0; i < 700; i++) {
        let x = Math.random() * (innerWidth - radius * 2);
        let y = Math.random() * (innerHeight - radius * 2);
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        circleArray.push(
            new Circle(
                x,
                y,
                dx,
                dy,
                radius * Math.abs(Math.random()),
                colorArray[Math.floor(Math.random() * colorArray.length)]
            )
        );
    }
}

function addNewCircle() {
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    circleArray.push(
        new Circle(
            mouse.x + Math.random() * 100,
            mouse.y + Math.random() + 100,
            dx,
            dy,
            radius * Math.abs(Math.random()),
            colorArray[Math.floor(Math.random() * colorArray.length)]
        )
    );
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach((circle) => {
        circle.draw();
        circle.update();
    });
}

init();
animate();
