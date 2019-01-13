export default {
  createRandomString(length, originToken) {
    const charSet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let returnString = ''
    for (let i = 0; i < length; i++)
      returnString += charSet[Math.floor(Math.random() * charSet.length)]

    returnString += '-' + originToken
    console.log(returnString)
    return returnString
  }
}
