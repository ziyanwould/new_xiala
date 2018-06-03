// pages/child/part-timeJob/part-timeJob.js
var common = require('../../../utils/common.js');
var app = getApp()

var url = "http://www.imooc.com/course/ajaxlist";
var page = 1;
var pageSize = 10;




Page({

  /**
   * 页面的初始数据
   */

  data: {
    list: [

    ],
    pageshow:true,
    activeIndex: 0,
    used_list: [
      // { title: "分类01", name: "全部" },
    
      { title: "分类03", name: "兼职" },
      { title: "分类02", name: "全职" },
    ]
  
   


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.deleteResume()
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
  active: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      list:[]
    })
    this.deleteResume()
  },
  
  //20180529 投递记录
  deleteResume:function () {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    console.log('全职兼职序号吧',that.data.activeIndex)
    var setdata = {
     
      "type_id": that.data.activeIndex,
      "pageIndex": page,
      "pageSize": pageSize
    }
    // common.request('api/resume/deliver_log', {
    common.request('api/position/get_collect_position_list', {
      params: setdata,
      success: function (res) {
        console.log("投递记录", res)
        //console.info(that.data.list);  
        var list = that.data.list;
        for (var i = 0; i < res.data.data.list.length; i++) {
          list.push(res.data.data.list[i]);
        }
        //看是否有数据
        if (res.data.data.list.length>0) {
          that.setData({
            pageshow: true
          })
        } else {
          that.setData({
            pageshow: false
          })
        }
        that.setData({
          list: list
        });
        page++;
        wx.hideLoading();
      }
    }, app.globalData.login)
  }
})