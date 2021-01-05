// pages/cart/cart.js
import { DeleteGoods, ShowToast } from "../../utils/asyncFunction"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    //全选
    allChecked: false,
    totalMoney: 0,
    totalNum: 0
  },
  //结算
  async handlePay() {
    if (this.data.totalNum === 0) {
      const res = await ShowToast("未选择任何商品");
    } else if (!this.data.address.userName) {
      const res = await ShowToast("未选择收货地址");
    } else {
      // 不能调tabbar页面
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }

  },
  //数量加减
  async handleCalcNum(e) {
    let { operation, id } = e.currentTarget.dataset
    let { cart } = this.data
    //找到商品下标
    let index = cart.findIndex(v => v.goods_id === id)
    // operation===1?cart[index].num++:cart[index].num--
    // console.log(cart)
    if (operation === -1 && cart[index].num === 1) {
      // 这里面是模态框方法
      const res = await DeleteGoods("确定要删除吗"); //异步转同步  阻塞下面方法执行
      if (res.confirm) {
        // console.log("确定")
        //删除一项
        cart.splice(index, 1)

      } else {
        // console.log("取消")
      }
    } else {
      //正常加减
      cart[index].num += operation
    }
    // console.log(cart)
    this.setCart(cart)
  },
  //全选反选
  handleChangeAllChecked() {
    let { cart, allChecked } = this.data
    //全选状态取反
    allChecked = !allChecked
    //遍历数组
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)

  },
  handleCheckBoxChange(e) {
    console.log(e)
    //获取传过来的id
    let { id } = e.currentTarget.dataset
    let { cart } = this.data
    //找到下标
    let index = cart.findIndex(v => v.goods_id === id)
    //对值取反
    cart[index].checked = !cart[index].checked
    //把改变后的cart数组传入cart处理方法
    this.setCart(cart)
  },
  handleChooseAddress() {
    // 调用自带api 获取地址  用户点击取消后无法再次获取
    // 已经更新 不用获取权限 可以直接使用该方法
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
        //同步存入缓存
        result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
        wx.setStorageSync("address", result);
      },
      fail: (error) => {
        console.log(error)
      },
      complete: () => { }
    });

    // 获取用户权限
    // wx.getSetting({
    //   success: (result)=>{
    //     console.log(result)
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  },

  //对购物车进行封装
  setCart(cart) {
    //every方法所有都满足条件(true)才返回true
    //注意空数组直接返回true  0为false

    //const allChecked=cart.length?cart.every(v=>v.checked):false
    //用到两次循环 优化到下面一个循环中
    let allChecked = true
    let totalMoney = 0
    let totalNum = 0

    cart.forEach(v => {
      if (v.checked) {
        totalMoney += v.goods_price * v.num
        totalNum += v.num
      } else {
        //未选中
        allChecked = false
      }
    });

    //判断cart为空的情况
    allChecked = cart.length ? allChecked : false

    this.setData({
      cart,
      allChecked,
      totalMoney,
      totalNum
    })
    //存入缓存
    wx.setStorageSync("cart", cart);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("aaa")
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
    console.log("show")
    //读取收货地址缓存
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
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