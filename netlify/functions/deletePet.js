const escape = require("escape-html")
const { MongoClient, ObjectId } = require("mongodb")
const isAdmin = require("../../our-library/isAdmin")

const handler = async event => {



  if (isAdmin(event)) {

    const body = JSON.parse(event.body)


    if (!ObjectId.isValid(body.id)) {

      return {

        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false })

      }


    }


    const client = new MongoClient(process.env.CONNECTIONSTRING)
    await client.connect()



    await client.db().collection("pets").deleteOne({ _id: ObjectId.createFromHexString(body.id) })
    client.close()




    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    }


  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false })
  }
}



module.exports = { handler }

