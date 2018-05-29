// pages/child/customPlate/customPlate.js
var common = require('../../../utils/common.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchs:true,
    input1:null,
    input2:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //逻辑编辑功能
    const self = app.globalData.ResumeFull;
    this.setData({
      info: app.globalData.ResumeFull,
    })
    if (options.type) {
      this.setData({
        key: options.type,
        num: options.id,
        infoChild: self.userDefine[options.id]
      })
    } else {
      this.setData({
        switchs: false
      })
    }

    console.log(this.data.key, this.data.num, this.data.infoChild)
    //end
  
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
  //监听 修改 增加 删除三件套
  watchPassWord: function (event) {

    const inputs = event.currentTarget.dataset.self;
    this.setData({
      [inputs]: event.detail.value
    })

  },
  save: function () {
    var that = this;
    if (that.data.switchs) {
      const you = "info.userDefine[" + this.data.num + "]";
      this.setData({
        [you]: that.data.infoChild
      })
    } else {
      var newlist = {}
      newlist.id = that.data.info.userDefine.length;
      newlist.title = that.data.input1;
      newlist.content = that.data.input2;
   

      var infos = (that.data.info.userDefine).push(newlist);
      //console.log(that.data.info.userDefine)
      that.setData({
        'info.userDefine': that.data.info.userDefine
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
          const her = 'info.userDefine';
          var delInfo = (that.data.info.userDefine).splice(that.data.num, 1)
          that.setData({
            [her]: that.data.info.userDefine
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
  }
//监听 修改 增加 删除三件套 end
  ,
  //20180529 保存、新增自定义板块
  getResume: function () {
    var setdatas = {
      "id": 0,
      "resume_Id": 0,
      "title": "string",
      "detail": "string",
      "ctime": "2018-05-29T14:25:59.041Z"
    }
    common.request('api/resume/save_define', {
      params: setdatas,
      success: function (res) {
        console.log("保存、新增自定义板块", res)

      }
    }, app.globalData.login)
  }
})