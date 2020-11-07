/**
 * 支付过程梳理 要想发起微信支付自带api(wx.requestPayment)
 * 1.1.就要先获取订单编号order_number
 * 1.2.获取订单编号order_number--就要先去获取Authorization(即token值)
 * 1.3.获取token值--就要先获取一系列值encryptedData,rawData,iv,signature,code 从而通过发起请求POST请求来获取token
 * 1.4.通过button的open-type就可以获取的encryptedData,rawData,iv,signature
 *     通过小程序登录wx.login就可以获取code
 * 2 获取订单号order_number之后 就可以发起请求来获取支付参数pay 
 * 3 将pay参数传入到微信自带支付api中(wx.requestPayment) 就可以发起并完成支付
 */
import { getSetting,openSetting,chooseAddress,showModel,showToast,requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    // 获取缓存中的收货地址
    const address = wx.getStorageSync("address");
    // 从本地缓存中获取cart数据
    let cart =wx.getStorageSync("cart")||[];
    // 过滤选中被勾选的购物车数组
    cart = cart.filter(v=>v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    // 保存到data数据中
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
  },
  // async handleOrderPay(){
  //   try {
  //     // 1 判断缓存中是否有token
  //     const token =wx.getStorageSync("token");
  //     // 2 判断
  //     if(!token){// 如果没有授权 先去授权页面获取token值
  //       wx.navigateTo({
  //         url: '/pages/auth/index'
  //       });
  //       return;
  //     }      
  //     // 3 创建订单----(此时拿到token值)
  //     // 3.1 准备 请求头参数
  //     const header={Authorization:token};
  //     // 3.2 准备 请求体参数
  //     const order_price = this.data.totalPrice;
  //     const consignee_addr = this.data.address.all;
  //     const cart = this.data.cart;
  //     let goods=[];
  //     cart.forEach(v=>goods.push({
  //       goods_id:v.goods_id,
  //       goods_number:v.num,
  //       goods_price:v.goods_price
  //     }));
  //     const orderParams = {order_price,consignee_addr,goods};
  //     // 4 准备发送请求 创建订单 获取订单编号order_number
  //     const {order_number} = await request({url:'/my/orders/create',method:"POST",data:orderParams,hander});
  //     // 5 发起预支付接口
  //     const {pay} = await request({url:'/my/orders/req_unifiedorder',method:"POST",data:{order_number},hander});
  //     // 6 发起微信支付 ----主要就是为了发起wx.requestPayment()自带api请求
  //     await requestPayment(pay);
  //     // 7 查询后台 订单状态
  //     const res = await request({url:'/my/orders/chkOrder',method:"POST",data:{order_number},hander});
  //     await showToast({title:"支付成功"});
  //     // 8 手动删除缓存中 已经支付的商品
  //     // 9 跳转到支付订单页面
  //     wx.navigateTo({
  //       url:"/pages/order/index"
  //     });
  //   } catch (error) {
  //     await showToast({title:"支付失败"});
  //     console.log(error);
  //   }
      
  // }

  // 不是企业账号 所以以下简单仿真
  async handleOrderPay(){
    const token =wx.getStorageSync("token");
    if(!token){
      // 没有token值跳去授权页面
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 假设授权后得到token 然后完成上述所有步骤 支付成功
    await showToast({title:"支付成功"});
    // 手动删除缓存中 已经支付的商品
    let newCart = wx.getStorageSync("cart");
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync("cart",newCart);
    wx.navigateTo({
      url:"/pages/order/index"
    });
  }
})