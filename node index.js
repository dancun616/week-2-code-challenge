let objGlobal

const nameDisplay = document.querySelector("#name")
const imgDisplay = document.querySelector("#image")
const voteCountDisplay = document.querySelector("#vote-count")

const addVotesForm = document.querySelector("#votes-form")
const votesInputBox = document.querySelector("#votes")

const url = "http://localhost:3000/characters"

const characterBarContainer = document.querySelector("#character-bar")
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data)
        renderCharacterDisplay(data[0])

        data.forEach((element) => {
            renderList(element)
        })
     })
 .catch((error) => {
        console.error('Error:', error)
    })
function renderList(characterObj){

    let characterSpanEl = document.createElement('span')
    characterSpanEl.textContent = characterObj.name

    characterBarContainer.appendChild(characterSpanEl)

    characterSpanEl.addEventListener("click", () => {
        renderCharacterDisplay(characterObj)
    })
}

function renderCharacterDisplay(characterObj){
    let characterSpanEl = document.createElement('span')
    
    nameDisplay.textContent = characterObj.name
    imgDisplay.src = characterObj.image
    voteCountDisplay.textContent = characterObj.vote

    objGlobal = characterObj
}

addVotesForm.addEventListener("submit", (event) => {
    event.preventDefault()

    objGlobal.votes += parseInt(votesInputBox.value)
    voteCountDisplay.textContent = objGlobal.votes
    patchRequest(objGlobal)
})