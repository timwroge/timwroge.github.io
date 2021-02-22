gridsize = 10.0;
grid_limits = 100
inc=0.0;
offset=20.0
slider_noise_val = 10
slider_gran_val = 3
time = 0
function setup() {
    var canvas = createCanvas(windowWidth*0.8, windowHeight*.8, WEBGL);
    canvas.style('z-index', '-1');
    canvas.parent('perlin-noise');
    colorMode(HSB);
    scale(10);
}
function draw() {
  background(0);
  orbitControl();
    ymin = offset + time-grid_limits
    ymax = offset + time + grid_limits

    xmin = offset -grid_limits
    xmax = offset + grid_limits

    for (y = ymin; y < ymax; y+=int( slider_gran_val)) {
        noFill();
        beginShape();
        for (x = xmin; x < xmax; x+=int(slider_gran_val)) {
            z = Math.exp(8*noise(x/slider_noise_val, y/slider_noise_val))
            stroke((ymax - y)/ (ymax-ymin)*255 , 255, 255);
            vertex(( x )*gridsize, ( y - time)*gridsize, z)
        }
        endShape();
    }
    console.log(slider_gran_val)
    time -= 1
}
