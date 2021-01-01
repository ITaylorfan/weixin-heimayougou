//Page Object
import { Request } from "../../request/index"
Page({

  data: {
    swiperData: [],
    catesData:[],
    floorData:[]
  },
  // 获取楼层信息
  getFloorData(){
    Request({url:"/home/floordata"})
    .then(success=>{
      this.setData({
        floorData: success.data.message
      })
      //console.log(this.data.floorData)
    },error=>{
      console.log(error)
    })
  },

  // 获取轮播图数据
  getSwiperData(){
    Request({ url: "/home/swiperdata" })
    .then(success => {
      this.setData({
        swiperData: success.data.message
      })
    }, error => {
      console.log(error)
    })
  },
  // 获取分类信息
  getCatesData(){
    Request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
    .then(success => {
      this.setData({
        catesData: success.data.message
      })
    }, error => {
      console.log(error)
    })
  },

  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',  
    //   success: (result)=>{
    //     //console.log(result)
    //     this.setData({
    //       swiperData:result.data.message
    //     })
    //     //console.log(this.data.swiperData)
    //   },
    //   fail: ()=>{
    //     console.log("轮播图接口出错！")
    //   },
    //   complete: ()=>{}
    // });

    /* 对上面的方法进行封装 */
    this.getCatesData();
    this.getSwiperData();
    this.getFloorData();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});