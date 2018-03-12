var canvas = document.querySelector('canvas');
var paint = canvas.getContext('2d');
var bm = document.querySelector('.bm');
var bm2 = document.querySelector('.bm2');
var button = document.querySelector('.buttonStart');

(function() {
  var requestAnimationFrame = 
  window.requestAnimationFrame || 
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

})();

/* GAME */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var balls = [],
    num = 1,
    count = 0,
    timer = 0,
    check = 35;

function Ball(x,y,w,h,dx,dy) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
}

function createBalls() {

    for(var i = 0; i < num; i++) {

        var x = - 200;
        var y = Math.random() * window.innerHeight;

        var w = 50,
            h = 50;

        var dx, dy;

        if(count >= 50 && count <= 99) {
            dx = 4,
            dy = 4;
        }
        else if(count >= 100 && count <= 149 ) {
            dx = 5,
            dy = 5;
        }
        else if(count >= 150) {
            dx = 7,
            dy = 7;
        } 
        else {
            dx = 3,
            dy = 3;
        }

        var ball = new Ball(x,y,w,h,dx,dy);
        balls.push(ball);

    }
}

function drawBalls() {

    paint.clearRect(0,0,window.innerWidth, window.innerHeight);

    block();
    if(yBlock >= (window.innerHeight + 40) ) {
        yBlock = window.innerHeight;
    }
    else if(yBlock <= 0) {
        yBlock += 10;   
    }
    else {
        yBlock += 2;
    }

    for(var i = 0; i < balls.length; i++) {

        var one = balls[i];

        one.x += one.dx;

        if(yBlock >= (one.y - 40) && yBlock <= (one.y + 40)) {

            if(xBlock >= (one.x - 40) && xBlock <= (one.x + 40)) {

                fail();

            }

        }

        if(yBlock >= window.innerHeight || yBlock <= 0) {

            fail();

        }

        //drawing

        paint.fillStyle = 'rgba(0,0,255,0.35)';
        paint.fillRect(one.x,one.y,one.w,one.h);

    }

    requestAnimationFrame(drawBalls);   

}

var xBlock = (window.innerWidth / 2) + 20;
var yBlock = (window.innerHeight / 2) + 20;


function block() {

    paint.fillStyle = 'rgba(0,255,0,0.3)';
    paint.fillRect(xBlock,yBlock,40,40);

}

function fail() {

    bm.innerHTML = '<span style="color:rgba(255,0,0,0.3)">FAIL</span>';
    count = 0;

}



count = 0;

addEventListener('keydown', function() {
    yBlock -= 40;
});

addEventListener('touchend', function() {
    yBlock -= 40;
});



function generate() {
    timer++;
    requestAnimationFrame(generate);

    if(timer > check) {
        createBalls();
        count++;
        timer = 0;
        bm.innerHTML = count;
    }
}

/* /GAME */


/* MENU */

window.onload = function() {

    bm.style.display = 'none';

    button.onclick = function() {
        button.style.display = 'none';

        block();
        createBalls();
        drawBalls();
        generate();
    };
}

/* /MENU */

/*setInterval(function() {
createBalls();
count++;
bm.innerHTML = count;
}, 500);*/