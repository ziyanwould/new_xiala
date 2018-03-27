//index.js
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
      },
      {
        "name": "反馈",
        "id": "2",
        "pic": "wx_retroaction",
        "url":"../child/couple/couple"
      }
      , {
        "name": "访客",
        "id": "3",
        "pic": "wx_footprint",
        "url": "../child/visitor/visitor"
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
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
     
     wx.navigateTo({
       url: event.currentTarget.dataset.url
     })
   },
})
