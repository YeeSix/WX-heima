import { getSetting,openSetting,chooseAddress,showModel,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  // 获取用户信息按钮----即拿到token值
  // async handleGetUserInfo(e){
  //   try{
  //     // 1 获取用户信息
  //     // 通过button的open-type就可以获取的encryptedData,rawData,iv,signature
  //     const {encryptedData,rawData,iv,signature}= e.detail;
  //     // 2 获取用户信息
  //     // 通过小程序登录wx.login就可以获取 code
  //     wx.login({
  //       timeout:10000,
  //       success: (result) => {
  //         const {code} = result;
  //       }
  //     });
  //     const loginParams = {encryptedData,rawData,iv,signature,code};
  //     // 3 发送请求 获取token值---(获取token值之前要求先获取用户信息就是loginParams)
  //     // 但此时若不是企业账号 则不能获取token值
  //     const {token} = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
  //     wx.setStorageSync("token",token);
  //     wx.navigateBack({
    //       delta:1 // 想要退几步
    //     })
    //   }catch(err){
      //     console.log(err);
      //   }
      // }
      
  // 不是企业账号 所以以下是简单跳转页面 假设授权成功
  async handleGetUserInfo(e){
    const token="值";
    wx.setStorageSync("token",token);
    wx.navigateBack({
      delta:1 // 想要退几步
    });
  }
})