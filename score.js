// SHOW HIGH SCORE
document.getElementById("hs").innerText =
  localStorage.getItem("hs") || 0;

// BACK BUTTON
function goHome(){
  window.location.href = "start.html";
}

// 🔥 THEME FIX (same as dictionary + snake)
const toggle = document.getElementById("modeToggle");

// LOAD THEME
document.addEventListener("DOMContentLoaded", () => {
  let saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }
});

// TOGGLE CLICK
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