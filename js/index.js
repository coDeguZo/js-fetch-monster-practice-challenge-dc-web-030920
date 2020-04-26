// When the page loads, show the first 50 monsters. 
// Each monster's name, age, and description should be shown.
const url = "http://localhost:3000/monsters"
let page = 1


document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM loaded')
    renderForm()
    fetchAllMonsters()
    const backwards = document.getElementById('back')
    const forwards = document.getElementById('forward')
    backwards.onclick = previousPage
    forwards.onclick = nextPage
});

function fetchAllMonsters(){
    document.querySelector("#monster-container").innerHTML = ''
    fetch(`${url}?_limit=50&_page=${page}` )
    .then(resp => resp.json())
    .then(monstersArray => monstersArray.forEach(monster => renderMonster(monster)))
}

function renderMonster(monster) {
    const divColNode = document.getElementById("monster-container")
    const divNode = document.createElement("div")
    const headerNode = document.createElement("h2")
    const header4Node = document.createElement("h4")
    const paraNode = document.createElement("p")

    divColNode.appendChild(divNode)
    divNode.append(headerNode, header4Node, paraNode)

    divNode.id = monster.id
    headerNode.innerText = monster.name
    header4Node.innerText = `Age: ${monster.age}`
    paraNode.innerText = monster.description
}

// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'.
// When you click the button, the monster should be added to the list and saved in the API.

function renderForm(event) {
    const divNode = document.getElementById("create-monster")
    const formNode = document.createElement("form")

    const nameLabel = document.createElement("label")
    nameLabel.for = "name"
    nameLabel.innerText = "Name: "

    const ageLabel = document.createElement("label")
    ageLabel.for = "age"
    ageLabel.innerText = "Age: "

    const descLabel = document.createElement("label")
    descLabel.for = "description"
    descLabel.innerText = "Description: "

    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.id = "name-input"
    nameInput.for = "name"

    const ageInput = document.createElement("input")
    ageInput.type = "text"
    ageInput.id = "age-input"
    ageInput.for = "age"

    const descInput = document.createElement("input")
    descInput.type = "text"
    descInput.id = "desc-input"
    descInput.for = "description"

    const submitInput = document.createElement("input")
    submitInput.type = "submit"
    submitInput.value = "Create Monster"

    formNode.append(nameLabel, nameInput, ageLabel, ageInput, descLabel, descInput, submitInput)
    divNode.append(formNode)
    formNode.addEventListener("submit", handleForm)
}

function handleForm(event) {
    let formNode = document.createElement("form")
    event.preventDefault()
    formNode = this
    console.log("submit")
    let obj = {
        name: document.getElementById("name-input").value,
        age: document.getElementById("age-input").value,
        description: document.getElementById("desc-input").value
    }
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
                },
        body: JSON.stringify(obj)
        })
    formNode.reset()
}

// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

function previousPage(){
    if (page > 1){
    --page
    fetchAllMonsters()
    }
}

function nextPage(){
    ++page
    fetchAllMonsters()
}