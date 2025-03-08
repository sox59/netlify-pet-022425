/* alert("hello123")
 We need to fetch the data for a specific pet. 
 const urlVariables = window.location.search -- manually parse 
 
 */

const urlVariables = new URLSearchParams(window.location.search)
const id = urlVariables.get("id")


async function getEditPet() {

  const ourPromise = await fetch("/.netlify/functions/getSingularPet", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }) // modern Javascript = id:id 


  })

  const pet = await ourPromise.json()
  console.log(pet)

  if (!pet.name) {

    window.location = "/admin"


  }

  document.querySelector("#name").value = pet.name
  document.querySelector("#birthYear").value = pet.birthYear
  document.querySelector("#species").value = pet.species
  document.querySelector("#description").value = pet.description


}

getEditPet()

//****************************************************************************************************************** 

document.querySelector("#edit-pet-form").addEventListener("submit", async function (e) {
  e.preventDefault()

  const pet = {
    id,
    name: document.querySelector("#name").value,
    birthYear: document.querySelector("#birthYear").value,
    species: document.querySelector("#species").value,
    description: document.querySelector("#description").value

  }


  const ourPromise = await fetch("/.netlify/functions/saveChanges", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet)


  })

  const theResponse = await ourPromise.json()

  if (theResponse.success) {

    window.location = "/admin"

  }






})

