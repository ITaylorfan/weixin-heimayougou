// pages/auth/auth.js
import {getLoginCode} from "../../utils/asyncFunction"
import {Request} from "../../request/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async getUserInfo(e){
    console.log(e)
    // 保存用户数据
    try{
      const {encryptedData,iv,rawData,signature}=e.detail
      // 获取微信登录成功之后的code
      const res=await getLoginCode();
      const {code}=res
      // console.log(code)
      let params={encryptedData,iv,rawData,signature,code}
      //发送请求获取token
      //无法获取token
      const resolve=await Request({url:"/users/wxlogin",data:params,method:"post"})
      console.log(resolve)
      //使用此token
      const token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      //获取成功后
      wx.setStorageSync("token",token);
      // 返回上一页 delta返回页数
      wx.navigateBack({
        delta: 1
      });
    }catch(error){
      console.log(error)
    }
   
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