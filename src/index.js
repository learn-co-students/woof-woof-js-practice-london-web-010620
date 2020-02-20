const dogBarDiv = document.getElementById("dog-bar")
const dogInfoDiv = document.getElementById("dog-info")
const dogFilter = document.getElementById("good-dog-filter")

const renderDogs = dogs => dogs.forEach(renderDog);

const renderDog = dog => {
    const dogEl = document.createElement("span")
    dogBarDiv.appendChild(dogEl)
    dogEl.innerHTML = dog.name;
    dogEl.addEventListener("click", () => renderDogInfo(dog))
}

const renderDogInfo = dog => {
    const dogImage = document.createElement("img")
    const dogName = document.createElement("h2")
    const dogButton = document.createElement("button")
    dogButton.addEventListener("click", () => changeDogStatus(dog))
    dogInfoDiv.innerHTML = ""
    dogImage.src = dog.image
    dogName.innerText = dog.name
    dogButton.innerHTML = dog.isGoodDog

    dogInfoDiv.append(dogImage, dogName, dogButton)

    if (dog.isGoodDog === true)
        dogButton.innerHTML = "Good Dog!"
    else if (dog.isGoodDog === false)
        dogButton.innerHTML = "Bad Dog!"

    const changeDogStatus = dog => {
        if (dog.isGoodDog === true)
            dog.isGoodDog = false
        else dog.isGoodDog = true
        patchDog(dog)
    }
}


const fetchDogs = () => fetch('http://localhost:3000/pups')
    .then(response => response.json())
    // .then(data => renderDogs(data))

const patchDog = dog => {
    return fetch(`${DOGS_URL}/${dog.id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        }).then(res => res.json())
        .then(dog => {
            let btn = document.querySelector(`button[id="${dog.id}"]`)
            btn.innerText = dog.isGoodDog ? "Bad Dog!" : "Good Dog!"
        })
}


dogFilter.addEventListener("click", changeFilterStatus = () => {
    if (dogFilter.innerText === "Filter good dogs: OFF"){
        dogFilter.innerText = "Filter good dogs: ON"
        dogBarDiv.innerHTML = ""
    fetchDogs()
        .then(dogs => dogs.filter(dog => dog.isGoodDog))
        .then(filterDogs => renderDogs(filterDogs))
    }else{
        dogFilter.innerText = "Filter good dogs: OFF"
    }
})

const init = () => {
    fetchDogs()
    .then(data => renderDogs(data))
}

init()
