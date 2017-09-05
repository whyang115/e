const axios = require('axios')
const chalk = require('chalk')
const addr = 'http://route.showapi.com/32-9'
const appid = '36529'
const secret = 'b92f77b0ce4b4a8e9366807ece805f72'

module.exports = function (word) {
  let api = `${addr}?showapi_appid=${appid}&showapi_sign=${secret}&q=${word}`
  api = encodeURI(api)
  axios.get(api).then((res) => {
    if (res.data.showapi_res_code != 0) {
      console.log(chalk.red(res.data.showapi_res_body.remark))
    }
    let explains = res.data.showapi_res_body.basic.explains
    for (let key in explains) {
      console.log(chalk.green(explains[key]))
    }
  }).catch(err => console.error(chalk.red(err)))
}