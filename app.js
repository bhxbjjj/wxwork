// app.js
App({
  async onLaunch() {
    // 展示本地存储能力
    /*  const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })*/
    if (!wx.cloud) {
      console.log('请使用2.2.4以上的基础库，才能用云开发')
    } else {
      wx.cloud.init({
        env: 'ccc-0gza9u9k4c647f4e',
        traceUser: true
      })
    }
    let r = await wx.cloud.callFunction({
      name: 'pc_directions'
    })
    console.log('pc_directions:', r)
    this.globalData.directions = r.result.directions.list.map(v => {
      return v.name
    })
    this.globalData.nums = r.result.directions.list.map(v => {
      return v.num
    })
    r = await wx.cloud.callFunction({
      name: 'pc_userLogin'
    })
    console.log('pc_userLogin:', r)
    this.globalData.user = r.result.result
    if (r.result.result.name === 'nobody') {
      wx.redirectTo({
        url: '/pages/work17/register',
      })
    } else if (this.globalData.user.choosen) {
      wx.redirectTo({
        url: '/pages/work17/profile',
      })
    } else {
      wx.redirectTo({
        url: '/pages/work17/rank',
      })
    }
  },
  globalData: {
    userInfo: null
  }
})