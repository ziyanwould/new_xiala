var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project: "中山大学",
    work: "前端开发工程师",
    startTime: "2018-04",
    endTime: "2018-09"
    // major: ['大专', '本科', '硕士', '博士', '其他']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arrc = common.sjc();
    this.setData({
      startTime: arrc[1],
      endTime: arrc[1],

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
      startTime: e.detail.value
    })
  },
  bindendEnd: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  }


})