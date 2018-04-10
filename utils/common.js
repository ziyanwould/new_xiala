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
  
}

module.exports = {
  //要引用的函数 xx:xx
  sjc: sjc,
  tanchu: tanchu,
  SomeThing: SomeThing
}
