// pages/child/part-timeJob/part-timeJob.js
var app = getApp();
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
   
    ],
    list2: [
      { address1: "广州市海珠区", address2: "中山大学科技园B座1818", lat: "23.092900", lon:"113.291230"},
      { address1: "佛山市禅城区", address2: "佛山市信息科技创业园", lat: "23.004224", lon: "113.124161" },
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
    console.log('options', options)
    var that = this;
    if(options.show){
      this.setData({
      show:true
      })
    }
    this.setData({
      jobType: wx.getStorageSync('jobx'),
      message: wx.getStorageSync('childs'),
      list: wx.getStorageSync('childs').recommend
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
    console.log(this.data.jobType, this.data.message, this.data.recommend)
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
  map:function (event){
  //   wx.getLocation({
  //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
  //     success: function (res) {
  //       var latitude = res.latitude
  //       var longitude = res.longitude
  //       wx.openLocation({
  //         latitude: latitude,
  //         longitude: longitude,
  //         name: "花园桥肯德基",
  //         scale: 28
  //       })
  //     }
  //   })  
    wx.openLocation({
      latitude: parseFloat(event.currentTarget.dataset.lat),
      longitude: parseFloat(event.currentTarget.dataset.lon),
      name: event.currentTarget.dataset.area,
      scale: 28
    })
  },
  tapCompass: function (e) {
    var that = this;
    console.log(e)
    console.log(e.currentTarget.dataset.counts);
    console.log(e.currentTarget.dataset.counts.ID);
    var id = e.currentTarget.dataset.counts.ID;
    const jobs = that.data.jobType;


    //获取详情页信息   使用Promise进行异步流程处理
    if (this.data.jobType=='兼职') {
      var urls = 'http://120.27.100.219:54231/api/position/get_part_detail';
    

    } else {
      var urls = 'http://120.27.100.219:54231/api/position/get_full_detail';
   

    }

    let requestPromisified = common.wxPromisify(wx.request);
    requestPromisified({
      data: { "position_id": id },
      url: urls,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
      },
    }).then(res => {
      console.log('获取点击的详情的内容', res)
      if (res.data.data.detail.job_sec_type) {
       
        var jobx = "兼职"
      } else {
     
        var jobx = "全职" 
      }

      wx.setStorageSync('jobx', jobx);
      wx.setStorageSync('childs', res.data.data.detail)

    }).then(res => {
    
    
      wx.navigateTo({
        url: '/pages/child/part-timeJob/part-timeJob?show=true'//实际路径要写全
      })
    })




  }
  ,
  //收藏职位
  collectPosition:function(){
    var that = this;
    var urlc = '';
    var self = that.data.message.has_collect
    if (self){
      urlc ='api/position/remove_collect_position'

    }else{
      urlc = 'api/position/collect_position'
    }
    that.setData({
      'message.has_collect': !self

        })
   common.request(urlc,
      {
        params:{
          "position_id": that.data.message.position_id
        },
        success: function (res) {
        console.log("获取结果", res)
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        });
        
        },
        fail: function () {
          //失败后的逻辑  
        },
      }, app.globalData.login )
  }
})