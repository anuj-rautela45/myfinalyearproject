let list = document.getElementById("list");
let toggleBtn = document.getElementById("modeToggle");

/* Load theme */
window.onload = () => {
  let saved = localStorage.getItem("theme");
  if(saved==="light"){
    document.body.classList.add("light");
    toggleBtn.innerText="☀️";
  }

  loadHistory();
};

/* Toggle */
toggleBtn.onclick = () => {
  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){
    toggleBtn.innerText="☀️";
    localStorage.setItem("theme","light");
  } else {
    toggleBtn.innerText="🌙";
    localStorage.setItem("theme","dark");
  }
};

/* Load history */
function loadHistory(){
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  list.innerHTML="";

  if(history.length===0){
    list.innerHTML="<p>No history</p>";
    return;
  }

  history.forEach(item=>{
    let li=document.createElement("li");
    li.textContent=item;
    list.appendChild(li);
  });
}

/* Clear */
function clearHistory(){
  localStorage.removeItem("calcHistory");
  loadHistory();
}

/* Back */
function goHome(){
  window.location.href="../calculator/calculator.html";
}