// pages/child/resume/resume.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    bfsrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        src: userInfo.avatarUrl,
        bfsrc: userInfo.avatarUrl
      })
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
   onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  }
  , jumpToMyPage: function (event) {

    wx.navigateTo({
      url: '../customPlate/customPlate'
    })
  },
  /*头像功能*/ 
  // changeAvatar: function () {
  //   var that = this;
  //   // var childId = wx.getStorageSync("child_id");
  //   // var token = wx.getStorageSync('token');
  //   wx.chooseImage({
  //     count: 1, // 最多可以选择的图片张数，默认9
  //     sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
  //     success: function (res) {
  //       console.log(res.tempFilePaths + "修改页面")
  //       var avatar = res.tempFilePaths;
  //       that.setData({
  //         avatar: avatar,
  //         upAvatar: true
  //       })

  //     },
  //     fail: function () {
  //       // fail
  //     },
  //     complete: function () {
  //       // complete
  //     }
  //   })
  // },
 // 这是是调用上传头像uploadFile方法
// 上传头像
  upload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `/avatarUpload/upload/upload?src=${src}`
        })
      }
    })
  },
   onLoad (option) {
     console.log("列表",option)
    let { avatar } = option
    if (avatar) {
      console.log("内容",avatar)
      this.setData({
        src: avatar
      })
    }else{
      this.setData({
        src: this.data.bfsrc
      })
    }
  }
})