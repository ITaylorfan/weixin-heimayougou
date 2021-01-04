// pages/order/order.js
import { Request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab栏的数据
    tabs:[
      {
        index:0,
        title:"全部",
        isActive:true
      },
      {
        index:1,
        title:"待付款",
        isActive:false
      },
      {
        index:2,
        title:"待发货",
        isActive:false
      },
    ],
    orders:[]
  },
  handleItemChange(e){
    //console.log(e)
    //获取传过来的下标
    let {index}=e.detail
    // 获取源数据
    let {tabs}=this.data 
    // tabs.forEach((v,i)=> {
    //   if(i===index){
    //     v.isActive=true
    //   }else{
    //     v.isActive=false
    //   }
    // });
    //可以简写为
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //覆盖原值
    this.setData({
      tabs
    })

    // 点击tab栏获取数据
    this.getOrder(index+1)
  },

  // 根据order值设置 tab栏显示的内容
  setTabBarTitle(order){
    let {tabs}=this.data 
    tabs.forEach((v,i)=>i===order-1?v.isActive=true:v.isActive=false);
    //覆盖原值
    this.setData({
      tabs
    })
  },


  // 获取订单列表的方法
  async getOrder(type){
    const token=wx.getStorageSync("token")
    if(token){
      const res=await Request({url:"/my/orders/all",data:{type}})
      console.log(res)
      const {orders}=res.data.message
      this.setData({
        // 对时间戳进行格式化  *1000转化为毫秒时间戳
        orders:orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
      })
    }else{
      wx.navigateTo({url: '/pages/auth/auth'});
    }
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("load")
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
    // 没有option参数  所以不能直接获取页面传过来的 数据
    // console.log(options)

    // 获取页面栈的方法  最大支持10个页面
    // 当前页面在页面栈 的索引最大
    let pages=getCurrentPages();
    let {type}=pages[pages.length-1].options
    // console.log(pages[pages.length-1])

    // 设置tab栏
    this.setTabBarTitle(type)
    //调用获取订单的方法
    this.getOrder(type)
    
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