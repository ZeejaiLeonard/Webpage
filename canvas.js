window.onload = init;
var canvas;
var ctx;
var particles = [];
var frame = 0;
var mouse = new JSVector(0, 0);
var clicked = false;

function init(){
  canvas = document.getElementById('cnv');
  canvas.width = 800;
  canvas.height = 800;
  canvas.style.position = 'fixed';
  ctx = canvas.getContext('2d');
  canvas.addEventListener("mousemove", handleMouseMoved);
  canvas.addEventListener("click", handleMouseClicked);
  animate();
}

function handleMouseMoved(evt){
  mouse.x = evt.offsetX;
  mouse.y = evt.offsetY;
}

function handleMouseClicked(evt){
  clicked = !clicked;
}

function Particle(){
  this.l = new JSVector(mouse.x, mouse.y);
  this.v = new JSVector(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
  this.a = new JSVector(0, .05);
  this.radius = 10;
  this.life = 200;
  if(clicked){
    this.r = 0; //Math.floor(Math.random() * 255);
    this.g = 0;
    this.b = 0;
  }else{
    this.r = 255; //Math.floor(Math.random() * 255);
    this.g = 255;
    this.b = 255;
  }
}

Particle.prototype.update = function(){
  this.v.add(this.a);
  this.l.add(this.v);
  this.life += -1;
  this.render();
}

Particle.prototype.render = function(){
  ctx.beginPath();
  ctx.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.life/200 + ")";
  ctx.arc(this.l.x, this.l.y, this.radius, Math.PI * 2, 0, false);
  ctx.fill();
}

Particle.prototype.isDead = function(){
  if(this.life < 0.0){
    return true;
  }else{
    return false;
  }
}

function createParticles(num){
  for(var i = 0; i < num; i++){
    particles.push(new Particle());
  }
}

function oldCheckEdges(b){
  if((b.l.x > window.innerWidth) || (b.l.x < 0)){
    b.v.x *= -1;
  }
  if((b.l.y > window.innerHeight) || (b.l.y < 0)){
    b.v.y *= -1;
  }
}

function animate(){
  requestAnimationFrame(animate);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for(var i = 0; i < particles.length; i++){
    particle = particles[i];
    oldCheckEdges(particle);
    particle.update();
  }

  frame++;
  if(frame == 1){
    createParticles(1);
    frame = 0;
  }
  if(particles.length > 200){
    particles.splice(0, 1)
  }
}
