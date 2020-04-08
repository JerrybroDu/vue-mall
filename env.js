// 该配置文件env.js是自己抽取出来的,根据CORS和JSONP跨域才做此设置,
// 若是接口代理,则无需env.js直接修改vue.config.js的target和main.js的axios.defaults.baseURL = '/api'
// 根据package.json 运行不同的指令,baseURL转向不同的url路径
let baseURL
// process.env.NODE_ENV是node.js的语法,用来获取package.json中"--mode=development"的development参数
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api'
    break
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api'
    break
  case 'prev':
    baseURL = 'http://prev-mall-pre.springboot.cn/api'
    break
  case 'production':
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
  default:
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
}

export default {
  baseURL
}
