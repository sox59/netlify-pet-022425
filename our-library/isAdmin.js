const cookie = require('cookie')

function isAdmin(event) {

  const incomingCookie = cookie.parse(event.headers.cookie || "")
  if (incomingCookie?.petadoption == "hgreuf09ruiojvnmnj9090ruhvisjkiuhourhouhhguhenvkj") {
    return true

  }

  return false


}

module.exports = isAdmin