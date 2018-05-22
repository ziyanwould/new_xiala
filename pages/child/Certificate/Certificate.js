var common = require('../../../utils/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project: "请输入",
    work: "请输入",
    startTime: "请选择",
    endTime: "请选择",
    switchs:true,
    registration:null,
    state:null,
    useRe:null,
    location:null

    // major: ['大专', '本科', '硕士', '博士', '其他']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arrc = common.sjc();
    this.setData({
      startTime: arrc[1],
      endTime: arrc[1],

    })
    //console.log(options)
    //逻辑编辑功能
    
    if (options.parTime){
      var self = app.globalData.resumePart;
      this.setData({
        info: app.globalData.resumePart,
        parTime:true
      })
     }else{
      var self = app.globalData.ResumeFull;
      this.setData({
        info: app.globalData.ResumeFull,
      })
     }

    if (options.type) {
      this.setData({
        key: options.type,
        num: options.id,
        infoChild: self.certificate[options.id]
      })
    } else {
      this.setData({
        switchs: false
      })
    }

    //console.log(this.data.key, this.data.num, this.data.infoChild)
    //end

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
    /**跳转筛选 */
    var value = wx.getStorageSync('worktype')
    //console.log("携带回来的信息", value)   
    if (value) {
      this.setData({
        'infoChild.NameCertificate': value.value,
        'project': value.value
      })
    }
    wx.removeStorageSync('worktype')
     /** */
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
    // do somthing
    wx.stopPullDownRefresh();
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
  bindDateChange: function (e) {
    this.setData({
      endtime: e.detail.value,
      'infoChild.endTime': e.detail.value,
    })
  },
  bindend: function (e) {
    this.setData({
      startTime: e.detail.value,
      'infoChild.startTime': e.detail.value,
    })
  },
  bindendEnd: function (e) {
    this.setData({
      endTime: e.detail.value,
      'infoChild.endTime': e.detail.value,
    })
  },
    //监听 修改 增加 删除三件套
  watchPassWord: function (event) {

    const inputs = event.currentTarget.dataset.self;
    this.setData({
      [inputs]: event.detail.value
    })

  },
  save: function () {
    var that = this;
    if (that.data.switchs) {
      const you = "info.certificate[" + this.data.num + "]";
      this.setData({
        [you]: that.data.infoChild
      })
    } else {
      var newlist = {}
      newlist.id = that.data.info.certificate.length;
      newlist.NameCertificate = that.data.project;
      newlist.organization = that.data.work;
      newlist.startTime = that.data.startTime;
      newlist.endTime = that.data.endTime;

      newlist.registration = that.data.registration;
      newlist.state = that.data.state;
      newlist.useRe = that.data.useRe;
      newlist.location = that.data.location;



      var infos = (that.data.info.certificate).push(newlist);
      //console.log(that.data.info.certificate)
      that.setData({
        'info.certificate': that.data.info.certificate
      })
    }
    if (this.data.parTime){
      //更新全局变量方式 20180519
      app.globalData.resumePart = this.data.info
      typeof cb == "function" && cb(app.globalData.resumePart)
    //更新全局变量结束 20180519
    }else{
      //更新全局变量方式 20180519
      app.globalData.ResumeFull = this.data.info
      typeof cb == "function" && cb(app.globalData.ResumeFull)
    //更新全局变量结束 20180519
    }

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 800
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  openConfirm: function () {
    var that = this;
    wx.showModal({
      title: '确定删除',
      content: '',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
          //莫名是旧数据更新 赋值得到是错误
          const her = 'info.certificate';
          var delInfo = (that.data.info.certificate).splice(that.data.num, 1)
          that.setData({
            [her]: that.data.info.certificate
          })

          if (that.data.parTime) {
            //更新全局变量方式 20180519
            app.globalData.resumePart = that.data.info
            typeof cb == "function" && cb(app.globalData.resumePart)
            //更新全局变量结束 20180519
          } else {
            //更新全局变量方式 20180519
            app.globalData.ResumeFull = that.data.info
            typeof cb == "function" && cb(app.globalData.ResumeFull)
            //更新全局变量结束 20180519
          }
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 800
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          console.log('用户点击取消')
        }
      }
    });
  }
//监听 修改 增加 删除三件套 end

  //对全局证书的筛选
  , selectbook: function () {
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject?id=1'//实际路径要写全
    })
  }
  ,//下拉选择
  opend: function (e) {
    var that = this
   console.log(e)
   var typed = e.currentTarget.id
   console.log(typed)
   if (typed==0){
     var lists =['专注','初始']
   } else if (typed == 1){
     var lists = ['闲置中', '未到期','快拿证']
   } else if (typed == 2){
     var lists = ['不限', '资质', '项目']
   }
    wx.showActionSheet({
      itemList:lists,
      success: function (res) {
        if (!res.cancel) {
         const number = res.tapIndex
         if (typed==0){
          that.setData({
            'infoChild.registration': lists[number],
            'registration': lists[number]
          })
         } else if (typed == 1){
           that.setData({
            'infoChild.state' :  lists[number],
             'state' :  lists[number]
           })
         } else if (typed == 2){
           that.setData({
             'infoChild.useRe': lists[number],
             'useRe': lists[number]
           })
         }

        }
      }
    });
  }
})