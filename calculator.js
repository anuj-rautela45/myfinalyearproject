let display = document.getElementById("inputBox");
let toggleBtn = document.getElementById("modeToggle");

// Load theme safely
window.onload = () => {
  let saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    if(toggleBtn) toggleBtn.innerText = "☀️";
  }
};

// Toggle safely
if(toggleBtn){
  toggleBtn.onclick = () => {
    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
      toggleBtn.innerText = "☀️";
      localStorage.setItem("theme","light");
    } else {
      toggleBtn.innerText = "🌙";
      localStorage.setItem("theme","dark");
    }
  };
}

// Buttons working
let buttons = document.querySelectorAll(".button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.innerText;

    if(value === "AC"){
      display.value = "";
    }
    else if(value === "DEL"){
      display.value = display.value.slice(0,-1);
    }
    else if(value === "="){
      calculate();
    }
    else{
      display.value += value;
    }
  });
});

// Calculate
function calculate(){
  try{
    let result = eval(display.value);
    saveHistory(display.value + " = " + result);
    display.value = result;
  }catch{
    display.value = "Error";
  }
}

// Save history
function saveHistory(entry){
  let h = JSON.parse(localStorage.getItem("calcHistory")) || [];
  h.unshift(entry);
  localStorage.setItem("calcHistory", JSON.stringify(h));
}

// Keyboard support
document.addEventListener("keydown",(e)=>{
  if(!isNaN(e.key) || "+-*/.%".includes(e.key)){
    display.value += e.key;
  }
  else if(e.key==="Enter"){
    calculate();
  }
  else if(e.key==="Backspace"){
    display.value = display.value.slice(0,-1);
  }
  else if(e.key==="Escape"){
    display.value = "";
  }
});

function openHistory(){
  window.location.href = "../history/history.html";
}
// BACK TO HOME
document.getElementById("backBtn").onclick = () => {
  window.location.href = "../home/index.html";
};