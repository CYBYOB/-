// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面列表
    page_list: ['authorization', 'my_info', 'add_family', 'index', 'feedback', 'about', 'search', 'search_result', 'detail', 'me', 'confirm_trip']
  },

  // 自定义函数 开始
  on_click_page_item: (e) => {
    let page_name = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/' + page_name + '/' + page_name,
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
  onShareAppMessage: function () {

  }
})