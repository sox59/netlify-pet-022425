const sanitizeHTML = require("sanitize-html")
const getDbClient = require("../../our-library/getDbClient")
const isAdmin = require("../../our-library/isAdmin")

function cleanUp(x) {

  return sanitizeHTML(x, {

    allowedTags: [],
    allowedAttributes: {}

  })

}

const handler = async event => {

  const body = JSON.parse(event.body)

  // data validation and sanitation

  let pet = {

    name: body.name,
    species: cleanUp(body.species),
    description: cleanUp(body.description),
    birthYear: new Date().getFullYear()

  }

  if (body.birthYear > 999 && body.birthYear < 9999) {
    pet.birthYear = body.birthYear

  }

  if (pet.species != "cat" && pet.species != "dog") {
    pet.species = "dog"

  }





  if (isAdmin(event)) {
    // save into database
    const client = await getDbClient()
    await client.db().collection("pets").insertOne(pet)
    client.close()

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    }


  }

  // no permission


  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }


}

module.exports = { handler }