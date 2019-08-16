// pages/add_family/add_family.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 自定义函数 开始
  // 添加家庭成员，也就是一个 分享 功能。
  clickAddFamily: function(e){
    this.onShareAppMessage();
  },

  
  navigateToIndex:  function() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  // 自定义函数 结束

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  onShareAppMessage: function (res) {
    return {
      title: '我在使用同游小程序，加入我吧～',
      path: '/pages/authorization/authorization?openid='+wx.getStorageSync('openid'),
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      }
    }
  }
})