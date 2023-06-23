// 產出隨機短網址
// 短網址格式是否為 5 組英數亂碼

const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const UpperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'
// 隨機數需要的材料
let collection = []
collection = lowerCaseLetters + UpperCaseLetters + numbers
const collectionLength = collection.length
const max = collectionLength - 1 // 61
const min = 0
let shortURL = ''

function randomNumber(count) {
  for (i = 0; i < count; i++) {
    // 產生亂數 Index // Math.floor(Math.random() * 10) // 0 <= n < 10
    let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min // 0 <= n <= 61
    shortURL += collection[randomIndex]
    // return shortURL
  }
}

randomNumber(5)
console.log('global shortURL:', shortURL)
