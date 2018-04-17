// pages/child/part-timeJob/part-timeJob.js
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;


// 请求数据  
var loadMore = function (that) {
  that.setData({
    hidden: false
  });
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
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
   
    ],
    list2: [
      { address1: "广州市海珠区", address2: "中山大学科技园B座1818" },
      { address1: "佛山市禅城区", address2: "佛山市信息科技创业园" },
    ],
    tag:[
        { id:0, count: "设计师" },
        { id:1, count: "水利工程师" },
        { id:2, count: "五年以上" },
        { id:3, count: "大专以上" },
     
    ],
    tags: [
      { id: 0, count: "简历处理快如闪电" },
      { id: 1, count: "很少回聊天信息" },
      { id: 2, count: "早上活跃" }
    ],
    name:"Sunyklong",
    Ntype:"设计师",
    hour:9,
    zzCount: '1、在项目经理的领导下，制定落实项目安全防范措施；\n'+
    '2、做好项目部新进职工的登记注册工作，发放安全教育卡片、安全帽和其他劳保用品；\n'+
    '3、每项工程必须按公司规定组织安全教育、安全技术交底及安全措施的培训等；\n'+
    '4、认真做好安全台账，组织安全生产检查；\n'+
    '5、对工程重点部位要制定书面安全措施；\n'+
    '6、发现重大安全隐患，应立即采取有效补救措施并及时汇报，将隐患消灭在萌芽状态；\n'+
    '7、严格履行职责，杜绝事故发生。',
    company: "中住71",
    label: "50-150人/移动互联网/建筑/设计/教育",
    attestation: "http://www.liujiarong.top/WX/certified.png",
    types: "http://www.liujiarong.top/WX/popCompass.png",
    companyPerson: "http://www.liujiarong.top/WX/pending.png",
    history: "85664",
    counturl: "http://www.liujiarong.top/WX/Comup.png",
    title:"室内设计",
    salary:"8K-12K",
    socialSecurity:"广州不可停"


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

  }
})