import { request } from "../../request/index.js";
// 为了可以使用es7的 async await 来发送请求
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  // 监听页面加载
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList();
  },
  // 获取列表数据
  async getGoodsList(){
    const res = await request({url:'/goods/search',data:this.QueryParams});
    // console.log(res);
    const total = res.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      // 拼接数组 
      goodsList:[...this.data.goodsList,...res.goods]
    });
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh();
      
  },
  // 处理点击事件 从子组件传递过来的
  handletabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom(){
    // 判断是否有下一页
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页
      wx.showToast({title:"没有下一页数据了"});
    }else{
      // 有下一页
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 页面下拉事件
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    });
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 重新发送请求
    this.getGoodsList();
  }
})