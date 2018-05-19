// pages/child/ExpectWork/ExpectWork.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: {
        name1: "期望城市",
        count1: "请选择",
        name2: "期望职位",
        count2: "请输入",
        name3: "职位类型",
        count3: "全职",
        name4: "职位月薪",
        count4: "请输入",

   }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //console.log(options)
  const types = options.type;
   this.setData({
     info: app.globalData.ResumeFull,
     key: types
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     var that = this;

     if (app.globalData.city){
       that.setData({

         'selectList.count1': app.globalData.city,
         'info.expectWork.city': app.globalData.city,

       })
    }
        
        
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  ,
  onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
  jumpToMyPage: function (event) {

    wx.navigateTo({
      // url: event.currentTarget.dataset.url
      url: '../../child/citySelect/citySelect'
    })
  },
  watchPassWord: function (event) {
    //console.log(event.currentTarget.dataset.self)
    //console.log(event.detail.value);
    const inputs = event.currentTarget.dataset.self;
    this.setData({
      [inputs]: event.detail.value
    })
    //console.log("替换后的值",this.data.info)
  }
  ,save:function(event){
    //更新全局变量方式 20180519
    app.globalData.ResumeFull = this.data.info
    typeof cb == "function" && cb(app.globalData.ResumeFull)
    //更新全局变量结束 20180519
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 800
    });
    setTimeout(function(){
      wx.navigateBack({
        delta:1
      })
    },1000)
  }
})