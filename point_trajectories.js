function linspace(min, max, number){
    output = [];
    output.push(min)
    delta   = (max-min)/(number-1)
    current = min
    let i = 1;
    while (output.length < number){
        output.push(min + delta*i);
        i +=1;
    }
    return output
}
x_points = 10
y_points = 10
z_points = 10
dim_max = 9

let xs = linspace(-dim_max, dim_max, x_points)
let ys = linspace(-dim_max, dim_max, y_points)
let zs = linspace(-dim_max, dim_max, z_points)
let hu_sign = 1;
let z_pos = 2;
let zoom = 6;
let zMin = -10
let zMax = 10
let dt = 0.001;

// makes a repeat vector of size
function initialize_particles(){
    let particles = new Array(x_points);
    let depth = 3
    for (let i= 0; i < x_points; i++){
        particles[i] = new Array(y_points);
        for (let j=0; j < y_points; j++){
            particles[i][j] = new Array(z_points);
            for (let k=0; k < z_points; k++){
                particles[i][j][k] = []
            }
        }
    }
    for (let i= 0; i < x_points; i++){
        for (let j=0; j < y_points; j++){
            for (let k=0; k < z_points; k++){
                point = [xs[i], ys[j], zs[k]]
                particles[i][j][k] = point
            }
        }
    }
    return particles
}

let particles = initialize_particles()
console.log(particles)

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    colorMode(HSB);

}

function dynamical_system(x, y, z, dt){
    _dx = 10.0 * (y - x) * dt;
    _dy = x * (28.0 - z)* dt;
    _dz = (x*y - 8.0/3*z)* dt
    return [_dx, _dy, _dz]
}

function draw() {
  background(0);
    textSize(32);
    textFont('Helvetica');
    fill(255);
    orbitControl();
    let points = new Array()

    for (let i= 0; i<xs.length; i++){
        for (let j= 0; j<ys.length; j++){
            for (let k= 0; k<zs.length; k++){
                let [dx, dy, dz] = dynamical_system(particles[i][j][k][0], particles[i][j][k][1],particles[i][j][k][2],  dt);
                particles[i][j][k][0]= particles[i][j][k][0] + dx;
                particles[i][j][k][1] = particles[i][j][k][1] + dy;
                particles[i][j][k][2] = particles[i][j][k][2] + dz;
                points.push(new p5.Vector(particles[i][j][k][0],particles[i][j][k][1],particles[i][j][k][2]  ));
            }
        }
    }

  scale(zoom);
  noFill();
    // draw axes

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

    // draw all the points
  for (let v of points) {
    stroke(hu, 255, 255);
    point(v.x, v.y, v.z);
    hu += hu_sign*.5;
    if (hu > 255 || hu <0) {
      hu_sign *= -1;
    }
  }
}
