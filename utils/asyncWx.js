/**
 * promise形式的 getSetting
 */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}
/**
 * promise形式的 chooseAddress
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}
/**
 * promise形式的 openSetting
 */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}
/**
 * promise形式的 showModel
 */
export const showModel=({content})=>{
  return new Promise((resolve,reject)=>{
      wx.showModal({
        title: '提示',
        content: content,
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          resolve(result);
        },
        fail: (err) => {
          reject(err)
        }
      });
  })
}
/**
 * promise形式的 showToast
 */
export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
      wx.showToast({
        title:title,
        icon:"none",
          success:(result)=>{
              resolve(result);
          },
          fail:(err)=>{
              reject(err);
          }
      })
  })
}
/**
 * promise形式的 小程序发起支付页面的requestPatment
 */
export const requestPatment=(pay)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay,
      success: (result) => {
        reoslve(result);
      },
      fail: (err) => {reject(err)}
    });
  })
}
