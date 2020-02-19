const url = "http://localhost:3000/pups"

let dogBar = document.getElementById("dog-bar")

const iteratePups = pupps => {
  dogBar.innerHTML = ""
  pupps.forEach(renderPup);
}

const renderPup = pupData => {
  let nameEl = document.createElement("span");
  nameEl.setAttribute("id", pupData.id);
  nameEl.innerText = pupData.name;
  dogBar.append(nameEl)
  nameEl.addEventListener("click", e => chooseDog(e))
}

function makeDog(dog) {
  const dog_info = document.querySelector("#dog-info");
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = dog.image;
  const h3 = document.createElement("h3");
  h3.textContent = dog.name;
  const button = document.createElement("button");
  button.setAttribute("id", dog.id);
  if (dog.isGoodDog) {
    button.innerHTML = "Bad Dog!"
  } else {
    button.innerHTML = "Good Dog!"
    button.addEventListener("click", e => goodBadDog(e))
  }
  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(button);
  
  
  dog_info.appendChild(div);
}

function chooseDog(e) {
  const dog_info = document.querySelector("#dog-info");
  let id = e.target.id;
  dog_info.innerHTML = ""
  return fetch(`http://localhost:3000/pups/${id}`)
  .then(response => response.json())
  .then(dog => makeDog(dog));
}



function toggleGoodBad(dog) {
  // debugger
  if (dog.isGoodDog) {
    dog.isGoodDog = false 
    
  } else {
    dog.isGoodDog = true
    // console.log(dog)
  }
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "isGoodDog": dog.isGoodDog
    })
  })
  .then(response => response.json())
  .then(data => {
    let btn = document.querySelector(`button[id="${data.id}"]`)
    btn.innerText = data.isGoodDog ? "Bad Dog!" : "Good Dog!"
  })
  
}



function goodBadDog(e) {
  let id = e.target.id;
  return fetch(`http://localhost:3000/pups/${id}`)
  .then(response => response.json())
  .then(dog => toggleGoodBad(dog));
  
}


const toggleButton = document.querySelector("#good-dog-filter").addEventListener("click", e => filter(e))


function filter(e) {
if (e.target.innerText == "Filter good dogs: OFF"){
  e.target.innerText = "Filter good dogs: ON"
   fetch(url).then(jsonify).then(renderGoodInfo)
  
}
else {
  e.target.innerText = "Filter good dogs: OFF" 
  fetch(url).then(jsonify).then(renderInfo) 
  
}
}





const requestPromise = fetch(url);
const jsonify = response => response.json();

const renderInfo = infoData => {
  iteratePups(infoData);
}
const renderGoodInfo = infoData => {
  let goodDogs = infoData.filter(dog => dog.isGoodDog === true);
  iteratePups(goodDogs);

}


requestPromise.then(jsonify).then(renderInfo);

