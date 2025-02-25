const handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/plain" },
    body: "paul".toUpperCase()
  }
}

module.exports = { handler }