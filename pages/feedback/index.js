// pages/feedback/index.js
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品/商家投诉",
        isActive:false
      }
    ],
    chooseImgs:[],
    textVal:''
  },
  // 外网的图片路径数组
  UpLoadImgs:[],
  // 处理点击事件 从子组件传递过来的
  handletabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  // 点击 "+" 选择图片
  handleChooseImg(){
    // 调用小程序内部api
    wx.chooseImage({
      // 同时选中图片最多的数量
      count: 9,
      // 图片的格式 原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    });
      
  },
  // 点击删除图片
  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset;
    const {chooseImgs} = this.data;
    chooseImgs.splice(index,1);
    this.setData({chooseImgs});
  },
  // 文本域的输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交按钮的点击
  handleFormSubmit(){
    //  1 获取文本域的内容 图片数组
    const {textVal,chooseImgs}= this.data;
    // 2 合法性的验证
    if(!textVal.trim()){
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: false
      });
      return;
    }
    // 3 准备上传图片 到专门的图片服务器
    wx.showLoading({
      title: "正在上传中",
      mask: true,
    });
    // 判断有没有需要上传的图片数组
    if(chooseImgs.length!=0){// 1 需要提交文字和图片
      // 上传文件的api不支持多个文件同时上传 遍历数组 显示正在等待的图片
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          // 图片要传到哪里  
          // (路径有问题不能提交)
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          // 被上传的文件路劲
          filePath: v,
          // 上传的文件名称 后台来获取文件 file
          name: "file",
          success: (result) => {
            console.log(result); 
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);

            // 所有图片上传完毕了才触发
            if(i===chooseImgs.length-1){
              wx.hideLoading();
              console.log("文本内容和外网图片都提交到后台");
              // 重置页面
              this.setData({
                textVal:'',
                chooseImgs:[]
              })
              // 并且返回上一个页面
              wx.navigateBack({
                delta:1
              });
            }
          }
        });
      })
    }else{ // 只提交了文本
      console.log("只提交了文本");
      wx.hideLoading();
      // 模拟仿真
      wx.navigateBack({
        delta: 1
      });
    }
      
  }
})