// pages/child/ExpectWork/ExpectWork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: [
      {
        "name": "期望城市",
        "id": "0",
        "count": "广州",
        "url": "../../child/citySelect/citySelect",
      },
      {
        "name": "期望职位",
        "id": "1",
        "count": "设计师",
        "url": "",
      },
      {
        "name": "职位类型",
        "id": "2",
        "count": "全职",
        "url": "",
      },
      {
        "name": "职位月薪",
        "id": "3",
        "count": "5K - 10K",
        "url": "",
      }
     
    ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
  ,
  onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
  jumpToMyPage: function (event) {

    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  }
})