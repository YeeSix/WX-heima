/**
 * 获取收货地址流程
 * 1 绑定点击事件
 * 2 调用小程序内置api 获取用户的收货地址 wx.chooseAddress
 *    
 * Q：获取用户对小程序所授予获取地址的 权限状态scope
 *    1 假设用户 点击获取收货地址的提示框 确定 authSetting scope.address
 *      此时scope为true 可以直接获取
 *    2 假设用户 未调用过收货地址的api
 *      此时scope为undefined 可以直接获取
 *    3 假设用户 点击获取收货地址的提示框 取消
 *      此时scope为false 
 *      3.1 引导用户打开授权设置页面(wx.openSetting) 当用户开启 获取地址权限时
 *      3.2 自动跳转到获取地址页面  
 */
import { getSetting,openSetting,chooseAddress,showModel,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    // 获取缓存中的收货地址
    const address = wx.getStorageSync("address");
    // 将地址给data赋值
    this.setData({
      address
    });
    // 从本地缓存中获取cart数据
    const cart =wx.getStorageSync("cart")||[];
    // 在每次onshow时 渲染重置cart
    this.setCart(cart);
  },
  // 点击获取收货地址 
  async handleChooseAddress(){
    // 现在已取消对通信地址的权限认证
    try{
      // 1 获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断权限状态
      if(scopeAddress === false){
        // 3 如果之前取消授权地址权限 要先引导用户打开设置权限页面
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      // 存入到缓存中
      wx.setStorageSync("address", address);
    }catch(err){
      console.log(err);
    }
  },
  // 商品的选中状态
  handleItemChange(e){
    // 获取被修改选中状态的商品id
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;
    // 把购物车数据重新设置会data和缓存中
    this.setCart(cart);
  },
  // 设置购物车底部数据状态(总价格 总数量 全选按钮...)
  setCart(cart){
    // 计算全选 
    let allChecked=true;
    // 总价格
    let totalPrice = 0;
    // 总数量
    let totalNum = 0;
    // 1 计算选中商品的总数量和总价格
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    // 2 判读数组cart是否为空 若空则全选按钮置为false
    allChecked = cart.length? allChecked:false;
    // 3 将值保存到data数据中
    this.setData({  
      cart,
      allChecked,
      totalNum,
      totalPrice
    });
    // 存入本地缓存中
    wx.setStorageSync("cart", cart);
  },
  // 商品全选功能的切换
  handleItemAllChecked(){
    let {allChecked,cart}=this.data;
    // 改变全选状态
    allChecked = !allChecked;
    // 改变每一个的选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 重新渲染回缓存和data中
    this.setCart(cart);
  },
  // 单个商品数量编辑功能
  async handleItemNumEdit(e){
    // 1 获取单个商品的id 和 对商品的操作+- 
    const { operation,id } =e.currentTarget.dataset;
    let {cart} = this.data;
    // 2 得到在cart数组中的index值
    const index = cart.findIndex(v=>v.goods_id===id);
    // 3 判断对单个商品的操作 加/减/删除
    if(cart[index].num===1&&operation===-1){
      const res = await showModel({content:"是否删除该商品？"});
      if(res.confirm){//删除
        cart.splice(index,1);
      }
    }else{
      // 修改数量
      cart[index].num+=operation;
    }
    this.setCart(cart);
  },
  // 点击结算 并对当前购物车的地址和商品进行合法性校验
  async handlePay(){
    // 1 判断收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:'您还没有选择地址！'});
      return;
    }
    // 2 判断用户是否选购商品
    if(totalNum===0){
      await showToast({title:'您还没有选择商品！'});
      return;
    }
    // 3 跳转到 支付页面
    wx.navigateTo({
      url:'/pages/pay/index'
    });
  }
})