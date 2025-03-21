
let serverSignature
let serverTimestamp



async function getSignature() {

  const signaturePromise = await fetch("/.netlify/functions/getSignature")
  const theResponse = await signaturePromise.json()
  console.log(theResponse)

  serverSignature = theResponse.signature
  serverTimestamp = theResponse.timestamp



}

getSignature()


document.querySelector("#file-field").addEventListener("change", async function () {


  const data = new FormData()
  data.append("file", document.querySelector("#file-field").files[0])
  data.append("api_key", "498555957834564")
  data.append("signature", serverSignature)
  data.append("timestamp", serverTimestamp)

  // send to Cloudinary

  const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/dknfdnulf/auto/upload", data, {

    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total)

    }


  })

  console.log(cloudinaryResponse.data)

})


