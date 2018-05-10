// 下拉刷新内容
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

  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn,



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

    }
  });
}

var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {
    currentSize: 0,
    words: [],
    list: [],
    mydata: {
      seektype: "搜索公司"
    }
   
  },
  onLoad: function () {
    var _this = this;
    register.register(this);
    //获取words  
    this.doLoadData(0, 20);
  },
  doLoadData() {
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
        register.loadFinish(that, true);
        console.log(list);
      }
    });



  },
  //模拟刷新数据
  refresh: function () {

    this.setData({
      words: [],
      currentSize: 0
    });
    this.doLoadData();
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData();
  }
  , tapCompass:function () {
    wx.navigateTo({
      url: '/pages/child/CompanyPage/CompanyPage'//实际路径要写全
    })
  } 
  //搜索页路由跳转
  , seek: function () {
    wx.navigateTo({
      url: '/pages/child/grabble/grabble?permanent=1'//实际路径要写全
    })
  }
})