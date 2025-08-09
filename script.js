let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let input = document.getElementById("input");
let button = document.getElementById("search-button");
let result = document.getElementById("result");

function getData() {
  let word = input.value;
  if (word) {
    let finalUrl = `${url}${word}`;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        result.innerHTML = `
      <div class="title">
        <h2 class="word">${data[0].word}</h2>
        <button><i class="fa fa-volume-up"></i></button>
      </div>
      <div class="details">
        <p class="pos">${data[0].meanings[0].partOfSpeech}</p>
        <p class="phonetic">${
          data[0].phonetic ||
          data[0].phonetics[0].text ||
          data[0].phonetics[1].text
        }</p>
      </div>
      <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
      <p class="example">${data[0].meanings[0].definitions[0].example || ""}</p>
      `;
      let icon = document.querySelector("button i");
      icon.addEventListener("click", () => {
        let sound = document.getElementById("sound");
        sound.src = `${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`;
        sound.play();
      });
      })
      .catch((error) => {
        result.innerHTML = `<h3 class="msg">The Word Could Not Be Found</h3>`;
      });
  } else {
    result.innerHTML = `<h3 class="msg">The Input Field Can Not Be Empty</h3>`;
  }
}
button.addEventListener("click", getData);
window.addEventListener("load", getData);
