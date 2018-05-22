// pages/child/grabble/grabble.js
var app = getApp();
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    historys: [],
    enjoy: [
      { name: "建造师" },
      { name: "前端开发工程师" },
      { name: ".net后端工程师" },
      { name: "UI设计师" },
      { name: "SEO工程师" },
      { name: "开发产品经理" },
    ],
    used_list: [
      { title: "分类01", name: "用证地址" },
      { title: "分类02", name: "证书类别" }
  
    ],
    used_lists: [
      { title: "分类01", name: "公司地址" },
      { title: "分类02", name: "职位类别" }

    ],
    searchList:[
      { name: "造价师" },
      { name: "广东省独资公司" },
      { name: "价格" },
      { name: "其他" },
      { name: "其他2" },
    ], 
    companys: "中住71",
    label: "50-150人/移动互联网/建筑/设计/教育",
    attestation: "http://www.liujiarong.top/WX/certified.png",
    types: "http://www.liujiarong.top/WX/popCompass.png",
    companyPerson: "http://www.liujiarong.top/WX/pending.png",
    history: "85664",
    counturl: "http://www.liujiarong.top/WX/Comup.png",
    city:"广州",
    pageShow:true,
    Fbutton:"取消",
    count:"",
    selectD:true ,
    gps:true,
    selected:true,
    selectType:'',
    changeJob:"兼职",
    company: true,
    xuhao:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.permanent==1){
      that.setData({
      company:false,
      changeJob:"公司"
      })
    }
    //console.log("254545", app.globalData.Jobl, app.globalData.CRL)
    this.setData({
      Jobl: app.globalData.Jobl,
      CRL: app.globalData.CRL
    })
    wx.showLoading({
      title: 'loading...',
    });
   //使用本地存储功能
    wx.getStorage({
      key: 'SeaHistory',
      success: function (res) {
       that.setData({
         historys:res.data
       })
      }
    });

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

      }
    });

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
      key: 'gabbleCity',
      success: function (res) {
        console.log(res.data)
        that.setData({
          'used_list[0].name': res.data.select_city,

        })
        wx.removeStorage({
          key: 'gabbleCity',
          success: function (res) {
         
          }
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
    var that = this
    wx.setStorage({
      key: "SeaHistory",
      data: that.data.historys
    }) 
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
  jumpCity: function (event) {

    wx.navigateTo({
      url: "/pages/child/citySelect/citySelect"
    })
  },
  active: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
    if(e.currentTarget.id==1){
      this.setData({
        selected: false
      })
    }else{
      wx.navigateTo({
        url: '/pages/child/citySelect/citySelect?other=usecity'//实际路径要写全
      })
      this.setData({
        activeIndex: -1
      })
    }
    
  
  },
  actives: function (e) {
    console.log(e.currentTarget.dataset.value)
    console.log("序号来着", e)
    this.setData({
      xuhao: e.currentTarget.id,
      selectType: e.currentTarget.dataset.value
    })

  },
  selectClick:function(){
    if(this.data.selectType==''){
      wx.showModal({
        title: '温馨提示',
        content: '您并没有选中任何类别',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    this.setData({
      selected:true,
      activeIndex:-1
    })
  },
  watchPassWord: function (event) {
    var that = this;
    var changdu =event.detail.value.length;
    if(changdu>0){
        that.setData({
        Fbutton: '完成',
         selectD: false,
         pageShow: true,
         gps: true
    })
    }else{
      that.setData({
        Fbutton: '取消',
        selectD: true ,
        gps: true
       
      })
    }
    // that.setData({
    //   city: res.data.select_city,
    // })
    console.log(event.detail.value);
    this.setData({
      count: event.detail.value
     

    })
  }, 
  urlTime:function(event){
    var that = this;
    var flage =that.data.Fbutton;
    if (flage=="完成"){
      that.setData({
        pageShow: false,
        gps:false,
        selectD:true
      })
    //监测输入后得到值 并存入本地变量 历史搜索
   console.log('搜索值',that.data.count);
   var self = that.data.historys;
   self.unshift(that.data.count); 
   self = that.dedupe(self)
   //console.log('更新后历史记录', self)
   that.setData({
     historys: self
   })
   // 历史搜索结束 
    }else{
      wx.navigateBack({ changed: true });//返回上一页  
    }
  }, 
  remove:function(){
    this.setData({
      historys: []
    })
  }
  , gitval:function(event){
    var that = this;
    console.log(event.currentTarget.dataset.val);
    //收索历史记录
    var self = that.data.historys;
    self.unshift(event.currentTarget.dataset.val); 
    self = that.dedupe(self)
    //收索历史记录end
    this.setData({
       count: event.currentTarget.dataset.val,
       Fbutton: '完成',
       pageShow: false,
       gps: false,
       selectD:true,
       historys: self
    })
  }, 
  open: function () {
    var that = this;
    if (that.data.company){
      wx.showActionSheet({
        itemList: ['兼职', '全职'],
        success: function (res) {
          if (!res.cancel) {

            if (res.tapIndex == 0) {
              that.setData({
                changeJob: "兼职"
              })
            } else {
              that.setData({
                changeJob: "全职"
              })
            }
          }
        }
      });
    }else{
     
    }
  
  }
  , clickMCity:function(){
    wx.navigateTo({
      url: "/pages/AboutCompany/AboutCompany"
    }) 
  }
  ,dedupe:function(array){
    var old = array.slice(0, 6);
    return Array.from(new Set(old));
  }
})  