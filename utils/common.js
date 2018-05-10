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

  wx.request({
    url: 'http://120.27.100.219:54231/common/'+url,
    data: params,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header 
    header: {
      'content-type': 'application/json',
      'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
      'login_token':token
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
}
module.exports = {
  //要引用的函数 xx:xx
  sjc: sjc,
  tanchu: tanchu,
  SomeThing: SomeThing,
  request: request
  
 
}
