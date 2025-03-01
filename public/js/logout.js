document.querySelector("#logout").addEventListener("click", async function () {

  const ourPromise = await fetch("/.netlify/functions/logout") // no data or configuration object

  window.location = "/"
})