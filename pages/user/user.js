//index.js
var common = require('../../utils/common.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎',
    hiddenmodalput: true,  
    userInfo: {},
    person:"集众人之力，成细节之美！",
    influence:"17",
    influence_per:"20.6%",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    jobList:[
        {
        "name": "简历管理",
        "id": 0,
        "pic": "wx_resume",
        "url":"/pages/child/Resumelist/Resumelist"
      },
       {
          "name": "创建简历",
          "id": 1,
          "pic": "creation",
          "url": "creation"
        },
        {
          "name": "个人认证",
          "id": 2,
          "pic": "identifi2",
          "url": null
        },
      {
       "name":"投递记录",
       "id":3,
       "pic": "wx_record",
       "url":"../child/deliver/deliver",
      },
      {
        "name": "职位收藏",
        "id": 4,
        "pic": "wx_collect",
        "url":"../child/position/position"
      }
      , {
        "name": "访客",
        "id": 5,
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
   //授权与否 本地信息有否
    if (app.globalData.empower){
      _this.setData({
        bingetinfo: true
      })
    }
  },
   onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
   jumpToMyPage: function (event) {
     var that = this;
     if (this.data.key) {
       //20180521 增加对创建简历动态指引兼职与非兼职引导
       if (event.currentTarget.dataset.url =='creation'){
         that.selectResu()
       }else{
         wx.navigateTo({
           url: event.currentTarget.dataset.url
         })
       }
      
     }else{
       var self = common.tanchu()
       this.setData({
         items: {
           height: self,
           masTitle: "",
           show: true,
           fages:true
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
            }
          });

        }
      })



      //解析手机号
      wx.request({
        url: 'http://120.27.100.219:54231/common/wx_login_phone',
        header: {
          'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

        },
        method: 'POST',
        data: {
          openid: app.globalData.oppenid,
          encryptedData: child_encryptedData,
          iv: child_iv
        },


        success: function (res) {
          console.log("登录凭证", res.data)

          //20180515 预修改
          wx.setStorage({
            key: "login",
            data: res.data.data.login_token
          })
          //end 20180515 预修改

          //更新全局变量方式 20180515
          app.globalData.login = res.data.data.login_token
          typeof cb == "function" && cb(app.globalData.login)
          //更新全局变量结束 20180515
        
          var cai = common.getinst(app.globalData.login)
          console.log("换一种写法", cai)
          that.setData({
            key: true
          })
          setTimeout(function(){
            that.getuseinfomation()
          },250)
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
        show: true,
        fages:true
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
    if (e.detail.userInfo){
      wx.setStorage({
        key: "user",
        data: e.detail.userInfo
      })
      this.setData({
        // userInfo: { "nickName": e.detail.userInfo.nickName, "avatarUrl": e.detail.userInfo.avatarUrl },
        bingetinfo: true,
        items: {
          height: self,
          masTitle: "",
          show: true,
          fages: false
        }
      });
    }else{
      this.setData({
        items: {
          height: self,
          masTitle: "",
          show: true,
          fages: false
        }
      });
    }

  
 
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
              userInfo: res.data,
              bingetinfo:true
            })
          }

        })

      } else {

        return false;

      }

    },50)
  },
  //简历名字的输入
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    let nums = this.data.getResuName.length;
    let urls = this.data.resumeName;
    
    if (nums > 0 && urls=='全职'){
      wx.navigateTo({
        url: '/pages/child/resume/resume?type=new'
      })
    } else if (nums > 0 && urls == '兼职'){
      wx.navigateTo({
        url: '/pages/child/parTime/parTime?type=new'
      })
    }else{
      wx.showToast({
        title: '请输入简历名',
        icon:'loading',
        duration:800
      })
    }
  }  
  //简历输入名字end

  ,//兼职与全职的选择
    selectResu: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['创建兼职简历', '创建全职简历'],
      success: function (res) {
        let nums = res.tapIndex; 
        if (nums==0){
          that.setData({
            resumeName:"兼职"
          })

        }else{
          that.setData({
            resumeName: "全职"
          })
        }
        that.modalinput()
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }  
  ,
  //监听兼职与全职名字
watchinput:function(e){
  console.log(e.detail.value)
  this.setData({
    getResuName: e.detail.value
  }) 
}
})
