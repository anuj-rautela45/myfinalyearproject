document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("toggleMode"); // FIXED ID

  // Load theme
  const saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    if(toggle) toggle.innerText = "☀️ Light Mode";
  }

  // Toggle theme
  if(toggle){
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light");

      if(document.body.classList.contains("light")){
        toggle.innerText = "☀️ Light Mode";
        localStorage.setItem("theme", "light");
      } else {
        toggle.innerText = "🌙 Dark Mode";
        localStorage.setItem("theme", "dark");
      }
    });
  }

});

// Navigation
function openPage(page) {
  window.location.href = page;
}