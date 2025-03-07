const escape = require("escape-html")
const { MongoClient, ObjectId } = require("mongodb")
const isAdmin = require("../../our-library/isAdmin")

const handler = async event => {



  if (isAdmin(event)) {

    const client = new MongoClient(process.env.CONNECTIONSTRING)
    await client.connect()

    const body = JSON.parse(event.body)

    //const pet = await client.db().collection("pets").findOne({ _id: new ObjectId(body.id) })

    const pet = await client.db().collection("pets").findOne({ _id: ObjectId.createFromHexString(body.id) })
    client.close()



    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, pet })
    }


  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }
}



module.exports = { handler }

