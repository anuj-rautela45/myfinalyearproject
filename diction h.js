const toggle = document.getElementById("modeToggle");

// LOAD
document.addEventListener("DOMContentLoaded", () => {
  let saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  }

  loadHistory();
});

// TOGGLE
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){
    toggle.textContent = "☀️";
    localStorage.setItem("theme","light");
  } else {
    toggle.textContent = "🌙";
    localStorage.setItem("theme","dark");
  }
});

// LOAD HISTORY
function loadHistory(){
  let history = JSON.parse(localStorage.getItem("wordHistory")) || [];
  let list = document.getElementById("historyList");

  list.innerHTML = "";

  if(history.length === 0){
    list.innerHTML = "<p>No history</p>";
    return;
  }

  history.forEach(word => {
    let div = document.createElement("div");
    div.className = "word";
    div.textContent = word;

    div.onclick = () => {
      localStorage.setItem("searchWord", word);
      window.location.href = "dictionary.html";
    };

    list.appendChild(div);
  });
}

// BACK
function goBack(){
  window.location.href = "dictionary.html";
}

// CLEAR
function clearHistory(){
  localStorage.removeItem("wordHistory");
  loadHistory();
}
