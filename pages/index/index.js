//引入Promise请求
import { request } from "../../request/index.js";

//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  // 页面开始加载时 就会触发
  onLoad: function(options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取 轮播图数据
  getSwiperList(){
    request({url: '/home/swiperdata'})
     .then(result=>{
        this.setData({
          swiperList:result
        })
     })
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     // console.log(result);
    //     this.setData({
    //       swiperList:result
    //     })
    //   }
    // });    
  },
  // 获取 分类导航数据
  getCateList(){
    request({url: '/home/catitems'})
     .then(result=>{
        this.setData({
          catesList:result
        })
     })   
  },
  // 获取 楼层数据
  getFloorList(){
    request({url: '/home/floordata'})
     .then(result=>{
        this.setData({
          floorList:result
        })
     })   
  }   
});
  