// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放用户信息
    bgUrl:"http://itaylorfan.top:8081/materials/MusicPlayer/bg.jpg",
    userInfo:{},
    collectNum:0
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
    let userInfo=wx.getStorageSync("userInfo")||{};
    //获取收藏个数
    let collect=wx.getStorageSync("collect")||[];
    let collectNum=collect.length

      // 赋值
      this.setData({
        userInfo,
        collectNum
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