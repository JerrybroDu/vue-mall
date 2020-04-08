<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>

    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in list" :key="index">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.productSelected}"  @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage">
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;"  @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>

    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
export default {
  name: 'index',
  components: {
    // 可以使用<order-header>或<OrderHeader>
    OrderHeader,
    ServiceBar,
    NavFooter
  },
  data () {
    return {
      list: [], // 商品列表
      allChecked: false, // 是否全选
      cartTotalPrice: 0, // 商品总金额
      checkedNum: 0// 选中商品数量
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    // 获取购物车列表
    getCartList () {
      this.axios.get('/carts').then((res) => {
        this.renderData(res)
      })
    },
    // 更新购物车数量和购物车单选状态
    updateCart (item, type) {
      let quantity = item.quantity
      let selected = item.productSelected
      if (type === '-') {
        if (quantity === 1) {
          this.$message.warning('商品至少保留一件')
          return
        }
        --quantity
      } else if (type === '+') {
        if (quantity > item.productStock) {
          this.$message.warning('购买数量不能超过库存数量')
          return
        }
        ++quantity
      } else {
        selected = !item.productSelected
      }
      this.axios.put(`/carts/${item.productId}`, {
        quantity,
        selected
      }).then((res) => {
        this.renderData(res)
      })
    },
    // 删除购物车商品
    delProduct (item) {
      this.axios.delete(`/carts/${item.productId}`).then((res) => {
        this.$message.success('删除成功')
        this.renderData(res)
      })
    },
    // 控制全选功能
    toggleAll () {
      const url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then((res) => {
        this.renderData(res)
      })
    },
    // 公共赋值
    renderData (res) {
      this.list = res.cartProductVoList || []
      this.allChecked = res.selectedAll
      this.cartTotalPrice = res.cartTotalPrice
      this.checkedNum = this.list.filter(item => item.productSelected).length
    },
    // 购物车下单
    order () {
      // 数组.every的功能：在数组中查找每一个元素是否有符合条件，符合返回true，不符合返回false。
      // 即每一项item.productSelected为false时(没有选中任意一件商品)符合条件返回true，即isCheck=true；
      // 只要有一项item.productSelected不为false，则isCheck=false
      const isCheck = this.list.every(item => !item.productSelected)
      if (isCheck) {
        this.$message.warning('请选择一件商品')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  }
}
</script>
<style lang="scss">
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>
