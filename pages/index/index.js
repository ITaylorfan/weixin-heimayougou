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
      console.log(success.data.message[0].product_list[0].navigator_url.replace("?","/goods_list?"))
      console.log(success.data.message)
      success.data.message.forEach((item,index)=>{
        item.product_list.forEach((item,index)=>{
          item.navigator_url=item.navigator_url.replace("?","/goods_list?")
        })
      })
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
      // console.log(success.data.message[0].navigator_url.indexOf("main"))
      // console.log(success.data.message[0].navigator_url.replace("main","goods_detail"))
      //对轮播图进行链接修改
      success.data.message.forEach((item,index)=>{
        item.navigator_url=item.navigator_url.replace("main","goods_detail")
      })

      this.setData({
        swiperData: success.data.message
      })
    }, error => {
      console.log(error)
    })
  },
  // 获取分类信息
  getCatesData(){
    Request({ url: "/home/catitems" })
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