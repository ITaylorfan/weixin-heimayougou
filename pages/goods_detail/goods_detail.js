// pages/goods_detail/goods_detail.js
import { Request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存放商品详情的数据
    detailData:{},
    //存放完整数据
    totalDetailData:{}
  },

  async getGoodData(data){
    const res=await Request({url:"/goods/detail",data})
    console.log(res)
    //存放完整数据
    this.setData({
      totalDetailData:res.data.message
    })
    // 数据冗余过多 只保存要用的数据
    this.setData({
      detailData:{
        // iphone不支持webp格式的图片
        // 1.解决方法一 找后台修改
        // 2.解决方法二 自己临时替换成jpg格式
        pics:res.data.message.pics,
        goods_price:res.data.message.goods_price,
        goods_name:res.data.message.goods_name,
        // 进行后缀名替换
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        goods_id:res.data.message.goods_id
      }
    })
  },

  prevImage(e){
    //console.log(e)
    //当前要预览的图片链接
    let current=e.target.dataset.url
    // 构造要预览的图片链接数组 pics_mid
    let urls=this.data.detailData.pics.map(v=>v.pics_mid)
    //console.log(urls)
    // 预览图片的方法
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  //加入购物车
  addIntoCart(){
    let cart=wx.getStorageSync("cart")||[];//如果不存在就创建一个空数组
    //返回下标   如果没有匹配就返回-1
    let index=cart.findIndex(v=>v.goods_id===this.data.totalDetailData.goods_id)
    if(index===-1){
      //本地缓存的购物车中没有 此条数据
      //如果没有该属性就创建一个
      this.data.totalDetailData.num=1
      //选中状态
      this.data.totalDetailData.checked=true
      //加入购物车数组
      cart.push(this.data.totalDetailData)
     
    }else{
      //存在该条数据 之间数量加一
      cart[index].num++
    }
     //存入缓存
     wx.setStorageSync("cart",cart);
     wx.showToast({
       title: '加入购物车成功',
       icon: 'none',
       image: '',
       duration: 1500,
       mask: true,  //防止不断点击
     });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getGoodData(options)
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