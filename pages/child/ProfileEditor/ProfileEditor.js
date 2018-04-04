var app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
   noteMaxLen: 58, //备注最多字数 
   limitNoteLen:0, 
   date:"",
   date_end: "",
   array: ['高中', '大专', '本科', '硕士','博士'],
   arrays: ['应届毕业生', '1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年', '10年以上'],
   arrayd: ['我目前已离职，可快速到岗', '我目前在职，正考虑换个新环境', '我暂时不想找工作', '我是应届毕业生'],
   name:"真实姓名",
   edit_name:"Sunyuklong",
   sex:"性别",
   edit_sex: "男",
   year:"出生年月",
   edit_year:"请选择",
   education: "最高学历",
   edit_education: "请选择",
   work: "工作年限",
   edit_work: "请选择",
   phone:"手机号码",
   edit_phone:"15521000786",
   email:"联系邮箱",
   edit_email:"请输入",
   city:"所在城市",
   edit_city:"广东",
   state:"当前状态",
   edit_state:"我目前已离职，可快速到岗"
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var arrc = sjc();
   this.setData({
     date: arrc[1],
     date_end: arrc[0],
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
    var that = this;
    wx.getStorage({
      key: 'cargo',
      success: function (res) {
        console.log(res.data)

        
        that.setData({

          edit_city: res.data.select_city

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
  onPullDownRefresh: function () {
    // do somthing
    wx.stopPullDownRefresh();
  },
  //通俗的select功能
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
    
      
        if (!res.cancel) {
          //console.log(res.tapIndex)
          var sex = res.tapIndex;
          if(sex==0){
            console.log("男")
            // edit_sex="男"
            that.setData({
              edit_sex: "男"
            })
            
          }else{
            // edit_sex = "女"
            console.log("女")
            that.setData({
              edit_sex:"女"
            })
          }
         
        }
      }
    });
  },
  open_stata: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['我目前已离职，可快速到岗', '我目前在职，正考虑换个新环境','我暂时不想找工作','我是应届毕业生'],
      success: function (res) {
       
        that.setData({

          edit_state: that.data.arrayd[res.tapIndex]

        })
        //console.log(res.tapIndex)
        console.log(that.data.arrayd[res.tapIndex])
      }
    });
  },
  //时间下拉选择器
  bindDateChange: function (e) {
    this.setData({
      edit_year: e.detail.value
    })
   
   
  },
  //学历选择
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
  
      edit_education: that.data.array[e.detail.value]
     
    })
  },
  //工作年限
  bindPickerwork: function (e) {
    var that = this;
    this.setData({

      edit_work: that.data.arrays[e.detail.value]

    })
  },
  click_city:function(){
    wx.navigateTo({
      url: "../../child/citySelect/citySelect"
    })
  },
  //字数限制  
  bindWordLimit: function (e) {
    var value = e.detail.value, len = parseInt(value.length);
    if (len > this.data.noteMaxLen) return;

    this.setData({
      currentNoteLen: len, //当前字数  
      limitNoteLen:this.data.noteMaxLen - len //剩余字数  
    });
  }  

})

function sjc(){
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
   
  return [Y-50+"-"+M,Y+"-"+M];
}
