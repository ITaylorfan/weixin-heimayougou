// pages/goods_list/goods_list.js

import { Request } from "../../request/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[],
    //tab栏的数据
    tabs:[
      {
        index:0,
        title:"综合",
        isActive:true
      },
      {
        index:1,
        title:"销量",
        isActive:false
      },
      {
        index:2,
        title:"价格",
        isActive:false
      }
    ]
  },
  //配置页面请求参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:20
  },
  totalPage:0,  //总页数
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
  },

  //获取商品数据
  async getGoodsListData(){
    const res=await Request({url:"/goods/search",data:this.QueryParams})
    console.log(res)
    let goodList=res.data.message.goods
    //总页数等于总条数除最大页面条数 向上取整
    this.totalPage=Math.ceil(res.data.message.total/this.QueryParams.pagesize)
    console.log(`%c 总页数为 : %c ${this.totalPage} `,'background: #606060; color: #fff; border-radius: 3px 0 0 3px;','background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;')
    
    //使用...运算符解决数组拼接
    this.setData({
      goodList:[...this.data.goodList,...goodList]
    })

    //停止页面刷新 关闭下拉效果  即使没有下拉也不会报错
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    //把页面传过来的参数赋值给 请求参数列表
    if(options.cid){
      this.QueryParams.cid=options.cid
    }else if(options.query){
      this.QueryParams.query=options.query
    }
    console.log(this.QueryParams)
    this.getGoodsListData()
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
   * 页面相关事件处理函数--监听用户下拉动作  下拉刷新
   */
  onPullDownRefresh: function () {
    //下拉刷新对 页面数据进行重置并 重新请求
    this.setData({
      goodList:[]
    })
    this.QueryParams.pagenum=1
    this.getGoodsListData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底了！")
    //判断是否有下一页
    if(this.QueryParams.pagenum>=this.totalPage){
      //最多七个字！
      wx.showToast({title: '没有下一页数据', });
      console.log(`%c 没有下一页了!`,'background: red; color: #fff;')
    }else{
      this.QueryParams.pagenum++
      //重新发送请求
      this.getGoodsListData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})