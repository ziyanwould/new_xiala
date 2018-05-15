var app = getApp();
function sjc() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours();
  //分  
  var m = date.getMinutes();
  //秒  
  var s = date.getSeconds();

  //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  

  return [Y - 50 + "-" + M, Y + "-" + M,Y];
};
//获取页面高度
function tanchu(){
  var height =0;
  console.log('onLoad')
  var that = this
  wx.getSystemInfo({
    success: function (res) {
    height=res.windowHeight
    }
  })
  return height;
};

function SomeThing(api){
  wx.navigateTo({
    url: api 
  })
  
};



//封装请求
var requestHandler = {
  params: {},
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  },
};

function request(url, requestHandler,token) {
  //注意：可以对params加密等处理  
  var params = requestHandler.params;
  //获取登录钥匙
   wx.request({
          url: 'http://120.27.100.219:54231/' + url,
          data: params,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header 
          header: {
            'content-type': 'application/json',
            'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
            'login_token': token
          },
          success: function (res) {
            //注意：可以对参数解密等处理  
            requestHandler.success(res)
          },
          fail: function () {
            requestHandler.fail()
          },
          complete: function () {
            // complete  
          }
        })



  //无奈之举，应该用promise处理异步
  // setTimeout(function(){
  //   wx.request({
  //     url: 'http://120.27.100.219:54231/' + url,
  //     data: params,
  //     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
  //     // header: {}, // 设置请求的 header 
  //     header: {
  //       'content-type': 'application/json',
  //       'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
  //       'login_token': mysey
  //     },
  //     success: function (res) {
  //       //注意：可以对参数解密等处理  
  //       requestHandler.success(res)
  //     },
  //     fail: function () {
  //       requestHandler.fail()
  //     },
  //     complete: function () {
  //       // complete  
  //     }
  //   })
  // },50)
};

/**获取基本信息及更新初始化 */
function getinst(token)  {
  request('usercenter/get_userinfo',
    {
      success: function (res) {
        console.log("获取基本信息及更新初始化", res)
        if (res.data.message=="未登录"){
          return false;
        }
        setintuse(res)
      },
      fail: function () {
        //失败后的逻辑  
      },
    }, token)
}

//更新信息
function setintuse(datas){
  let info = datas.data.data.userinfo;
  console.log(info)
  if (info.real_name!=''){
    var infos = new Object();
    infos.nickName = info.real_name;
    infos.gender = info.sex;
    infos.city = info.city;
    infos.province = info.province;
    infos.birth = info.birth;
    infos.county = info.county;
    infos.education = info.education;
    infos.email = info.email;
    infos.job_status = info.job_status;
    infos.job_years = info.job_years;
    infos.phone = info.phone;
    infos.province = info.province;
    infos.reg_time = info.reg_time;
    infos.remark = info.remark;
    infos.verify_status = info.verify_status;
    infos.avatarUrl = info.header_img;
    wx.setStorage({
      key: "user",
      data: infos
    })
  }else{
    wx.getStorage({
      key: 'user',
      success: function (res) {
        var datas = {
          "avatarUrl": res.data.avatarUrl,
          "real_name": res.data.nickName,
          "sex": res.data.gender,
          "birth": "",
          "education": "",
          "job_years": "",
          "phone": "",
          "email": "",
          "province": res.data.province,
          "city": res.data.city,
          "county": "",
          "job_status":0,
          "remark": "寄君一曲，不论曲终人离散"
        }

        request('usercenter/update_userinfo',
          {
              params: datas,
              success: function (res) {
              console.log("测试初始化设置用户信息", res)

            },
            fail: function () {
              //失败后的逻辑  
            },
          }, false)
     
      }
      , fail: function () {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，你可以在本页面授权按钮继续授权，否则将用默认信息代替你的个人信息,可编辑修改。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
 

  }
  

}

//设置渲染用户信息界面
function setStronguser (myevent){
  wx.getStorage({
    key: 'user',
    success: function (res) {
      myevent.success(res)
      console.log("渲染用户信息this.data里", res)
  
    }
    , fail: function () {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，你可以在本页面授权按钮继续授权，否则将用默认信息代替你的个人信息,可编辑修改。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  })
}
module.exports = {
  //要引用的函数 xx:xx
  sjc: sjc,
  tanchu: tanchu,
  SomeThing: SomeThing,
  request: request,
  getinst: getinst,
  setStronguser: setStronguser
  
 
}
