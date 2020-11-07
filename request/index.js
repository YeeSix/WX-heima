// 考虑到一个页面多个请求时 要等到所有数据加赞完之后 在关闭加载效果窗口
// 同时发送异步请求的次数
let ajaxTimes=0
export const request=(params)=>{
    ajaxTimes++;
    // 显示加载效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });
      
    // 定义公共的url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    // 数据都加载完之后关闭等待窗口
                    wx.hideLoading();
                }
            }
        });
    })
}