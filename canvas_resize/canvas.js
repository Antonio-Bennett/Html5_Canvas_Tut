/*
    INTRO TO WORKING WITH CANVAS
*/

const canvas = document.querySelector("canvas");

//Setting width to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Context provides functions to draw on canvas
let context = canvas.getContext("2d");
console.log(canvas.width, canvas.height); //This just makes it easier to estimate coordinates

/*
    DRAWING WITH CANVAS
*/

//You can draw and styles rectangles in this fashion. Style is applied before calling the appropriate context function
//In this case it is fillRect. So to style multiple you have to set fillStyle before each fillRect function call
// context.fillStyle = "rgba(0, 0, 255, 0.5)";
// context.fillRect(canvas.width / 2, canvas.height / 2, 100, 100);

//Styling is nearly the same logic - strokeStyle is applied to the next stroke so to style individual lines
//You have to call beginPath and moveTo the last point of the previous stroke
//To draw lines however you beginPath to declare that paths will be drawn then use moveTo
//to set the starting position. Subsequent calls using lineTo are from the last known position
// context.beginPath();
// context.moveTo(50, 300);
// context.lineTo(300, 100);
// // context.strokeStyle = "black";
// // context.stroke();
// // context.beginPath();
// // context.moveTo(300, 100);
// context.lineTo(550, 300);
// context.lineTo(50, 300);
// context.strokeStyle = "#f5a";
// context.stroke();

//ARC behaves like a mix of fillRect and lineTo so far. It takes a start position like fillRect so no need for moveTo
//But the styling is similar to lineTo because of stroke. You do have to specify beginPath to seperate new shape
//Probably is a fill for ARCs though
// context.beginPath();
// context.arc(300, 200, 30, 2 * Math.PI, false);
// context.strokeStyle = "blue";
// context.stroke();

const get_random = (num, negatives = false) => {
  return negatives ? (Math.random() - 0.5) * num : Math.random() * num;
};

// //drawing multiple shapes using for loops
// const drawShapes = (amount) => {
//   for (let i = 0; i < amount / 3; i++) {
//     //random_colour is an hsl value so that I can keep the brightness and saturation consistent while just changing the value
//     //which corresponds to RGB values in a 360 degree wheel. R - 0, G - 120, B - 240
//     //value is generated using the rand method plus adding the Golden Rule Ratio
//     //This method is documented here --> https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
//     //I will keep the colour generated for a set of shapes the same so we can 'see' which loop iteration drew those shapes
//     const random_colour = `hsl(${Math.floor(
//       get_random(360) + 0.618033988749895
//     )}, 100%, 50%)`;

//     let x = get_random(canvas.width * 0.95);
//     let y = get_random(canvas.height * 0.95);
//     context.beginPath();
//     context.arc(x, y, 30, 2 * Math.PI, false);
//     context.strokeStyle = random_colour;
//     context.stroke();

//     x = get_random(canvas.width * 0.95);
//     y = get_random(canvas.height * 0.95);
//     context.fillStyle = random_colour;
//     context.fillRect(x, y, 100, 100);

//     x = get_random(canvas.width * 0.95);
//     y = get_random(canvas.height * 0.95);
//     context.beginPath();
//     context.moveTo(x, y); //This is the pivot point/origin of triangle
//     context.lineTo(x + 50, y + 50); //This says go 50 to the right of origin also note [+y] is down while [-y] is up
//     context.lineTo(x - 50, y + 50); //Draw a line to the opposite side 50 to left of origin but same y - this is bottom of triangle
//     context.lineTo(x, y); // Connect it all by drawing back to origin from last point
//     context.stroke();
//   }
// };

// drawShapes(12);

/*
    ANIMATING CANVAS
*/

const Circle = (x, y) => {
  return {
    x,
    y,
    draw() {
      context.beginPath();
      context.arc(x, y, radius, 2 * Math.PI, false);
      context.strokeStyle = "blue";
      context.stroke();
    },
    update() {
      if (x + radius > canvas.width || x - radius < 0) dx = -dx;
      if (y + radius > canvas.height || y - radius < 0) dy = -dy;

      x += dx;
      y += dy;
    },
  };
};

const circle = Circle(200, 200);

let x = get_random(canvas.width); //starting x position
let y = get_random(canvas.height); //starting y position
let dx = get_random(8, true); //The 'speed' this is the amount added or subtracted from x per frame
let dy = get_random(8, true); //The 'speed' this is the amount added or subtracted from y per frame
let radius = 30; //Self explanatory but it's the radius of the circle

const animate = () => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  circle.draw();

  context.beginPath();
  context.arc(x, y, radius, 2 * Math.PI, false);
  context.strokeStyle = "blue";
  context.stroke();

  circle.update();
};

animate();
