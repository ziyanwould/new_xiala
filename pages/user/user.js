//index.js
var common = require('../../utils/common.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎',
    userInfo: {},
    person:"集众人之力，成细节之美！",
    influence:"17",
    influence_per:"20.6%",
    jobList:[
      {
       "name":"投递记录",
       "id":"0",
       "pic": "wx_record",
       "url":"../child/deliver/deliver",
      },
      {
        "name": "职位收藏",
        "id": "1",
        "pic": "wx_collect",
        "url":"../child/position/position"
      }
      // {
      //   "name": "反馈",
      //   "id": "2",
      //   "pic": "wx_retroaction",
      //   "url":"../child/couple/couple"
      // }
      , {
        "name": "访客",
        "id": "3",
        "pic": "wx_footprint",
        "url": "../child/visitor/visitor"
      }
    ],
    key:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onShow: function () {
    /*是否登录  更新状态*/
    var _this = this;
    wx.getStorage({
      key: 'login',
      success: function (res) {

        if (res.data) {
          _this.setData({
            items: {
              show: false
            }
          })
        }
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    /*是否登录*/
    wx.getStorage({
      key: 'login',
      success: function (res) {

        if (res.data) {
          that.setData({
            key:true
          })
        }
      }
    })


    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
   onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
   jumpToMyPage: function (event) {
     if (this.data.key) {
       wx.navigateTo({
         url: event.currentTarget.dataset.url
       })
     }else{
       var self = common.tanchu()
       this.setData({
         items: {
           height: self,
           masTitle: "",
           show: true
         }
       });
     }
 
   },
   
  //路由跳转等
  urlTo: function () {
    var url = '/pages/child/Login/Login?line_type=1';
    common.SomeThing(url);

  },
  urlTo2: function () {
    var url = '/pages/child/Login/Login?line_type=2';
    common.SomeThing(url);

  },
  urlclose: function () {
    this.setData({
      items: {
        show: false
      }
    });
  }
  ,
  //获取手机号
  getPhoneNumber: function (e) {
    let that = this;
    console.log("errMsg", e.detail.errMsg)
    console.log("vi", e.detail.iv)
    console.log("encryptedData", e.detail.encryptedData)
    var child_iv = e.detail.iv
    var child_encryptedData = e.detail.encryptedData
    //
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {


        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
          that.setData({
            items: {
              show: false
            },
            key:true
          });
        
          //获取openId
          wx.getStorage({
            key: 'openId',
            success: function (res) {
              console.log(res.data)

              //解析手机号
              wx.request({
                url: 'http://120.27.100.219:54231/common/wx_login_phone',
                header: {
                  'content-type': 'application/json',
                  'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

                },
                method: 'POST',
                data: {
                  openid: res.data,
                  encryptedData: child_encryptedData,
                  iv: child_iv
                },


                success: function (res) {
                  console.log("登录凭证", res.data)
                  wx.setStorage({
                    key: "login",
                    data: res.data.data.login_token
                  })

                }

              })
            }
          })
        }
      })
     
    }
  }
})
