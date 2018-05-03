//app.js
App({
  onLaunch: function () {

    //调用API从本地缓存中获取数据
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求    
          console.log("发起网络请求",res.code)
          //that.globalData.openid = res.code
          wx.request({
            url: 'http://120.27.100.219:54231/common/get_wx_openid',
            header: {
              'content-type': 'application/json',
              'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

            },
            method: 'POST',
            data: {
              code: res.code
            },


            success: function (event) {
              console.log(event.data.data.wx_openid)
              wx.setStorage({
                key: "openId",
                data: event.data.data.wx_openid
              })
              
            }

          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });   
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {

          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
          
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    loginDet:false
  }
})