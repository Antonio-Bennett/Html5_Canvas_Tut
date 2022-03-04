const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");

context.fillRect(canvas.width / 2, canvas.height / 2, 100, 100);

console.log(canvas);
