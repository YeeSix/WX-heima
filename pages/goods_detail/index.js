import { request } from "../../request/index.js";
// 为了可以使用es7的 async await 来发送请求
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goodsObj:{},
    // 商品是否被收藏
    isCollect:false
  },
  // 商品对象
  GoodsInfo:{},
  onShow: function (options) {
    // onShow不能直接拿到options参数 (onLoad可以)
    let pages =  getCurrentPages();
    // 获取当前页面 
    let currentPage = pages[pages.length-1];
    const {goods_id} = currentPage.options;
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const res = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=res;
    // 1 获取缓存中商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.pics
      },
      isCollect
    })
  },
  // 点击轮播图 放大预览
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd(){
    // 1 获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart')||[];
    // 2 判断当前商品是否存在于购物车数组  
    // findIndex找到满足条件的项时返回其索引值 未找到返回-1
    let index = cart.findIndex(v=> v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      // 3.1 该商品不存在于购物车 第一次添加
      // 并为该商品添加一个num计数属性
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      // 3.2 已经存在 只要让num计数属性++即可
      cart[index].num++;
    }
    // 4 把更改过的cart存入到本地内存中
    wx.setStorageSync('cart',cart);
    // 5 弹窗提示 加入成功
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
      

  },
  // 点击 商品收藏
  handleCollect(){
    let isCollect = false;
    //1 获取缓存中商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    //2 判断商品是否被收藏过
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index!==-1){
      // 3.1 已经收藏过了---则取消收藏
      collect.splice(index,1);
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else{
      // 3.2 未收藏---则收藏
      collect.push(this.GoodsInfo);
      isCollect =true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 将更新过的数据保存
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
      
  }
})