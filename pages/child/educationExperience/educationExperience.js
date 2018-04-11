// pages/child/educationExperience/educationExperience.js
//var register = require('../../utils/refreshLoadRegister.js');
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: "中山大学",
    specialty:"前端开发工程师",
    GraduationYear: "",
    education: "本科",
    major:['大专', '本科', '硕士', '博士', '其他']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arrc = common.sjc();
    this.setData({
      GraduationYear: arrc[2]
      
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
  openConfirm: function () {
    wx.showModal({
      title: '确定删除',
      content: '',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  bindDateChange: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  bindend: function (e) {
    this.setData({
      entrytime: e.detail.value
    })
  },
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['大专', '本科', '硕士', '博士', '其他'],
      success: function (res) {
        that.setData({
          education: that.data.major[res.tapIndex]
        })   
      }
    });
  }

})