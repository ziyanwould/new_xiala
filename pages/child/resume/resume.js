// pages/child/resume/resume.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    bfsrc:'',
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */


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

     console.log('onLoad')
     var that = this
     /** */
    

     
       console.log("列表", option)
       let { avatar } = option
       if (avatar) {
         console.log("内容", avatar)
         this.setData({
           src: avatar
         })
         wx.getStorage({
           key: 'useName',
           success: function (res) {
            
             that.setData({
               useName: res.data
             })
           }
         })
    
      
    
       }else{
          wx.getStorage({
         key: 'user',
         success: function (res) {

           console.log("user", res.data.nickName)
           that.setData({
             userInfo: { "nickName": res.data.nickName, "avatarUrl": res.data.avatarUrl },
             src: res.data.avatarUrl
           })
           wx.setStorage({
             key: "useName",
             data: res.data.nickName
           })
         }
         , fail: function () {
           wx.showModal({
             title: '警告',
             content: '您点击了拒绝授权，将用默认信息代替你的个人信息，您可自行修改',
             success: function (res) {
               if (res.confirm) {
                 console.log('用户点击确定')
               }
             }
           })
         }
       })
       }
  }
})