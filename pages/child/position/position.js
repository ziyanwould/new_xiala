//index.js
//获取应用实例
var common = require('../../../utils/common.js');
var app = getApp();
// 下拉刷新内容
var url = "http://120.27.100.219:54231/api/position/get_collect_position_list";
var pageIndex = 1;
var pageSize = 10;

// 请求数据  


var register = require('../../../utils/refreshLoadRegister.js');
Page({
  data: {
    currentSize: 0,
    words: [],
    list: [],
    items: {},
    citysinfo:true
  },
  onLoad: function () {
    var _this = this;
    register.register(this);
    //获取words  
  
    // var self = common.tanchu()
    // _this.setData({
    //   items: {
    //     height: self,
    //     masTitle: "",
    //     show: true
    //   }
    // });



  },
  onShow:function(){
    this.refresh()
  },
  doLoadData() {
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        "pageIndex": pageIndex,
        "pageSize": pageSize
 
      },
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
        'login_token': app.globalData.login
      },
      success: function (res) {
        console.log("数据",res)
        //console.info(that.data.list);  
         var list = that.data.list;
         for (var i = 0; i < res.data.data.list.length; i++) {
           list.push(res.data.data.list[i]);
        }
        that.setData({
          list: list
        });
        pageIndex++;
        wx.hideLoading();
        register.loadFinish(that, true);
      }
    });



  },
  //模拟刷新数据
  refresh: function () {
    this.setData({
      list: [],

    });
    pageIndex =1;
  
    this.doLoadData();
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData();
  },
   tapCompass: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.counts.ID;
    var typesd = e.currentTarget.dataset.counts.Type_Id;



    //获取详情页信息   使用Promise进行异步流程处理
    if (typesd == 0) {
      var urls = 'http://120.27.100.219:54231/api/position/get_part_detail';
    } else {
      var urls = 'http://120.27.100.219:54231/api/position/get_full_detail';  
    }
    let requestPromisified = common.wxPromisify(wx.request);
    console.log('loginId', app.globalData.login)
    requestPromisified({
      data: { "position_id": id },
      url: urls,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
        'login_token': app.globalData.login
      },
    }).then(res => {
      console.log('获取点击的详情的内容', res)
      if (res.data.data.detail.job_sec_type) {  
        var jobx = "全职"
      } else {
      var jobx = "兼职"
      }
      wx.setStorageSync('jobx', jobx);
      wx.setStorageSync('childs', res.data.data.detail)
    
    }).then(res => {
      console.log('列表的关键字:', that.data.seachKey);
   
      wx.navigateTo({
        url: '/pages/child/part-timeJob/part-timeJob'//实际路径要写全
      })
    })




  }
  
})