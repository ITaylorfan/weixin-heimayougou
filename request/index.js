//声明全局变量用于计算请求次数
let ajaxTimes=0;
// 封装请求方法
export const Request=params=>{
    ajaxTimes++
    wx.showLoading({
        title:"加载中" ,
        mask: true,
    });

    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result)=>{
                resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
            complete: ()=>{
                ajaxTimes--
                if(ajaxTimes===0){
                    //关闭正在加载的提示  解决 所有请求完成再关闭的小问题
                    wx.hideLoading()
                }
            }
        });
    })
}