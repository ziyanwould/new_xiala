// pages/child/WorkExperience/WorkExperience.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     company:"请输入",
     position:"请输入",
     entrytime:"请选择",
     endtime:"请选择",
     switchs:true,
     input:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = app.globalData.ResumeFull;
    this.setData({
      info: app.globalData.ResumeFull,
    })
    if(options.type){
      this.setData({
        key: options.type,
        num: options.id,
        infoChild: self.workExperience[options.id]
      })
    }else{
      this.setData({
        switchs:false
      })
    }
    
    console.log(this.data.key,this.data.num,this.data.info)
    //console.log("testing", this.data.infoChild)
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
  
  },
  openConfirm: function () {
    var that = this;
    wx.showModal({
      title: '确定删除',
      content: '',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
          //莫名是旧数据更新 赋值得到是错误
          const her = 'info.workExperience';
          var delInfo = (that.data.info.workExperience).splice(that.data.num, 1)
          that.setData({
            [her]: that.data.info.workExperience
          })
          
          //更新全局变量方式 20180519
          app.globalData.ResumeFull = that.data.info
          typeof cb == "function" && cb(app.globalData.ResumeFull)
          //更新全局变量结束 20180519
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 800
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  bindDateChange: function (e) {
    
    this.setData({
     endtime: e.detail.value,
     'infoChild.endTime': e.detail.value
    })
  },
  bindend: function (e) {
    this.setData({
      entrytime: e.detail.value,
      'infoChild.startTime': e.detail.value
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
  },
  save:function(){
    var that = this;
    if (that.data.switchs){
      const you = "info.workExperience[" + this.data.num + "]";
      this.setData({
        [you]: that.data.infoChild
      })
    }else{
      var newlist = {}
      newlist.id = that.data.info.workExperience.length;
      newlist.post = that.data.position;
      newlist.company = that.data.company;
      newlist.startTime = that.data.entrytime;
      newlist.endTime = that.data.endtime;
      newlist.jobContent = that.data.input;
     

      var infos = (that.data.info.workExperience).push(newlist);
      console.log(that.data.info.workExperience)
      that.setData({
        'info.workExperience': that.data.info.workExperience
      })
    }

    //更新全局变量方式 20180519
    app.globalData.ResumeFull = this.data.info
    typeof cb == "function" && cb(app.globalData.ResumeFull)
    //更新全局变量结束 20180519
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 800
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  }
})