const toggle = document.getElementById("modeToggle");

// LOAD THEME
document.addEventListener("DOMContentLoaded", () => {
  let saved = localStorage.getItem("theme");

  if(saved === "light"){
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  }

  // auto search (history click se aaya ho to)
  let savedWord = localStorage.getItem("searchWord");
  if(savedWord){
    document.getElementById("word").value = savedWord;
    searchWord();
    localStorage.removeItem("searchWord");
  }
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

// OPEN HISTORY
function openHistory(){
  window.location.href = "../diction h/diction h.html";
}

// SAVE HISTORY
function saveHistory(word){
  let history = JSON.parse(localStorage.getItem("wordHistory")) || [];

  if(!history.includes(word)){
    history.unshift(word);
    localStorage.setItem("wordHistory", JSON.stringify(history));
  }
}

// SEARCH WORD
async function searchWord(){
  const word = document.getElementById("word").value.trim();
  const result = document.getElementById("result");

  if(!word) return;

  result.innerHTML = "Loading...";

  try{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if(data.title === "No Definitions Found"){
      result.innerHTML = "No meaning found";
      return;
    }

    const meaning = data[0].meanings[0].definitions[0].definition;

    result.innerHTML = `
      <p><b>${word}</b></p>
      <p>${meaning}</p>
    `;

    saveHistory(word);

  }catch{
    result.innerHTML = "Error";
  }
}
// BACK TO HOME
document.getElementById("backBtn").onclick = () => {
  window.location.href = "../home/index.html";
};