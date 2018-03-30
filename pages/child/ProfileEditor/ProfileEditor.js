Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectPerson: [
      {
        "name": "真实姓名",
        "id": "0",
        "count": "",
        "input":"盼见",
        "url": "",
        "picUrl":""
      },
      {
        "name": "性别",
        "id": "1",
        "count": "男",
        "input": "",
        "url": false,
        "picUrl": "http://www.liujiarong.top/WX/wx_unfold.png"
      },
      {
        "name": "出生年月",
        "id": "2",
        "count": "请选择",
        "input": "",
        "url": false,
        "picUrl": "http://www.liujiarong.top/WX/wx_unfold.png"
      },
      {
        "name": "职位月薪",
        "id": "3",
        "count": "5K - 10K",
        "input": "",
        "url": false,
        "picUrl": ""
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
  jumpToCity: function (event) {
     console.log(event);
     var Url = event.currentTarget.dataset.url;
     if (Url != false){
       console.log(Url);
         wx.navigateTo({
           url: Url
        })
     }
   
  }
})