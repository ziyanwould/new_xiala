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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
    userInfo:"",
    key:false
  },
  onLoad: function () {
    console.log('我的onLoad')
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
    //应该用promise处理异步
    this.getuseinfomation();

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
            },
            key: true

          })
        } else {
          _this.setData({
            items: {
              show: false
            },
            key: false

          })
        }
      }
    })
    //应该用promise处理异步
    this.getuseinfomation();
   
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
    var that = this;
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
                  // that.getuseinfomation();
                  common.getinst()

                  setTimeout(function(){
                    common.setStronguser({
                      success: function (res) {
                        console.log("成功判断本地存储", res.data)
                        that.setData({
                          userInfo: res.data
                        })
                      }

                    })
                  }, 150)
                    
                 
                  
                 

                }

              })
            }
          })
        }
      })
     
    }
  }
  ,
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  /**点击登录 */
  loging:function(){
    var self = common.tanchu()
    this.setData({
      items: {
        height: self,
        masTitle: "",
        show: true
      }
    });
  },
  /**退出 */
  exit:function(){
    var that = this
    wx.showModal({
      title: '确认退出账号',
      content: '',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        
          wx.getStorage({
            key: 'login',
            success: function (res) {
              var fage = res.data
              wx.request({
                url: 'http://120.27.100.219:54231/common/login_out',
                header: {
                  'content-type': 'application/json',
                  'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
                  'login_token': fage

                },
                data:{
                  login_token: fage
                },
                method: 'POST',
                success: function (res) {

                  wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000
                  });
                  wx.removeStorage({
                    key: 'login',
                    success: function (res) {
                      console.log(res.data);
                      that.setData({
                        key: false
                
                      })
                      //wx.clearStorage()

                    }
                  })
                }

              })
            }
          })
        
        } else {
          //console.log('用户点击辅助操作')
        }
      }
    });
  },
  /**授权 */
  bindGetUserInfo: function (e) {
    console.log("授权",e.detail.userInfo)
    wx.setStorage({
      key: "user",
      data: e.detail.userInfo
    })
    this.setData({
      userInfo: { "nickName": e.detail.userInfo.nickName, "avatarUrl": e.detail.userInfo.avatarUrl },
      bingetinfo:true
    });
  },
  //是否拥有本地存储判断
  getuseinfomation:function(){
    var that = this;
    setTimeout(function(){
      if (that.data.key) {
        common.setStronguser({
          success: function (res) {
            console.log("成功判断本地存储", res.data)
            that.setData({
              userInfo: res.data
            })
          }

        })

      } else {
        return false;

      }

    },50)
  }
})
