gridsize = 1.0;
grid_limits = 1.0
time = 0
scale_=400

increment=10

iteration = 1
iteration = 0
max_iteration = 300
direction=1

zoom_factor = 0.2
function setup() {
    var canvas = createCanvas(windowWidth*0.8, windowHeight*.8, WEBGL);
    canvas.style('z-index', '-1');
    canvas.parent('mandelbrot-set');
    colorMode(HSB);
    scale(10)
}

function square_complex(x,y){
    real = x*x  - y*y
    complex  = 2*x*y
    return [real, complex]
}


// @brief: iterates the mandelbrot function for
// complex number with real component x and complex
// component y
function mandelbrot(x, y, c_r,c_c){
    let iteration=0
    while (iteration<max_iteration ){
        [ z_squared_real, z_squared_complex ] = square_complex(x, y)
        if(( x*x + y*y)>4){
            return iteration
        }
        x = z_squared_real + c_r
        y = z_squared_complex + c_c
        iteration+=1
    }
    return max_iteration
}

function draw() {
    background(0);
  orbitControl();

    x_c = -1.46
    y_c = 0
    zoom = Math.pow( float( 1-zoom_factor), iteration)

    ymin = -grid_limits
    ymax = grid_limits

    xmin =  - grid_limits
    xmax = grid_limits
    console.log(iteration)

    for (y = ymin*scale_; y < ymax*scale_; y+=increment) {
        for (x = xmin*scale_; x < xmax*scale_; x+=increment) {
            norm = mandelbrot(0, 0, float(x)/float(scale_)*zoom+ x_c, float( y)/float(scale_)*zoom+ y_c)
            if(norm>1) {
                stroke(int(min(255,  (norm*2)%255)), 255, 255);
            }else{
                stroke(0, 0, 0);
            }
            point( x , y , int(norm) )
        }
    }

    iteration += 1*direction
    if(iteration==0) {
        direction *= -1
    }
    if(iteration==200) {
        direction *= -1
    }
}
