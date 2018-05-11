//app.js
App({
  onLaunch: function () {

    //调用API从本地缓存中获取数据
    // var that = this
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    /*是否登录  更新状态*/
    var _this = this;

    /**20180511 因微信接口更改进行技术重构 */
    wx.getStorage({
      key: 'login',
      success: function (res) {
        console.log("login", res.data)
        if (res.data) {
      
        }else{
       
        }
      },
      fail:function(){
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求    
              console.log("发起网络请求", res.code)
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
                 // let user = [event.data.nickName, event.data.avatarUrl]
                 // console.log(user)
                  wx.setStorage({
                    key: "openId",
                    data: event.data.data.wx_openid
                  });
                  
                  //20180511重构2暂时 取消基本信息
                  // wx.getUserInfo({
                  //   success: function (resuser) {
                  //     //let user = [resuser.data.nickName, resuser.data.avatarUrl]
                  //     wx.setStorage({
                  //       key: "user",
                  //       data: resuser.userInfo
                  //     })
                  //     console.log(resuser.userInfo)
                  //   },
                  //   fail: function () {
                  //     // 调用微信弹窗接口
                  //     wx.showModal({
                  //       title: '警告',
                  //       content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                  //       success: function (res) {
                  //         if (res.confirm) {
                  //           console.log('用户点击确定')
                  //         }
                  //       }
                  //     })
                  //   }
                  // })
                }

              })

            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })

   
  },
  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {

  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //              typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
          
  //       }
  //     })
  //   }
  // },
  globalData:{
    userInfo:null
  }
})