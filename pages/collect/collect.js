// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        index:0,
        title:"商品收藏",
        isActive:true
      },
      {
        index:1,
        title:"品牌收藏",
        isActive:false
      },
      {
        index:2,
        title:"店铺收藏",
        isActive:false
      },
      {
        index:3,
        title:"浏览器收藏",
        isActive:false
      }
    ],
    //收藏数据列表
    collectList:[]
  },
  handleItemChange(e){
    //console.log(e)
    //获取传过来的下标
    let {index}=e.detail
    // 获取源数据
    let {tabs}=this.data 
 
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //覆盖原值
    this.setData({
      tabs
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
    let collectList=wx.getStorageSync("collect")||[];
    this.setData({
      collectList
    })
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