//对异步方法的封装


// 封装模态框方法
export const DeleteGoods=params=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: params,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#eb4450',
            success: (result) => {
                resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
            complete: ()=>{}
          });
    })

    
}

// 封装提示框方法
export const ShowToast=params=>{
    return new Promise ((resolve,reject)=>{
        wx.showToast({
            title: params,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result)=>{
              resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
            complete: ()=>{}
          });
    })
}

// 封装 获取用户Code方法
export const getLoginCode=()=>{
    return new Promise ((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
            complete: ()=>{}
        });
    })
}

// 封装微信支付方法
export const RequestPayment=params=>{
    return new Promise ((resolve,reject)=>{
        wx.requestPayment({
            // timeStamp: '',
            // nonceStr: '',
            // package: '',
            // signType: '',
            // paySign: '',
            ...params,
            success: (result)=>{
              resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
            complete: ()=>{}
          });
    })
}
