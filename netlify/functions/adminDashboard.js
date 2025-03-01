
const cookie = require("cookie")

const handler = async event => {

  const incomingCookie = cookie.parse(event.headers.cookie || "")

  if (incomingCookie?.petadoption == "hgreuf09ruiojvnmnj9090ruhvisjkiuhourhouhhguhenvkj") {

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