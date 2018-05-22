//app.js
var common = require('/utils/common.js');
App({
  data: {
    deviceInfo: {}
  },
  onLaunch: function () {
    this.data.deviceInfo = wx.getSystemInfoSync();

    // console.log(this.data.deviceInfo);
    //调用API从本地缓存中获取数据
     var that = this
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    /*是否登录  更新状态*/
    var _this = this;

    /**20180511 因微信接口更改进行技术重构 */
    wx.getStorage({
      key: 'login',
      success: function (res) {
        console.log("login", res.data)
        if (res.data) {
      
        }else{
       
        }
      },
      fail:function(){
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求    
              console.log("发起网络请求", res.code)
              //that.globalData.openid = res.code
              wx.request({
                url: 'http://120.27.100.219:54231/api/common/get_wx_openid',
                header: {
                  'content-type': 'application/json',
                  'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

                },
                method: 'POST',
                data: {
                  code: res.code
                },


                success: function (event) {
                  console.log(event.data.data.wx_openid)
                 // let user = [event.data.nickName, event.data.avatarUrl]
                 // console.log(user)
                  wx.setStorage({
                    key: "openId",
                    data: event.data.data.wx_openid
                  });

                  //更新全局变量方式 20180515
                  _this.globalData.oppenid = event.data.data.wx_openid
                  typeof cb == "function" && cb(that.globalData.oppenid)
                  //更新全局变量结束 20180515

                  //20180511重构2暂时 取消基本信息
                  // wx.getUserInfo({
                  //   success: function (resuser) {
                  //     //let user = [resuser.data.nickName, resuser.data.avatarUrl]
                  //     wx.setStorage({
                  //       key: "user",
                  //       data: resuser.userInfo
                  //     })
                  //     console.log(resuser.userInfo)
                  //   },
                  //   fail: function () {
                  //     // 调用微信弹窗接口
                  //     wx.showModal({
                  //       title: '警告',
                  //       content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                  //       success: function (res) {
                  //         if (res.confirm) {
                  //           console.log('用户点击确定')
                  //         }
                  //       }
                  //     })
                  //   }
                  // })
                }

              })

            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })
   /**设置职位列表与证书列表 */
 
  
    try {
      var value = wx.getStorageSync('Jobl')
      if (value) {
        //更新全局变量方式 20180515
        _this.globalData.Jobl = value
        typeof cb == "function" && cb(that.globalData.Jobl)
            //更新全局变量结束 20180515
      }else{
        common.request('sort/get_job_type', {
          params: {},
          success: function (res) {
           // console.log('获取列表', res.data.data.list);
            wx.setStorageSync('Jobl', res.data.data.list)

            //更新全局变量方式 20180515
            _this.globalData.Jobl = res.data.data.list
            typeof cb == "function" && cb(that.globalData.Jobl)
            //更新全局变量结束 20180515
          }
        })
      }

    } catch (e) {
      //错误执行
    }

    try {
      var value = wx.getStorageSync('CRL')
      if (value) {
        //更新全局变量方式 20180515
        _this.globalData.CRL = value
        typeof cb == "function" && cb(that.globalData.CRL)
        //更新全局变量结束 20180515
      } else {
        common.request('sort/get_ger_type', {
          params: {},
          success: function (res) {
            // console.log('获取列表', res.data.data.list);
            wx.setStorageSync('CRL', res.data.data.list)

            //更新全局变量方式 20180515
            _this.globalData.CRL = res.data.data.list
            typeof cb == "function" && cb(that.globalData.CRL)
            //更新全局变量结束 20180515
          }
        })
      }

    } catch (e) {
      //错误执行
    }

  },

  globalData:{
    userInfo:null,//用户共用的基本信息
    oppenid:null,//用户的openID
    login:null,//用户的登录凭证
    city:null,//编辑页的城市选择
    empower:null,//授权标识值
    Jobl:[],//职位列表
    CRL:[],//证书列表
    ResumeFull: {
      "name": "resume",
      "isNonProfit": true,
      "expectWork": {
        "work": "设计师",
        "city": "广州",
        "positionType": "全职",
        "monthlyPay": "5K - 10K",
        "moreInfo": "我希望迅速到岗"
      },
      "workExperience": [
        { "id":0,
          "post": "UI设计师",
          "company": "广州中住七一网络科技有限公司",
          "startTime": "2017-6",
          "endTime": "2018-6",
          "jobContent": "负责公司的UI设计"//可选
        },
        {
          "id": 1,
          "post": "前端设计师",
          "company": "广州中住七一网络科技有限公司",
          "startTime": "2017-6",
          "endTime": "2018-6",
           "jobContent": "负责公司的WEB"//可选
        }
      ],
      "education": [
        {
          "id": 0,
          "school": "中山大学",
          "profession": "计算机与科学",
          "graduate": 2018,
          "educationBack": "本科"
        },
        {
          "id": 1,
          "school": "广西民族师范学院",
          "profession": "通信工程",
          "graduate": 2018,
          "educationBack": "本科"
        }
      ],
      "certificate": [
        {
          "id": 0,
          "NameCertificate": "全国建设工程造价员资格证",
          "organization": "广州建设职业培训学校",
          "registration":"初始",
          "state":"代挂",
          "useRe":"资质",
          "location":"广州",
          "startTime": "2011-2",
          "endTime": "2014-2"
        },
        {
          "id": 1,
          "NameCertificate": "全国建设工程造价员资格证",
          "organization": "北京建设职业培训学校",
          "registration": "初始",
          "state": "代挂",
          "useRe": "资质",
          "location": "广州",
          "startTime": "2011-2",
          "endTime": "2014-2"
        }
      ],
      "projectExperience": [
        {
          "id": 0,
          "projectName": "中住七一官网",
          "role": "设计师",
          "startTime": "2016-9",
          "endTime": "2018-5",
          "projectContent": " 投递简历后，人力资源部门将对简历进行刷选，符合要求的应聘者参与企业面试，面试过程中，如果有技术经验，通过技术面试可直接上岗，薪资5000起；如果没有技术经验者，会有笔试环节，笔试内容为逻辑测试题及较为基础的技术题目。测试通过后可以参与1-4个月岗前技术培训，签订保底薪酬，薪资4000起。 "
        },
        {
          "id": 1,
          "projectName": "17洗车官网",
          "role": "前端设计师",
          "startTime": "2016-9",
          "endTime": "2018-5",
          "projectContent": " 投递简历后，人力资源部门将对简历进行刷选，符合要求的应聘者参与企业面试，面试过程中，如果有技术经验，通过技术面试可直接上岗，薪资5000起；如果没有技术经验者，会有笔试环节，笔试内容为逻辑测试题及较为基础的技术题目。测试通过后可以参与1-4个月岗前技术培训，签订保底薪酬，薪资4000起。 "
        }
      ],
      "selfDescription": {
        "content": "寄君一曲，不论曲终人离散"
      },
      "userDefine": [
        {
          "id": 0,
          "title": "个人技能",
          "content": "HTML5，angular，Vue等"
        },
        {
          "id": 1,
          "title": "爱好",
          "content": "摄影，旅游，听音乐，美食不可辜负"
        }
      ],
      "updateTime": "2018-03-20 10:03"
    },//一个简历信息
    resumePart: {
      "name": "resume",
      "isNonProfit": true,
      "expectWork": {
        "work": "一级建造师",
        "city": "广州",
        "positionType": "兼职",
        "monthlyPay": "5K - 10K",
        "moreInfo": "我希望迅速到岗"
      },
      "certificate": [
        {
          "id": 0,
          "NameCertificate": "全国建设工程造价员资格证",
          "organization": "广州建设职业培训学校",
          "registration": "初始",
          "state": "代挂",
          "useRe": "资质",
          "location": "广州",
          "startTime": "2011-2",
          "endTime": "2014-2"
        },
        {
          "id": 1,
          "NameCertificate": "全国建设工程造价员资格证",
          "organization": "北京建设职业培训学校",
          "registration": "初始",
          "state": "代挂",
          "useRe": "资质",
          "location": "广州",
          "startTime": "2011-2",
          "endTime": "2014-2"
        }
      ],
  
      "selfDescription": {
        "content": "建造师证15年考的，职称证去年在福建评的，有红头文件评审表"
      },
   
      "updateTime": "2018-05-20 18:03"
    },//一个简历信息
  }
})