var canvas = document.querySelector('canvas');
var paint = canvas.getContext('2d');
var bm = document.querySelector('.bm');
var bm2 = document.querySelector('.bm2');
var bm3 = document.querySelector('.bm3');
var button = document.querySelector('.buttonStart');
var title = document.querySelector('.title');
var record = document.querySelector('.record');

(function() {
  var requestAnimationFrame = 
  window.requestAnimationFrame || 
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

})();

record.innerHTML = localStorage.getItem('record');

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

        if(count >= 50) {
            dx = 4,
            dy = 4;
        }
        else {
            dx = 3,
            dy = 3;
        }

        var ball = new Ball(x,y,w,h,dx,dy);
        balls.push(ball);

    }
}

localStorage.setItem('record', localStorage.getItem('record'));

function drawBalls() {

    paint.clearRect(0,0,window.innerWidth, window.innerHeight);

    block();
    if(yBlock >= (window.innerHeight - 40) ) {
        yBlock = window.innerHeight - 40;
    }
    else if(yBlock <= 0) {
        yBlock = 1;   
    }
    else {
        yBlock += 2;
    }

    for(var i = 0; i < balls.length; i++) {

        var one = balls[i];

        one.x += one.dx;

        if(yBlock >= (one.y - 40) && yBlock <= (one.y + 40)) {

            if(xBlock >= (one.x - 40) && xBlock <= (one.x + 40)) {

                if(localStorage.getItem('record') < count) {
                    localStorage.setItem('record', count);
                    record.innerHTML = localStorage.getItem('record');
                }

                fail();

            }

        }

        //drawing
        paint.shadowColor = 'rgba(255,255,255,0.3)';
        paint.shadowBlur = 15;
        paint.shadowOffsetX = -15;
        paint.fillStyle = 'rgba(255,255,255,0.35)';
        paint.fillRect(one.x,one.y,one.w,one.h);

    }

    requestAnimationFrame(drawBalls);   

}

var xBlock = (window.innerWidth / 2) + 20;
var yBlock = (window.innerHeight / 2) + 20;


function block() {

    paint.shadowColor = 'rgba(0,0,0,0.3)';
    paint.shadowBlur = 30;
    paint.shadowOffsetX = 0;
    paint.fillStyle = 'rgba(255, 235, 59, 0.40)';
    paint.fillRect(xBlock,yBlock,40,40);

}

function fail() {

    bm.innerHTML = '<span style="color:rgba(255,255,255,0.3)">0</span>';
    count = 0;

}



count = 0;

addEventListener('keydown', function() {
    yBlock -= 40;
});

addEventListener('touchend', function() {
    yBlock -= 45;
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
    bm2.style.display = 'block';

    bm3.onclick = function() {
        location.reload();
    }

    button.onclick = function() {
        button.style.display = 'none';
        bm.style.display = 'block';
        bm3.style.display = 'block';
        title.style.display = 'none';

        block();
        createBalls();
        drawBalls();
        generate();
    };
}

/* /MENU */

/* BACKGROUND */

var canvasBack = document.querySelector('.canvasTwo');
var paintBack = canvasBack.getContext('2d');

canvasBack.width = window.innerWidth;
canvasBack.height = window.innerHeight;

var countStars = 450,
    x, y, sq;

for(var i = 0; i < countStars; i++) {

    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;
    sq = Math.random() * 2;

    paintBack.fillStyle = 'rgba(255,255,255,'+ (Math.random() * 1) +')';
    paintBack.fillRect(x,y,sq,sq);

}