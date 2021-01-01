// pages/category/category.js
import { Request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalData: [],
    leftContent: [],
    rightContent: [],
    // 被点击的index
    currentIndex: 0,
    // 重置滚动条
    scrollTop: 0
  },

  // 获取分类页面的所有数据
  async getCategoriesData() {
    // Request({url:"/categories"})
    // .then(res=>{
    //   //console.log(res.data.message)

    //  //存放所有数据
    //   this.setData({
    //     totalData:res.data.message
    //   })

    //   // 存放进缓存中去
    //   wx.setStorageSync("cates",{time:Date.now(),data:res.data.message});

    //    // 左侧数据
    //   let leftContent;
    //   leftContent=res.data.message.map(v=>v.cat_name);
    //   // 右侧数据
    //   let rightContent;
    //   //根据下标获取右侧数据
    //   rightContent=res.data.message[this.data.currentIndex].children
    //   // 给data中的变量赋值
    //   this.setData({
    //     leftContent,
    //     rightContent
    //   })
    // },error=>{
    //   console.log(error)
    // })

    // 使用ES7的async 和 a  uest({ url: "/categories" });
    const res=await Request({url:"/categories"})
    console.log(res)
    this.setData({
      totalData: res.data.message
    })
    // 存放进缓存中去
    wx.setStorageSync("cates", { time: Date.now(), data: res.data.message });

    // 左侧数据
    let leftContent;
    leftContent = res.data.message.map(v => v.cat_name);
    // 右侧数据
    let rightContent;
    //根据下标获取右侧数据
    rightContent = res.data.message[this.data.currentIndex].children
    // 给data中的变量赋值
    this.setData({
      leftContent,
      rightContent
    })

    
  },
  // 点击切换
  leftItemHandle(e) {
    // console.log(e)
    let { index } = e.target.dataset
    let rightContent = this.data.totalData[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从本地缓存中同步获取缓存数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      //不存在 就重新获取
      this.getCategoriesData()
    } else {
      // 如果存在
      // 先判断本地缓存是否过期
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        // 过期了
        this.getCategoriesData()
      } else {
        // 没有过期 直接使用本地缓存数据
        // 左侧数据
        let leftContent;
        leftContent = Cates.data.map(v => v.cat_name);
        // 右侧数据
        let rightContent;
        //根据下标获取右侧数据
        rightContent = Cates.data[this.data.currentIndex].children
        // 给data中的变量赋值
        this.setData({
          leftContent,
          rightContent,
          totalData: Cates.data
        })
      }
    }

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