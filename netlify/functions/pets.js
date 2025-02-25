const handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: "<h1>Hello this is a headline</h1>"
  }
}

module.exports = { handler }