function setup() {
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    colorMode(HSB);
}

function polarToCartesian(radius, theta, phi){
    x = radius*Math.sin(theta)*Math.cos(phi)
    y = radius*Math.sin(theta)*Math.sin(phi)
    z = radius*Math.cos(theta);
    return [x, y, z]
}
// rotates a point [x, y, z] about a point [cx, cy, cz] by the amount theta from the z axis, and phi about the x axis


function rotatePointAboutPoint([x, y, z], [cx, cy, cz], [theta, phi]){
    // translate to be centered about [cx, cy, cz]
    tr_x = x-cx
    tr_y = y-cy
    tr_z = z-cz
    // rotate about [cx, cy, cz]
    return [cx+tr_x*Math.sin(theta)*Math.cos(phi), cy+tr_y*Math.sin(theta)*Math.sin(phi), cz+tr_z*Math.cos(theta)]
}
let i = 0
let spheres = 10;
let radius = 300;
let points = []
for (let k = 0; k<7000; k ++){
    let [x, y, z] = polarToCartesian(200, 3.14+i, -1.15+i)
    let [new_x, new_y, new_z]=rotatePointAboutPoint([x, y, z], [x+1, y+1, y+1], [2.1+8*i, 3.1+8*i])
    points.push(new p5.Vector(new_x, new_y, new_z))
    i+=.001
}


function draw() {
  background(0);
    orbitControl();
    stroke(255);
    noFill();
    //make first
    for (let j=0;j<points.length;j++ ){
        let p = points[j];
        stroke(200, 255, 255);
        point(p.x, p.y, p.z)
    }
}

