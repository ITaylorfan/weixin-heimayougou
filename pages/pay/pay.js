// pages/cart/cart.js
import { ShowToast, RequestPayment } from "../../utils/asyncFunction"
import { Request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalMoney: 0,
    totalNum: 0
  },
  async handleCreateOrder() {
    // 判断缓存有没有token
    const token = wx.getStorageSync("token")
    //判断
    if (!token) {
      //跳到授权页面
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      console.log("已存在token")
      // 存在token可以向后台发送数据接收订单数据
      // 1.请求头 已在请求方法中封装
      // const header = { Authorization: token }
      // 2.请求体参数
      const order_price = this.data.totalMoney
      const consignee_addr = this.data.address.all
      // 订单数组 商品id 购买的数量	单价
      let goods = []
      this.data.cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.goods_number,
        goods_price: v.goods_price
      }))
      const orderData = {
        order_price,
        consignee_addr,
        goods
      }
      try {
        //传给后台生成订单  获得订单编号
        const res = await Request({ url: "/my/orders/create", method: "post", data: orderData })
        const { order_number } = res.data.message
        console.log(order_number)
        // 发起预支付 生成预支付参数
        const pay = await Request({ url: "/my/orders/req_unifiedorder", method: "post", data: { order_number }})
        const payParams = pay.data.message.pay
        console.log(payParams)
        // 调用微信付款
        const payment = await RequestPayment(payParams)
        console.log(payment)

        //查询订单状态
        const payState = await Request({ url: "/my/orders/chkOrder", method: "post", data: { order_number } })
        console.log(payState)
        await ShowToast("支付成功")
        // 删除购物车已经支付的商品
        const cart = wx.getStorageSync("cart")
        // 新数组只保留 未付款的东西   未选中即为未付款
        const newCart=cart.filter(v=>!v.checked)
        // 覆盖掉缓存中的内容
        wx.setStorageSync("cart",newCart)
        // 跳转到订单页面
        wx.navigateTo({
          url: '/pages/order/order',
        });
        
      } catch (error) {
        await ShowToast("支付失败")

      }


    }

  },
  //对购物车进行封装
  setCart(cart) {
    //every方法所有都满足条件(true)才返回true
    //注意空数组直接返回true  0为false

    //const allChecked=cart.length?cart.every(v=>v.checked):false
    //用到两次循环 优化到下面一个循环中
    let totalMoney = 0
    let totalNum = 0

    cart.forEach(v => {
      if (v.checked) {
        totalMoney += v.goods_price * v.num
        totalNum += v.num
      }
    });

    this.setData({
      cart,
      totalMoney,
      totalNum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("show")
    //读取收货地址缓存
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    //过滤掉未选中的
    cart = cart.filter(v => v.checked === true)
    //处理函数
    this.setCart(cart)
    this.setData({
      address
    })
    //console.log(this.data.address)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})