//app.js
var common = require('/utils/common.js');
App({
  data: {
    deviceInfo: {}
  },
  onLaunch: function () {
    this.data.deviceInfo = wx.getSystemInfoSync();

    // console.log(this.data.deviceInfo);
    //调用API从本地缓存中获取数据
     var that = this
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
          //更新全局变量方式 20180515
          _this.globalData.login = res.data
          typeof cb == "function" && cb(that.globalData.login)
                  //更新全局变量结束 20180515
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
                url: 'https://api.17liepin.com/api/common/get_wx_openid',
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
                  });
                  
                  //更新全局变量方式 20180515
                  _this.globalData.oppenid = event.data.data.wx_openid
                  typeof cb == "function" && cb(that.globalData.oppenid)
                  //更新全局变量结束 20180515
                }

              })

            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })
   /**设置职位列表与证书列表 */
 
  
    try {
      var value = wx.getStorageSync('Jobl')
      if (value) {
        //更新全局变量方式 20180515
        _this.globalData.Jobl = value
        typeof cb == "function" && cb(that.globalData.Jobl)
            //更新全局变量结束 20180515
      }else{
        common.request('sort/get_job_type', {
          params: {},
          success: function (res) {
           // console.log('获取列表', res.data.data.list);
            wx.setStorageSync('Jobl', res.data.data.list)

            //更新全局变量方式 20180515
            _this.globalData.Jobl = res.data.data.list
            typeof cb == "function" && cb(that.globalData.Jobl)
            //更新全局变量结束 20180515
          }
        })
      }

    } catch (e) {
      //错误执行
    }

    try {
      var value = wx.getStorageSync('CRL')
      if (value) {
        //更新全局变量方式 20180515
        _this.globalData.CRL = value
        typeof cb == "function" && cb(that.globalData.CRL)
        //更新全局变量结束 20180515
      } else {
        common.request('sort/get_ger_type', {
          params: {},
          success: function (res) {
            // console.log('获取列表', res.data.data.list);
            wx.setStorageSync('CRL', res.data.data.list)

            //更新全局变量方式 20180515
            _this.globalData.CRL = res.data.data.list
            typeof cb == "function" && cb(that.globalData.CRL)
            //更新全局变量结束 20180515
          }
        })
      }

    } catch (e) {
      //错误执行
    }

  },

  globalData:{
    userInfo:null,//用户共用的基本信息
    oppenid:null,//用户的openID
    login:null,//用户的登录凭证
    city:null,//编辑页的城市选择
    empower:null,//授权标识值
    Jobl:[],//职位列表
    CRL:[],//证书列表
    deleTitle:14,//title值
    ResumeFull: {
     },
     resumePart: {
     }
  }
})