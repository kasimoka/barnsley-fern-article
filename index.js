const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
const gridStep = 75;
const colors = [
    'green',
    'green',
    'red',
    'blue',
    'white',
    'red'
];

drawGrids(canvas, gridStep);
let alpha = 2;
let beta = 80;
let k = 0.12;
let k1 = 0.3;
let settings = config(alpha, beta, k, k1);

function draw(ctx, x1, y1, x2, y2, num) {
    //if (num == 3 ) return;
    if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) > 1) {
        let x3 = (x2 - x1) * settings.A - (y2 - y1) * settings.B + x1;
        let y3 = (x2 - x1) * settings.B + (y2 - y1) * settings.A + y1;
        let x4 = x1 * settings.C + x3 * settings.D;
        let y4 = y1 * settings.C + y3 * settings.D;
        let x5 = x4 * settings.E + x3 * settings.F;
        let y5 = y4 * settings.E + y3 * settings.F;
        let x6 = (x5 - x4) * settings.G - (y5 - y4) * settings.H + x4;
        let y6 = (x5 - x4) * settings.H + (y5 - y4) * settings.G + y4;
        let x7 = (x5 - x4) * settings.G + (y5 - y4) * settings.H + x4;
        let y7 = -(x5 - x4) * settings.H + (y5 - y4) * settings.G + y4;
        ctx.beginPath();
        ctx.strokeStyle = colors[num] || 'green';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x4, y4);
        ctx.stroke();
        draw(ctx, x4, y4, x3, y3, num);
        draw(ctx, x4, y4, x6, y6, num + 1);
        draw(ctx, x4, y4, x7, y7, num + 1);
    }
};

function config(alpha, beta, k, k1) {
    return {
        A: Math.cos(alpha * Math.PI / 180),
        B: Math.sin(alpha * Math.PI / 180),
        C: 1 - k,
        D: k,
        E: 1 - k1,
        F: k1,
        G: Math.cos(beta * Math.PI / 180),
        H: Math.sin(beta * Math.PI / 180)
    };
};

draw(ctx, canvas.width - 100, canvas.height / 2 + 100, 50, 200, 0);

function drawGrids(canvas, step) {
    let ctx = canvas.getContext('2d');
    let maxX = canvas.width;
    let maxY = canvas.height;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    for (let startX = 0; startX < maxX; startX += step) {
        ctx.moveTo(startX, 0);
        ctx.lineTo(startX, maxY);
    }
    for (let startY = 0; startY < maxY; startY += step) {
        ctx.moveTo(0, startY);
        ctx.lineTo(maxX, startY);
    }
    ctx.stroke();
};