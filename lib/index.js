const axios = require('axios')
const chalk = require('chalk')
const crypto = require('crypto')
const md5 = crypto.createHash('md5')
const addr = 'http://fanyi-api.baidu.com/api/trans/vip/translate'
const appid = '20170920000084068'
const secret = 'kaTn_WCcaxsALaJQpgIv'
let salt = genRandom(10)

module.exports = function (word) {
  if (word.length == 0) {
    console.log(chalk.red('请输入要查询的词或句子'))
    return false
  }
  let str = `${appid}${word}${salt}${secret}`
  let sign = md5.update(str).digest('hex')
  let encodeWord = encodeURI(word)
  let api = `${addr}?q=${encodeWord}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`
  if (word[0].charCodeAt(0) > 225) {
    api = `${addr}?q=${encodeWord}&from=zh&to=en&appid=${appid}&salt=${salt}&sign=${sign}`
  }
  axios.get(api).then((res) => {
    let data = res.data;
    if (data.error_code) {
      console.log(chalk.red(data.error_msg))
    }
    for (let key in data.trans_result) {
      console.log(chalk.green(data.trans_result[key]['dst']))
    }
  }).catch(err => console.error(chalk.red(err)))
}

function genRandom(n) {
  return Math.round(Math.random() * Math.pow(10, n))
}
