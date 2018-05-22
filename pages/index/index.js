//index.js
//获取应用实例
var common = require('../../utils/common.js');
var app = getApp();
// 下拉刷新内容
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

// 请求数据  
var loadMore = function (that) {
 
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn,
  

      
    },
    success: function (res) {
      //console.info(that.data.list);  
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;
    
    }
  });
}  

var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {    
    currentSize:0,
    words: [],
    list: [],
    items: {},
    mydata:{
      seektype: "搜索职位"
    },
    workType:{
      activeIndex: 0,
      used_list: [
        { title: "分类03", name: "兼职" },
        { title: "分类02", name: "全职" },
     
      ]
    }
   
 
    
   
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
              show: false,
              fages:false  
            }
          })
        }
      }
    })
  },
  onLoad: function () {
    var _this = this;

    /*是否登录*/ 
    wx.getStorage({
      key: 'login',
      success: function (res) {
     
        if (res.data){
          _this.setData({
            items: {
              show: false,
              fages:false
            }})
       }
      }
    })



    register.register(this);   
    //获取words  
    this.doLoadData(0,20);
    var self = common.tanchu()
      _this.setData({
        items:{
          height: self,
          masTitle:"",
          show:true,
          fages: true
        }
     });
   
    

  },
  doLoadData(){
      wx.showLoading({
        title: 'loading...',
      });
      var that = this;
      wx.request({
        url: url,
        data: {
          page: page,
          page_size: page_size,
          sort: sort,
          is_easy: is_easy,
          lange_id: lange_id,
          pos_id: pos_id,
          unlearn: unlearn
        },
        success: function (res) {
          //console.info(that.data.list);  
          var list = that.data.list;
          for (var i = 0; i < res.data.list.length; i++) {
            list.push(res.data.list[i]);
          }
          that.setData({
            list: list
          });
          page++;
          wx.hideLoading();
          register.loadFinish(that, true);
        }
      });
      
        
    
  },
  //模拟刷新数据
  refresh:function(){
    
    this.setData({
      words:[],
      currentSize:0
    });
    this.doLoadData();
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData();
  } ,
  //路由跳转等
  urlTo:function(){
    var url =  '../child/Login/Login?line_type=1';
    common.SomeThing(url);
   
  },
    urlTo2: function () {
    var url = '../child/Login/Login?line_type=2';
    common.SomeThing(url);

  },
   urlclose:function(){
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
    console.log("errMsg",e.detail.errMsg)
    console.log("vi",e.detail.iv)
    console.log("encryptedData",e.detail.encryptedData)
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
            url: 'http://120.27.100.219:54231/api/common/wx_login_phone',
            header: {
              'content-type': 'application/json',
              'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

            },
            method: 'POST',
            data: {
              openid: app.globalData.oppenid,
              encryptedData: child_encryptedData,
              iv:child_iv
            },


            success: function (res) {
              console.log("登录凭证",res.data)

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
              console.log("换一种写法",cai)
            }

          })
        
    }
  }
  , tapCompass: function () {
    wx.navigateTo({
      url: '/pages/child/part-timeJob/part-timeJob'//实际路径要写全
    })
  }     
  //路由跳转等end
  //搜索页路由跳转
  ,seek:function(){
    wx.navigateTo({
      url: '/pages/child/grabble/grabble?permanent=0'//实际路径要写全
    })
  }
/** 
 * 旋转上拉加载图标 
 */
// function updateRefreshIcon() {
//   var deg = 0;
//   var _this = this;
//   console.log('旋转开始了.....')
//   var animation = wx.createAnimation({
//     duration: 1000
//   });

//   var timer = setInterval(function () {
//     if (!_this.data.refreshing)
//       clearInterval(timer);
//     animation.rotateZ(deg).step();//在Z轴旋转一个deg角度  
//     deg += 360;
//     _this.setData({
//       refreshAnimation: animation.export()
//     })
//   }, 1000);
// }
,//切换按钮
  active: function (e) {
    this.setData({
     'workType.activeIndex': e.currentTarget.id
    })
    if (e.currentTarget.id > 1) {
      this.setData({
        pageshow: false
      })
    } else {
      this.setData({
        pageshow: true
      })
    }
  }
  ,     /**授权 */
  bindGetUserInfo: function (e) {
    console.log("授权", e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.setStorage({
        key: "user",
        data: e.detail.userInfo
      })
      app.globalData.empower = true
      typeof cb == "function" && cb(app.globalData.empower)
    }
    this.setData({
   
        items: {
          height: self,
          masTitle: "",
          show: true,
          fages: false 
        },

    })
  }
})