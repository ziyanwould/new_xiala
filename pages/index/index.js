//index.js
//获取应用实例
var common = require('../../utils/common.js');
var app = getApp();
// 下拉刷新内容
var Index = 1;
var Size = 10;




var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {    
    currentSize:0,
    fullTimeurl:'http://120.27.100.219:54231/api/position/get_part_recommend',
    list: [],
    items: {},
    jobType: 0,
    mydata:{
      seektype: "搜索职位"
    },
    workType:{
      activeIndex: 0,
      used_list: [
        { title: "分类03", name: "兼职" },
        { title: "分类02", name: "全职" },
     
      ]
    }
  },
  onShow: function () {
    /*是否登录  更新状态*/
    var _this = this;
    wx.getStorage({
      key: 'login',
      success: function (res) {

        if (res.data) {
          _this.setData({
            items: {
              show: false,
              fages:false  
            }
          })
        }
      }
    })
  },
  onLoad: function () {
    var _this = this;

    /*是否登录*/ 
    wx.getStorage({
      key: 'login',
      success: function (res) {
     
        if (res.data){
          _this.setData({
            items: {
              show: false,
              fages:false
            }})
       }
      }
    })



    register.register(this);   
    //获取words  
    this.doLoadData(this);
    var self = common.tanchu()
      _this.setData({
        items:{
          height: self,
          masTitle:"",
          show:true,
          fages: true
        }
     });
   
    

  },
  doLoadData(that){
      wx.showLoading({
        title: 'loading...',
      });
      var that = this;
      wx.request({
        url: that.data.fullTimeurl,
        data: {
          'pageIndex': Index,
          'pageSize': Size,
       
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header 
        header: {
          'content-type': 'application/json',
          'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
        },
        success: function (res) {
          console.info(res.data.data.positions);  
          var list = that.data.list;
          for (var i = 0; i < res.data.data.positions.length; i++) {
            list.push(res.data.data.positions[i]);
          }
          that.setData({
            list: list
          });
          Index++;
          wx.hideLoading();
          register.loadFinish(that, true);
          if (res.data.data.positions.length == 0) {
            wx.showToast({
              title: '到底了...',
              icon: 'loading',
              duration: 2000
            });
          }
        }
      });
      
        

  },
  //模拟刷新数据
  refresh:function(){
    
    this.setData({
      list:[],
    });
    Index=1;
    this.doLoadData(this);
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData();
  } ,
  //路由跳转等
  urlTo:function(){
    var url =  '../child/Login/Login?line_type=1';
    common.SomeThing(url);
   
  },
    urlTo2: function () {
    var url = '../child/Login/Login?line_type=2';
    common.SomeThing(url);

  },
   urlclose:function(){
     this.setData({
       items: {
     
         show: false
       }
     });
   }
  , 
  //获取手机号
  getPhoneNumber: function (e) {
    let that = this;
    console.log("errMsg",e.detail.errMsg)
    console.log("vi",e.detail.iv)
    console.log("encryptedData",e.detail.encryptedData)
    var child_iv = e.detail.iv
    var child_encryptedData = e.detail.encryptedData
    //
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {
         

         }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
          that.setData({
            items: {

              show: false
            }
          });

         }
      })
   
 

          //解析手机号
          wx.request({
            url: 'http://120.27.100.219:54231/api/common/wx_login_phone',
            header: {
              'content-type': 'application/json',
              'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

            },
            method: 'POST',
            data: {
              openid: app.globalData.oppenid,
              encryptedData: child_encryptedData,
              iv:child_iv
            },


            success: function (res) {
              console.log("登录凭证",res.data)

              //20180515 预修改
              wx.setStorage({
                key: "login",
                data: res.data.data.login_token
              })
              //end 20180515 预修改
              
              //更新全局变量方式 20180515
              app.globalData.login = res.data.data.login_token
              typeof cb == "function" && cb(app.globalData.login)
              //更新全局变量结束 20180515

              var cai = common.getinst(app.globalData.login)
              console.log("换一种写法",cai)
            }

          })
        
    }
  }
  ,
   tapCompass: function (e) {
     var that = this;
     //console.log(e.currentTarget.dataset.counts);
     //console.log(e.currentTarget.dataset.counts.ID);
     var id = e.currentTarget.dataset.counts.ID ;
     const jobs = that.data.jobType;
    

     //获取详情页信息   使用Promise进行异步流程处理
     if (jobs==0){
       var urls ='http://120.27.100.219:54231/api/position/get_part_detail';
      //  that.setData({
      //    urlx : 'http://120.27.100.219:54231/api/position/get_part_list'
      //  })
      
     }else{
       var urls = 'http://120.27.100.219:54231/api/position/get_full_detail';
      //  that.setData({
      //    urlx: 'http://120.27.100.219:54231/api/position/get_full_list'
      //  })
     
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
     }).then(res =>{
          console.log('获取点击的详情的内容',res)
          if (res.data.data.detail.job_sec_type){
            //var mycode = (res.data.data.detail.job_sec_type).slice(0, 1);
            var jobx = "全职"
          }else{
           // var mycode = (res.data.data.detail.certificate["0"].sec_type_name).slice(0, 1);
            var jobx = "兼职"
          }
         
          wx.setStorageSync('jobx', jobx );
          wx.setStorageSync('childs', res.data.data.detail)
          // that.setData({
          //   seachKey: mycode
          // })
     }).then(res =>{
       console.log('列表的关键字:', that.data.seachKey);
      //  that.second()
          wx.navigateTo({
            url: '/pages/child/part-timeJob/part-timeJob'//实际路径要写全
          })
       })



  
  }//,
  //20180525 因接口更新，内带推荐 取消用关键字搜索
  // second:function(){
  //   var that =this;
  //   let requestPromisified = common.wxPromisify(wx.request);
  //     requestPromisified({
  //       data: {
  //         "pageIndex": 1,
  //         "pageSize": 3,
  //         "key": that.data.seachKey,
  //       },
  //       url: that.data.urlx,
  //       method: 'POST',
  //       header: {
  //         'content-type': 'application/json',
  //         'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='
  //       },
  //     }).then(res => {
  //       console.log('获取到推荐列表', res)

  //       wx.setStorageSync('cecom', res.data.data.positions)
        
       
  //     }).then(res => {
  //       console.log('00000003')
  //         wx.navigateTo({
  //           url: '/pages/child/part-timeJob/part-timeJob'//实际路径要写全
  //         })
  //     })
   

  // }     
  //路由跳转等end
  //搜索页路由跳转
  ,seek:function(){
    wx.navigateTo({
      url: '/pages/child/grabble/grabble?permanent=0'//实际路径要写全
    })
  },
//切换按钮
  active: function (e) {
    this.setData({
     'workType.activeIndex': e.currentTarget.id
    });
  
    if (e.currentTarget.id==0) {
     
      this.setData({
        fullTimeurl: 'http://120.27.100.219:54231/api/position/get_part_recommend',
        list: [],
        jobType:0
      })
      Index = 1;
      this.doLoadData(this);
    } else {
      this.setData({
        fullTimeurl: 'http://120.27.100.219:54231/api/position/get_full_recommend',
        list: [],
        jobType: 1
      })
      Index = 1;
      this.doLoadData(this);
    }
  }
  ,     /**授权 */
  bindGetUserInfo: function (e) {
    console.log("授权", e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.setStorage({
        key: "user",
        data: e.detail.userInfo
      })
      app.globalData.empower = true
      typeof cb == "function" && cb(app.globalData.empower)
    }
    this.setData({
   
        items: {
          height: self,
          masTitle: "",
          show: true,
          fages: false 
        },

    })
  }
})