// pages/child/part-timeJob/part-timeJob.js
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;



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
      { title: "分类01", name: "全部" },
      { title: "分类02", name: "全职" },
      { title: "分类03", name: "兼职" },
    ]
  
   


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    wx.request({
      url: url,
      data: {
        page: page,
        page_size: page_size,
        sort: sort,
        is_easy: is_easy,
        lange_id: lange_id,
        pos_id: pos_id,
        unlearn: unlearn
      },
      success: function (res) {
        //console.info(that.data.list);  
        var list = that.data.list;
        for (var i = 0; i < 3; i++) {
          list.push(res.data.list[i]);
        }
        that.setData({
          list: list
        });
        page++;
        wx.hideLoading();

      }
    });

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
      activeIndex: e.currentTarget.id
    })
    if (e.currentTarget.id>1){
      this.setData({
        pageshow: false
      })
    }else{
      this.setData({
        pageshow: true
      })
    }
  }
})