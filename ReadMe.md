# 微信小程序--黑马应用整理

## 1.1 环境准备(详见微信小程序-基础.pdf)

* 需要先去小程序页面注册账号 获取到自己的appid
* 下载微信小程序开发者工具

## 1.2 项目搭建

* 搭建项目目录(例如styles,compponets,lib,utils,request)
* 搭建项目页面(index,goods_list,goods_detail,cart...)
* 引入字体图标
* 在app.json文件中搭建项目的tabbar

## 1.3 程序搭建过程中细节思路

### 1 子父组件通信

#### **1 如何实现子组件接收父组件信息传递**

* 举例子组件Tabs 父组件pages/goods_list/index
* 要求：在子组件Tabs.js的properties中声明父组件传过来的数据

``` /
<!-- 子组件Tabs.js接收 就可以当成data中的数据一样使用-->
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  }

<!-- 父组件通过Tabs标签发送数据 -->
  <Tabs tabs="{{tabs}}"></Tabs>
```

#### **2 如何实现在子组件触发父子间事件**

* 举例子组件Tabs 父组件pages/goods_list/index
* 要求：在子组件中触发父组件中的事件

```\
<!-- 父组件绑定一个事件 -->
<Tabs binditemChange="hanldeItemChange"></Tabs>

<!-- 子组件被点击时触发父组件事件 -->

<!-- 1 在.wxml中绑定触发点击事件函数 -->
<view bindtap="handleItemTap" data-index="{{index}}"></view>
<!-- 2 在.js的事件处理函数中触发父组件事件 同时还可以传回参数-->
handleItemTap(e){
  const {index} = e.currentTarget.dataset;
  this.triggerEvent('itemChange',{index});
}
```

#### 3 组件使用注意点

* 1 组件的js中方法要放在methods中,不能和data同层级保存
* 2 component组件被引用时,首先在父组件的json中声明,再在.wxml中写入标签使用
* 3 在子组件properties中接收的数据,使用时等同于自身的data数据

### 2 scroll-view组件滚动条效果实现

  应有微信自带api来实现 scroll-view组件

``` 例如
    <!-- scroll-view组件   -->
    <!-- scroll-y在y方向可以滑动 -->
    <!-- 设置scroll-top 设置滑动页面距离上窗口的值 scroll-top="{{scrollTop}}" -->
    <scroll-view scroll-y class="left_menu">
        <view class="menu_item {{index==currentIndex?'active':''}}"
        wx:for="{{leftMenuList}}"
        wx:key="*this">
            {{item}}
        </view>
    </scroll-view>
```

### 3 swiper组件轮播图

* 微信小程序自带api---swiper组件要配合swiper-item标签使用

```例
<!-- autoplay 自动播放 circular循环播放 indicator-dots轮播图原点 -->
    <swiper autoplay circular indicator-dots>
        <swiper-item
        wx:for="{{goodsObj.pics}}"
        wx:key="pics_id"
        bindtap="handlePreviewImage"
        data-url="{{item.pics_mid}}">
            <image mode="widthFix" src="{{item.pics_mid}}"></image>
        </swiper-item>
    </swiper>
```

### 4 小程序缓存和vue本地缓存

> web中的本地储存和小程序中的本地储存的区别

 1. 代码不同

      web:   localStorage.setItem("key","val")
              localStorage.getItem("key")

      小程序：wx.setStorageSync("key","val")
              wx.getStorageSync("key")

 2. 存取数据时 是否需要做类型转换

      web:不管存入什么类型的数据,都需要调用toString(),把数据类型变成字符串再存入

      小程序:不存在数据类型转化操作 存什么类型数据进去 获取时就是何种类型

### 5 支付过程

```\注:需要企业号才能测试
/**
 * 支付过程梳理 要想发起微信支付自带api(wx.requestPayment)
 * 1.1.就要先获取订单编号order_number
 * 1.2.获取订单编号order_number--就要先去获取Authorization(即token值)
 * 1.3.获取token值--就要先获取一系列值encryptedData,rawData,iv,signature,code 从而通过发起请求POST请求来获取token  (通过button的open-type="getUserInfo"就可以获取的encryptedData,rawData,iv,signature /通过小程序登录wx.login就可以获取code)
 * 2 获取订单号order_number之后 就可以发起请求来获取支付参数pay
 * 3 将pay参数传入到微信自带支付api中(wx.requestPayment) 就可以发起并完成支付
 */
```

### 方法总结

> 数组方法

.findIndex 对数组进行遍历 找到符合要求的项 返回其索引值 若没找到 返回-1

.some 对数组的每一项运行给定函数 若任意项返回true则返回true

.every 对数组的每一项运行给定函数 若每一项返回true则返回true

.map 返回值是运行给定函数调用结果组成的数组

.trim() 去除字符串两侧的空字符串

> [微信小程序api](https://developers.weixin.qq.com/miniprogram/dev/framework/)

```\
wx.previewImage({
  current: '', // 当前显示图片的http链接
  urls: [] // 需要预览的图片http链接列表
})
wx.showToast
wx.hideToast
wx.showModal
wx.getSetting
wx.openSetting
wx.chooseAddress
wx.requestPayment
```

### 知识点

#### 1.防抖节流

* 函数防抖--是指在频繁触发的情况下,只有足够的空闲时间,才会执行代码一次

* 函数节流---指在一定事件内js方法只执行一次

```\
  // 防抖定时器
  TimeId:-1,
  
  // 输入框的值改变 就会触发的事件
  handleInput(e){
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(()=>{
      console.log("防抖函数");
    },1000);
  }
```

#### 2.切换隐藏

* wx:if和hidden(1.hidden应用较多-用于频繁交换 2.wx:if wx:elif wx:else)

```\
<view>======</view>
<view hidden>隐藏1</view>
<view hidden="{{false}}">显示2</view>
<view hidden="{{true}}">隐藏3</view>
<view>======</view>

<!-- 结果 -->
======
显示2
======

```
