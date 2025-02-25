const handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: "paul".toUpperCase()
  }
}

module.exports = { handler }