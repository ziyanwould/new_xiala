Page({
  data: {
    latitude: 23.014030,
    longitude:113.108200,
    markers: [{
      id: 1,
      latitude: 23.092967,
      longitude: 113.290865,
      name: 'T.I.T 创意园'
    }],
    // covers: [{
    //   latitude: 23.099994,
    //   longitude: 113.344520,
    //   iconPath: 'http://www.liujiarong.top/WX/location.png'
    // }, {
    //   latitude: 23.099994,
    //   longitude: 113.304520,
    //   iconPath: 'http://www.liujiarong.top/WX/location.png'
    // }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  getPhoneNumber: function (e) {
    console.log("errMsg值：", e.detail.errMsg)
    console.log("iv值：", e.detail.iv)
    console.log("encryptedData值：", e.detail.encryptedData)
  } 
})
