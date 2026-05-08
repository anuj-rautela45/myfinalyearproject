// SELECT TOGGLE
const toggle = document.getElementById("modeToggle");

// 🔥 LOAD THEME (same as dictionary)
document.addEventListener("DOMContentLoaded", () => {
  let saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }
});

// 🔥 TOGGLE CLICK
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){
    toggle.textContent = "☀️";
    localStorage.setItem("theme","light");   // ✅ SAME KEY
  } else {
    toggle.textContent = "🌙";
    localStorage.setItem("theme","dark");    // ✅ SAME KEY
  }
});

// NAVIGATION
function startGame(){
  window.location.href = "game.html";
}

function openHighScore(){
  window.location.href = "score.html";
}

function goHome(){
  window.location.href = "index.html";
}
// BACK TO HOME
document.getElementById("backBtn").onclick = () => {
  window.location.href = "index.html";
};
