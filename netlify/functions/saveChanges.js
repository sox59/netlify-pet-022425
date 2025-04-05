const sanitizeHTML = require("sanitize-html")
const cloudinary = require("cloudinary").v2
const getDbClient = require("../../our-library/getDbClient")
const isAdmin = require("../../our-library/isAdmin")
const { ObjectId } = require("mongodb")


const cloudinaryConfig = cloudinary.config({

  cloud_name: "dknfdnulf",
  api_key: "498555957834564",
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true

})



function cleanUp(x) {

  return sanitizeHTML(x, {

    allowedTags: [],
    allowedAttributes: {}

  })

}

const handler = async event => {

  const body = JSON.parse(event.body)

  // data validation and sanitation

  if (typeof body.name != "string") {

    body.name = ""

  }


  if (typeof body.description != "string") {

    body.description = ""

  }

  let pet = {

    name: cleanUp(body.name),
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

  const expectedSignature = cloudinary.utils.api_sign_request({
    public_id: body.public_id,
    version: body.version
  },
    cloudinaryConfig.api_secret)

  if (expectedSignature === body.signature) {

    pet.photo = body.public_id


  }





  if (isAdmin(event)) {
    // save into database

    if (!ObjectId.isValid(body.id)) {

      return {

        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false })

      }


    }



    const client = await getDbClient()
    await client.db().collection("pets").findOneAndUpdate({ _id: ObjectId.createFromHexString(body.id) }, { $set: pet })
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

