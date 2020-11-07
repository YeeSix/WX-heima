// components/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRemoveImg(){
      // 触发父元素调用的 bindremoveImg绑定的函数
      this.triggerEvent("removeImg");
    }
  }
})
