// 需要安装mockjs插件，指令为： cnpm i mockjs --save-dev （-dev指的是只在npm run serve测试用）
import Mock from 'mockjs'
// 设置一个请求接口为：localhost:8080/api/user/login,访问就返回对象{status:0,data{...}}
// 即相当于后端已经有了该接口，模拟接口请求返回相应的数据
// 相比本地加载静态xxx.json数据的好处：不需要修改代码，只需设置个const flag=false if(mock){require('./mock/api')},
// 当flag为true，则启动mock模拟接口请求数据；若后端已经生成好接口，只需将flag设为false则关闭模拟请求，别的代码不需要修改。
// 【推荐这种方式模拟接口请求】
Mock.mock('/api/user/login', {
  status: 0,
  data: {
    'id|10001-11000': 0,
    username: '@cname',
    email: 'admin@51purse.com',
    phone: null,
    role: 0,
    createTime: 1479048325000,
    updateTime: 1479048325000
  }
})
