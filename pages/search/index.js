import { request } from "../../request/index.js";
// 为了可以使用es7的 async await 来发送请求
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goods:[],
    // 取消按钮 是否显示
    isFocus:false,
    inpValue:''
  },
  // 防抖定时器
  TimeId:-1,
  // 输入框的值改变 就会触发的事件
  handleInput(e){
    // 1 获取输入框的值
    const {value}=e.detail;
    // 2 检测合法性
    if(!value.trim()){// trim()方法 去掉两边空字符
      // 搜索框为空数组 则清空goods历史记录 以及隐藏 取消按钮
      this.setData({
        goods:[],
        isFocus:false
      })
      // 即当快速删除搜索内容时 防止搜索结果定时器还未将结果返回再显示
      clearTimeout(this.TimeId);
      // 即检测是否是空字符串 值不合法直接返回
      return;
    };
    this.setData({
      isFocus:true
    })
    // 防抖 
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(()=>{
      // 3 准备发起请求 获取数据
      this.qsearch(value);
    },1000);
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query){
    const res = await request({url:'/goods/qsearch',data:{query}});
    this.setData({
      goods:res
    })
  },
  // 点击取消之后
  handleCancel(){
    this.setData({
      inpValue:'',
      isFocus:false,
      goods:[]
    })
  }
})