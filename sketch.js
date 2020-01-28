let x = 0.1;
let y = 1.0;
let z = -1.0;

let a = 10;
let b = 28;
let c = 9.0 / 3.0;
let rot_x = 300;
let rot_y = 0;
let sign = 1;
let hu_sign = 1;
let z_pos = 200;
let zoom = 1.59;
let zMin = 1
let zMax = 13
let sensativity = .01
let a_slider;
let b_slider;
let c_slider;

let points = new Array();

function mouseWheel(event) {
  zoom += sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  //uncomment to block page scrolling
  return false;
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    colorMode(HSB);
    a_slider = createSlider(a/2.0, a*2.0, a, a*.01);
    b_slider = createSlider(b/2.0, b*2.0, b, b*.01);
    c_slider = createSlider(c/2.0, c*2.0, c, c*.01);

    a_slider.position(windowWidth-a_slider.width*2, windowHeight/2+50)
    b_slider.position(windowWidth-a_slider.width*2, windowHeight/2+100)
    c_slider.position(windowWidth-a_slider.width*2, windowHeight/2+150)
}

function draw() {
  background(0);
textSize(32);
textFont('Helvetica');
fill(255);
  let dt = 0.007;
  let dx = a_slider.value() * (y - x) * dt;
  let dy = (x * (b_slider.value() - z) - y) * dt;
  let dz = (x * y - c_slider.value() * z) * dt;
  x = x + dx;
  y = y + dy;
  z = z + dz;

  points.unshift(new p5.Vector(x, y, z));
  rot_x += sign * .2;
  rot_y -= sign * .2;
  if(rot_x > 350 || rot_x < 200){
    sign *= -1
  }
  camera(rot_x-windowWidth/6, rot_y, z_pos, 0, 0, 0, 0, 1, 0);
  scale(zoom);
  stroke(255);
  noFill();
  let hu = 0;
  beginShape();

  for (let v of points) {
    stroke(hu, 255, 255);
    point(v.x, v.y, v.z);
    hu += hu_sign*.5;
    if (hu > 255 || hu <0) {
      hu_sign *= -1;
    }
  }

  if (points.length > 2000){
      points.pop();
  }
  endShape();
}
