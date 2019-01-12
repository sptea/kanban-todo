export default {
  createRandomString(length) {
    const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let returnString = ''
    for (var i = 0; i < length; i++)
      returnString += charSet[Math.floor(Math.random() * charSet.length)]
    return returnString
  }
}
