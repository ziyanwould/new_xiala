var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
   name:"真实姓名",
   edit_name:"Sunyuklong",
   sex:"性别",
   edit_sex: "男",
   year:"出生年月",
   edit_year:"请选择",
   education: "最高学历",
   edit_education: "请选择",
   work: "工作年限",
   edit_work: "请选择",
   phone:"手机号码",
   edit_phone:"15521000786",
   email:"联系邮箱",
   edit_email:"请输入",
   city:"所在城市",
   edit_city:"广东",
   state:"当前状态",
   edit_state:"我目前已离职，可快速到岗"
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
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

  }
  ,
  onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
    
      
        if (!res.cancel) {
          //console.log(res.tapIndex)
          var sex = res.tapIndex;
          if(sex==0){
            console.log("男")
            // edit_sex="男"
            that.setData({
              edit_sex: "男"
            })
            
          }else{
            // edit_sex = "女"
            console.log("女")
            that.setData({
              edit_sex:"女"
            })
          }
         
        }
      }
    });
  }

})

