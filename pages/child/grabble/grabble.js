// pages/child/grabble/grabble.js
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
    historys: [
      { count:"建造师"},
      { count: "一级建造师" },
      { count: "五大员" },
      { count: "建筑师" },
      { count: "设计师" },
      { count: "中住七一网络科技有限公司" },
    ],
    enjoy: [
      { name: "建造师" },
      { name: "前端开发工程师" },
      { name: ".net后端工程师" },
      { name: "UI设计师" },
      { name: "SEO工程师" },
      { name: "开发产品经理" },
    ],
    activeIndex: -1,
    used_list: [
      { title: "分类01", name: "位置" },
      { title: "分类02", name: "职位" },
      { title: "分类03", name: "排序" },
    ],
    company: "中住71",
    label: "50-150人/移动互联网/建筑/设计/教育",
    attestation: "http://www.liujiarong.top/WX/certified.png",
    types: "http://www.liujiarong.top/WX/popCompass.png",
    companyPerson: "http://www.liujiarong.top/WX/pending.png",
    history: "85664",
    counturl: "http://www.liujiarong.top/WX/Comup.png",
    city:"广州",
    pageShow:true,
    Fbutton:"取消"
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
        for (var i = 0; i < res.data.list.length; i++) {
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
    var that = this;
    wx.getStorage({
      key: 'cargo',
      success: function (res) {
        console.log(res.data)


        that.setData({

          city: res.data.select_city,

        })
      }
    })
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
  jumpCity: function (event) {

    wx.navigateTo({
      url: "/pages/child/citySelect/citySelect"
    })
  },
  active: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  
  },
  watchPassWord: function (event) {
    var that = this;
    var changdu =event.detail.value.length;
    if(changdu>0){
        that.setData({
        Fbutton: '完成'
    })
    }else{
      that.setData({
        Fbutton: '取消'
      })
    }
    // that.setData({
    //   city: res.data.select_city,
    // })
    console.log(event.detail.value);
   
  }, 
  urlTime:function(event){
    var that = this;
    var flage =that.data.Fbutton;
    if (flage=="完成"){
      that.setData({
        pageShow: false,
      })
    }else{
      wx.navigateBack({ changed: true });//返回上一页  
    }
  }
})