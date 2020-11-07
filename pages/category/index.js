import { request } from "../../request/index.js";
// 为了可以使用es7的 async await 来发送请求
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/index.js
Page({
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightContent:[],
    // 左侧被点击的菜单索引
    currentIndex:0,
    // 设置右侧距离顶部的值
    scrollTop:0
  },
  // 接口返回的数据---Cates只在.js中内部方法之间应用
  Cates:[],
  // 页面加载
  onLoad: function (options) {
    /*
     web中的本地储存和小程序中的本地储存的区别
        1 代码不同 
          web:   localStorage.setItem("key","val") localStorage.getItem("key")
          小程序：wx.setStorageSync("key","val") wx.getStorageSync("key")
        2 存取数据时 是否需要做类型转换
          web:不管存入什么类型的数据,都需要调用toString(),把数据类型变成字符串再存入
          小程序:不存在数据类型转化操作 存什么类型数据进去 获取时就是何种类型
     缓存思路步骤
        1 先判断本地储存中是否有旧数据
        2.1 没有旧数据 直接发送请求
        2.2 有旧数据 且旧数据没过期就使用本地存储数据 过期直接发送请求
    */
    const Cates = wx.getStorageSync("cates");
    
    if(!Cates){
      // 本地不存在数据 发送获取数据
      this.getCates();
    }else{
      // 存在 有旧数据
      if(Date.now()-Cates.time>1000*50){
        // 1 旧数据过期 大于50s 则重新发请求获取
        this.getCates();
      }else{
        // 2 旧数据未过期 则直接使用
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
      
    
  },
  // 获取分类数据
 async getCates(){
    // 使用es7的async await语法
    const result = await request({url:"/categories"});
    this.Cates = result;
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    });

    // 不应有async await之前的原始代码
    // request({url:"/categories"})
    // .then(result=>{
    //     // console.log(result);
    //     this.Cates = result;
    //     // 把接口请求的数据存入本地储存中 命名为cates
    //     wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});

    //     // map是指对数组中的每一项执行给定函数,并返回执行后结果组成的数组
    //     let leftMenuList = this.Cates.map(v=>v.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    // })
  },
  // 左侧边栏的点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    // 点击左边栏的分类 联动切换右边的内容
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 再点击之后 设置右侧内容距离顶部的值
      scrollTop:0
    })
  }
})