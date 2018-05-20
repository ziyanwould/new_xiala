// pages/child/educationExperience/educationExperience.js
//var register = require('../../utils/refreshLoadRegister.js');
var common = require('../../../utils/common.js');
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: "中山大学",
    specialty:"前端开发工程师",
    GraduationYear: "",
    education: "本科",
    major:['大专', '本科', '硕士', '博士', '其他'],
    endtime:2017,
    switchs:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("options",options)
    var arrc = common.sjc();
    this.setData({
      GraduationYear: arrc[2]
      
    });
    
    //逻辑编辑功能
    const self = app.globalData.ResumeFull;
    this.setData({
      info: app.globalData.ResumeFull,
    })
    if (options.type) {
      this.setData({
        key: options.type,
        num: options.id,
        infoChild: self.education[options.id]
      })
    } else {
      this.setData({
        switchs: false
      })
    }

    //console.log(this.data.key, this.data.num, this.data.infoChild)
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
    // do somthing
    wx.stopPullDownRefresh();
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

  bindDateChange: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  bindend: function (e) {
    this.setData({
      entrytime: e.detail.value,
      'infoChild.graduate': e.detail.value
    })
  },
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['大专', '本科', '硕士', '博士', '其他'],
      success: function (res) {
        that.setData({
          education: that.data.major[res.tapIndex],
          'infoChild.educationBack': that.data.major[res.tapIndex]
        })   
      }
    });
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
      const you = "info.education[" + this.data.num + "]";
      this.setData({
        [you]: that.data.infoChild
      })
    } else {
      var newlist = {}
      newlist.id = that.data.info.education.length;
      newlist.school = that.data.school;
      newlist.profession = that.data.specialty;
      newlist.graduate = that.data.GraduationYear;
      newlist.educationBack = that.data.education;
     


      var infos = (that.data.info.education).push(newlist);
      //console.log(that.data.info.education)
      that.setData({
        'info.education': that.data.info.education
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
          const her = 'info.education';
          var delInfo = (that.data.info.education).splice(that.data.num, 1)
          that.setData({
            [her]: that.data.info.education
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
})