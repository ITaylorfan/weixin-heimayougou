// pages/search/search.js
import { Request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索到的数据
    queryList: [],
    isFocus:false,
    inputValue:""
  },
  //全局定时器
  Timer:-1,
  //输入触发方法
  handleInput(e) {
    // console.log(e.detail.value)
    let query = e.detail.value
    // 排除空格
    if (!query.trim()) {
      return
    }
    this.setData({
      isFocus:true
    })
    // 防抖处理 阻止过多请求  原本每输入一个字符就会触发查询函数
    clearTimeout(this.Timer)
    this.Timer=setTimeout(() => {
      this.getQueryList(query)
    }, 1000)

  },
  // 获取查询内容
  async getQueryList(query) {
    const res = await Request({ url: "/goods/qsearch", data: { query } })
    this.setData({
      queryList:res.data.message
    })
    //console.log(res)
  },

  //取消函数
  handleCancel(){
    this.setData({
      queryList:[],
      isFocus:false,
      inputValue:""
    })
    //清除定时器
    clearTimeout(this.Timer)
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