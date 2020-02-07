let xs = [2.1, 3, 1];
let ys = [-.1, -3, 1];
let zs = [.1, 3, -1];
let hu_sign = 1;
let z_pos = 2;
let zoom = 100;
let zMin = -10
let zMax = 10

let points = new Array();

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    colorMode(HSB);
}

function dynamical_system(x, y, z, dt){
    _dx = (1 - x) * x* dt;
    _dy = (x /2 - y)* dt;
    _dz = (x - z - y)*z* dt
    return [_dx, _dy, _dz]
}
function draw_axis(){

}

function draw() {
  background(0);
    textSize(32);
    textFont('Helvetica');
    fill(255);
    orbitControl();
    let dt = 0.07;
    for (let i= 0; i<xs.length; i++){
        let [dx, dy, dz] = dynamical_system(xs[i], ys[i], zs[i], dt);
        xs[i]= xs[i] + dx;
        ys[i] = ys[i] + dy;
        zs[i] = zs[i] + dz;
        points.unshift(new p5.Vector(xs[i], ys[i], zs[i]));
    }

  scale(zoom);
  noFill();
  let hu = 0;
  stroke(hu, 255, 255);
  beginShape();
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 1.0, 0.0);
  endShape();
  hu = 100;
  stroke(hu, 255, 255);
  beginShape();
    vertex(0.0, 0.0, 0.0);
    vertex(1.0, 0.0, 0.0);
  endShape();
  hu = 200;
  stroke(hu, 255, 255);
  beginShape();
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 0.0, 1.0);
  endShape();

  for (let v of points) {
    stroke(hu, 255, 255);
    point(v.x, v.y, v.z);
    hu += hu_sign*.5;
    if (hu > 255 || hu <0) {
      hu_sign *= -1;
    }
  }


  while (points.length > 1000){
      points.pop();
  }
}

