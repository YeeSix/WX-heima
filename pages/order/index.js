import { request } from "../../request/index.js";
// 为了可以使用es7的 async await 来发送请求
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    orders:[
      {
        "order_id": 428,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": 1564731518,
        "update_time": 1564731518,
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      },
      {
        "order_id": 429,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": 1564731518,
        "update_time": 1564731518,
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      },
      {
        "order_id": 430,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": 1564731518,
        "update_time": 1564731518,
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      },
      {
        "order_id": 431,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": 1564731518,
        "update_time": 1564731518,
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      },
      {
        "order_id": 432,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": 1564731518,
        "update_time": 1564731518,
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      }
    ],
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"代付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
  },
  onShow(){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url:"/pages/auth/index"
      });
      return;
    }
    // 1 获取当前的小程序的页面栈-数组 长度最大的是10
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    // 根据type值来传入index 激活选中对应tabs中的标题
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },
  // 获取订单列表
  async getOrders(type){
    // 此处需要header 即Authorize:token 不是企业号拿不到token 所以此处授权也拿不到数据
    const token =wx.getStorageSync("token");
    const header={Authorization:token};
    const res = await request({url:"/my/orders/all",data:{type}},header);
    this.setData({
      // 没授权 无数据
      // orders:res.orders
    })
    // 对模拟数组orders的订单事件做处理
    this.setData({
      orders:this.data.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 根据标题索引来激活选中的 标题数组
  changeTitleByIndex(index){
    // 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  // 处理点击事件 从子组件传递过来的
  handletabsItemChange(e){
    const {index} = e.detail;
    // 1 改变选中标题样式
    this.changeTitleByIndex(index);
    // 2 重新发起请求 type=1 index=0
    this.getOrders(index+1);
  }
})

