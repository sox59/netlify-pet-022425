
const cookie = require("cookie")

const handler = async event => {

  const body = JSON.parse(event.body)



  if (body.username == "wrigley" && body.password == "field") {

    const myCookie = cookie.serialize("petadoption", "hgreuf09ruiojvnmnj9090ruhvisjkiuhourhouhhguhenvkj", {

      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24





    })

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Set-Cookie": myCookie, "Location": "/" },
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