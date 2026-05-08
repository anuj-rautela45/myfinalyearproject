// CANVAS
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

// UI
const toggle = document.getElementById("modeToggle");
const pauseBtn = document.getElementById("pauseBtn");
const homeBtn = document.getElementById("homeBtn");

// GAME VARIABLES
const box = 20;
let snake = [{x:200,y:200}];
let food = randomFood();
let direction = "RIGHT";
let score = 0;
let gameOver = false;
let paused = false;

// SOUND
let music = document.getElementById("music");
let foodSound = document.getElementById("food");
let moveSound = document.getElementById("move");
let gameoverSound = document.getElementById("gameover");

/* ================= THEME ================= */
document.addEventListener("DOMContentLoaded", ()=>{
  let saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }
});

toggle.onclick = ()=>{
  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){
    toggle.textContent = "☀️";
    localStorage.setItem("theme","light");
  } else {
    toggle.textContent = "🌙";
    localStorage.setItem("theme","dark");
  }
};

/* ================= PAUSE ================= */
pauseBtn.onclick = ()=>{
  paused = !paused;

  if(paused){
    pauseBtn.textContent = "▶ Play";
    music.pause();
  } else {
    pauseBtn.textContent = "⏸ Pause";
    music.play();
  }
};

/* ================= KEYBOARD ================= */
document.addEventListener("keydown",(e)=>{
  if(gameOver){
    if(e.key === "Enter") location.reload();
    return;
  }

  if(e.key==="ArrowLeft" && direction!=="RIGHT"){
    direction="LEFT"; moveSound.play();
  }
  else if(e.key==="ArrowRight" && direction!=="LEFT"){
    direction="RIGHT"; moveSound.play();
  }
  else if(e.key==="ArrowUp" && direction!=="DOWN"){
    direction="UP"; moveSound.play();
  }
  else if(e.key==="ArrowDown" && direction!=="UP"){
    direction="DOWN"; moveSound.play();
  }
});

/* ================= MOUSE ================= */
canvas.addEventListener("click",(e)=>{
  if(gameOver){
    location.reload();
    return;
  }

  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let head = snake[0];
  let dx = x - head.x;
  let dy = y - head.y;

  if(Math.abs(dx) > Math.abs(dy)){
    direction = dx > 0 ? "RIGHT" : "LEFT";
  } else {
    direction = dy > 0 ? "DOWN" : "UP";
  }

  moveSound.play();
});

/* ================= TOUCH ================= */
let startX=0, startY=0;

canvas.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

canvas.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;
  let endY = e.changedTouches[0].clientY;

  let dx = endX - startX;
  let dy = endY - startY;

  if(Math.abs(dx) > Math.abs(dy)){
    direction = dx > 0 ? "RIGHT" : "LEFT";
  } else {
    direction = dy > 0 ? "DOWN" : "UP";
  }

  moveSound.play();
});

/* ================= GAME LOOP ================= */
function draw(){
  if(gameOver){
    showGameOver();
    return;
  }

  if(paused) return;

  // 🎵 play only during game
  if(music.paused){
    music.play();
  }

  ctx.clearRect(0,0,400,400);

  // snake
  ctx.fillStyle = "lime";
  snake.forEach(s => ctx.fillRect(s.x,s.y,box,box));

  // food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x,food.y,box,box);

  let head = {...snake[0]};

  if(direction==="LEFT") head.x -= box;
  if(direction==="RIGHT") head.x += box;
  if(direction==="UP") head.y -= box;
  if(direction==="DOWN") head.y += box;

  // eat
  if(head.x===food.x && head.y===food.y){
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = randomFood();
    foodSound.currentTime = 0;
    foodSound.play();
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // collision
  if(
    head.x<0 || head.y<0 ||
    head.x>=400 || head.y>=400 ||
    collision(head)
  ){
    gameOver = true;
    music.pause();
    gameoverSound.currentTime = 0;
    gameoverSound.play();
    saveHighScore();
  }
}

/* ================= COLLISION ================= */
function collision(head){
  return snake.slice(1).some(s=>s.x===head.x && s.y===head.y);
}

/* ================= FOOD ================= */
function randomFood(){
  return {
    x: Math.floor(Math.random()*20)*box,
    y: Math.floor(Math.random()*20)*box
  };
}

/* ================= HIGH SCORE ================= */
function saveHighScore(){
  let hs = localStorage.getItem("hs") || 0;
  if(score > hs){
    localStorage.setItem("hs",score);
  }
}

/* ================= GAME OVER ================= */
function showGameOver(){
  ctx.fillStyle="rgba(0,0,0,0.7)";
  ctx.fillRect(0,0,400,400);

  let hs = localStorage.getItem("hs") || 0;

  ctx.fillStyle="white";
  ctx.textAlign="center";

  let centerX = canvas.width / 2;

  ctx.font="22px Arial";
  ctx.fillText("GAME OVER", centerX, 160);

  ctx.font="18px Arial";
  ctx.fillText("YOUR SCORE: " + score, centerX, 200);
  ctx.fillText("HIGH SCORE: " + hs, centerX, 230);

  ctx.font="14px Arial";
  ctx.fillText("PRESS ENTER TO PLAY AGAIN", centerX, 260);
  ctx.fillText("CLICK ANYWHERE TO RESTART", centerX, 285);

  // 👇 SHOW BACK BUTTON
  homeBtn.style.display = "block";
}

/* ================= HOME ================= */
function goHome(){
  window.location.href = "start.html";
}

/* ================= START ================= */
setInterval(draw, 120);