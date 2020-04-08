# 技术栈
vue2 + vue-router + vuex + axios + sass （vue-cli4搭建的）
# 启动
```
# npm install （安装依赖）
# npm run serve （本地运行）
# npm run build （打包）
账号：jerrybro
密码：jerrybro
```
# vue-cli项目注意点
- vue-cli项目克隆到本地，需要cnpm install（即安装依赖包），再cnpm run serve（即启动项目）
- cnpm install [插件名] --save(-S)      【保存到dependencies:{xxx}】
	  cnpm install [插件名] --save-dev(-D)  【保存到devDependencies:{xxx}】
	  区别：
	       devDependencies下的插件，是项目上线之后不会用到的插件，即不打包到项目中；
	  	   dependencies下的插件，是项目发布上线之后还会依赖用到的插件，没有这些插件，项目不能运行，即打包到项目中
	  总之： 后面安装的插件都保存到dependencies:{xxx}中就完事了

- import axios from 'axios' 与 import axios from './axios'，
	  前一种写法则会在node_modules中找当做插件，后一种在src下的目录中找自己定义的文件

	- 配置文件修改了，需要重启服务器才能生效（如：修改了vue.config.js的配置）

- vue-cli4.0项目中，组件的插槽<slot name='body'></slot>,
	  在xxx.vue页面使用，需要包一层template, 如
```
		<Modal>
			<template v-slot:body>
				<p>添加成功！</p>
			</template>
		</Modal>
```

- this.$store.dispatch('saveUserName',res.username) 这句等同下面3条语句
	      1.import { mapActions } from 'vuex' 【导入vuex的actions，用于actions方法很多的情况，这里就尝试下新形式】
	      2. ...mapActions(['saveUserName']) 【参数是个数组用于字符串存放方法名，即结构actions中的saveUserName()方法，这里就直接可以使用该方法】
	      3. this.saveUserName(res.username)  【正常使用该方法，传递参数】

- 获取动态路由后面的参数： （如获取参数32， http://localhost:8080/#/product/32）
	  const id = this.$route.params.myid    【注意：动态路由params参数是自己定义的名字，为myid】
	  【注： this.$router.push('/login') 是路由跳转，注意区分】

- cookie中的userid应该做成token（进行加密后的凭证来传输）

- 路由带参数跳转，有如下两种方式：
```
【注：用params传参不显示在url地址上；而用query传参回显示在url地址上】  
// 方法一：（效果等同法二，不过该方式参数'?键名=值名'不显示在url上）
  this.$router.push({
     name: 'index',
     params: {
       键名: 值名
     }
   })
   
   // 方法二：（参数‘值名’显示在url上，且跳转到页面/index也不消失）
   this.$router.push({
     path: '/index',
     query: {
       键名: 值名
     }
   })
```

- [变量] ：加载变量 
```
 components: {
   // [变量]表示加载变量， Pagination.name就是el-pagination
   [Pagination.name]: Pagination,
 }
```

- axios使用请求的注意点：
```
// 【注】get请求的传参需要写在params中
axios.get('url',{
	params: {
		参数名：值
	}
}).then(function (response) {}).catch(function (error) {}）

// post请求的传参直接写在第二个参数对象中（无需再写在params里）
axios.get( 'url',{ 参数名：值 } ).then(function (response) {}).catch(function (error) {}）
```

- 打开新窗口的方式：
		JS代码控制： window.open('url','_blank')，
		html标签控制： <a href='url' target="_blank"></a>

- CSS属性：
	// 该属性挺好用，设置border-box后，不用管padding对原来设置的width影响，padding值都算在width内了
		 box-sizing: border-box;
		 
- <img>标签的src可以存放.svg的矢量图
```
<img src='/imgs/loading-bars.svg' alt='一个svg图片'/> 
```

# 项目目录
  * public： 一般放大图片，
  * src/assets： 放小图片，可以转成base64，不用请求图片资源
  	* src/assets/scss/reset.scss ：重置浏览器的样式，防止默认浏览器样式干扰
  	* src/assets/scss/mixin.scss ：一般放置css函数，即抽取出来复用高的css属性，如span设置图标、flex布局都可以抽离出来，使用函数替代
  	* src/assets/scss/base.scss ：抽取的一些公共样式，即多处相同类名设置相同的css属性，需要抽离出来，提高代码复用

  * src/components： 一般放页面组件   ———— 命名方式用大头驼峰命名：如 NavHeader.vue
  * src/views： 放页面（需要单独配置路由的页面） ———— 命名方式用小写：如 index.vue、 home.vue

  * src/router/index.js： 路由的配置
  * src/store/index.js： vuex状态管理
  * src/storage： 这里放置缓存sessionStorage、cookie、localStorage等存取以及删除等公共方法，便于操作缓存（虽然已经缓存提供了一些API，但自己封装的能根据项目而定）

  * env.js： 该配置文件是自己抽取出来的,根据CORS和JSONP跨域才做此设置，接口代理跨越则不需要这个
  	- .env.prev: 是自定义vue.config.js --mode=prev(名称为prev自定义的)，且env.js中也要对应prev  
 
 
# 项目简介
 * public文件夹： 是项目的根目录，即 '/imgs/logo.png'来引用public下的资源

* main.js：
	* 全局配置，这里配置router、store、Vue, 一些各个.vue页面通用的插件放入Vue.use(VueCookie)中
	* 使用图片懒加载插件，加载内容时，显示loading指向的.svg矢量图(可根据自己需要改变)
		import VueLazyLoad from 'vue-lazyload'
		Vue.use(VueLazyLoad, {
	  		loading: '/imgs/loading-svg/loading-bars.svg'
		})

* APP.vue：（别忘记了，单页面App.vue要设置个< router-view >标签）
```
 <div id="app">
    <router-view></router-view>
 </div>
 // 用<router-view>显示路由配置的.vue页面
```

* views中：
	- detail.vue、 index.vue、 product.vue 将放入home.vue的<router-view>中（为什么这么写，因为detail、index、product三个页面都包含相同的头部导航和底部导航，所以另起一个home.vue来存放相同部分，不同部分单独替换<router-view>，这样复用性更高）
	【注意】这里其实可以就写成detail.vue、 index.vue、 product.vue三个页面，配置对应单独的路由，不过相比上面的写法，需要每个页面中单独各引一次头部导航和底部导航，代码复用性差点，效果却一样。

	- orderConfirm.vue、 orderList.vue、 orderPay.vue、 alipay.vue 将放入order.vue的<router-view>中，复用了相同的头部导航和底部栏。

* router/index.js：
```
  // 动态路由(即url中可加参数并获取)：
  // http://192.168.0.107:8080/product/id(一个参数)
  path: '/product/:id',
  name: 'product',
  component: Product
```
## 主要使用的插件/库
* axios / vue-axios
* element-ui
* vue-lazyload
* vue-awesome-swiper
* vue-cookie
* qrcode
