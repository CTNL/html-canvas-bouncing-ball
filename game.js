var canvas;
var ctx;
var x = 75;
var y = 50;
var m_x = 50;
var m_y = 50;
var s_x = 0;
var s_y = 0;
var WIDTH = window.innerWidth-20;
var HEIGHT = window.innerHeight-20;
var dragok = false;

function rect(x,y,w,h) {
 ctx.beginPath();
 ctx.rect(x,y,w,h);
 ctx.closePath();
 ctx.fill();
}

function clear() {
 ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
 canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
 canvas.width  = WIDTH;
 canvas.height = HEIGHT;
 return setInterval(draw, 10);
}

function draw() {
 clear();
 updateGame();
 ctx.fillStyle = "#FAF7F8";
 rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#444444";
 ctx.beginPath();
 ctx.arc(x , y , 20, 0, 2*Math.PI);
 ctx.fill();
}

function myMove(e){
 if (dragok){
  m_x = e.pageX;
  m_y = e.pageY;
 }
}

function myDown(e){
 e.preventDefault();
 if(e.targetTouches) e = e.targetTouches;
 if (e.pageX < x + 15 + canvas.offsetLeft 
  && e.pageX > x - 15 + canvas.offsetLeft 
  && e.pageY < y + 15 + canvas.offsetTop 
  && e.pageY > y - 15 + canvas.offsetTop){
  m_x = e.pageX;
  m_y = e.pageY;
  dragok = true;
  canvas.onmousemove = myMove;
 }
}

function myUp(){
 dragok = false;
 canvas.onmousemove = null;
}

function updateGame(){
  if (dragok){
    s_x = m_x - canvas.offsetLeft - x;
    s_y = m_y - canvas.offsetTop  - y;
  }
  if(s_x!=0)	x += s_x/3;
  if(s_y!=0)	y += s_y/3;
  if(s_x<.1 && s_x>-.1)	s_x = 0;  else	s_x *= .99;
  if(s_y<1.1 && s_y>-1.1 && y > canvas.offsetHeight-21 )	s_y = 0;  else {s_y += 1;}
  if(x < canvas.offsetLeft  +15  && s_x < 0 && !dragok) s_x *= -1;
  if(x > canvas.offsetWidth -20  && s_x > 0 && !dragok) s_x *= -1;
  if(y < canvas.offsetTop   +15  && s_y < 0 && !dragok) s_y *= -.9;
  if(y > canvas.offsetHeight-20 && s_y > 0 && !dragok) s_y *= -.7;
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.ontouchstart = myDown;
canvas.ontouchend = myUp;