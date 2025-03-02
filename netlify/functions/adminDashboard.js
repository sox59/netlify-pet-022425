
const cookie = require("cookie")
const { MongoClient } = require("mongodb")

const handler = async event => {

  const incomingCookie = cookie.parse(event.headers.cookie || "")

  if (incomingCookie?.petadoption == "hgreuf09ruiojvnmnj9090ruhvisjkiuhourhouhhguhenvkj") {

    const client = new MongoClient(process.env.CONNECTIONSTRING)
    await client.connect()

    const pets = await client.db().collection("pets").find().toArray()
    client.close()

    const petsHTML = generateHTML(pets)

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, pets: petsHTML })
    }


  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }
}

function generateHTML(pets) {

  let outHTML = `<div class="list-of-pets">`

  outHTML += pets.map(pet => {

    return ` <div class="pet-card">
      <div class="pet-card-text">
        <h3>${pet.name}</h3>
        <p class="pet-description">${pet.description}</p>
      </div>
      <div class="pet-card-photo">
        <img src="/images/fallback.jpg" alt="A ${pet.species} named ${pet.name}.">
      </div>
    </div> `

  }).join("")

  outHTML += "</div>"

  return outHTML



}

module.exports = { handler }