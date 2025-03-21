async function getSignature() {

  const signaturePromise = await fetch("/.netlify/functions/getSignature")
  const theResponse = await signaturePromise.JSON()
  console.log(theResponse)



}

getSignature()