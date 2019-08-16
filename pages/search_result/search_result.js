// pages/search_result/search_result.js

const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result_list: [
      // { tag: '购物', src: '/images/test/1.png', name: 'IFS', description: '和女儿的购物之行', price: '97', like_num: '499' },
      // { tag: '购物ascasscas', src: '/images/test/1.png', name: 'IFS', description: '和女儿的购物之行asvaevevscqws', price: '97000000', like_num: '499' },
      // { tag: '购物', src: '/images/test/1.png', name: 'IFS', description: '和女儿的购物之行', price: '97', like_num: '499' },
    ]
  },

  // 自定义函数 开始
  onClickSceneryItem: function(e){
    console.log(e);
    let scenery_id = e.currentTarget.id;
    util.myNavigateTo('../detail/detail?scenery_id=' + scenery_id);
  },

  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let { scenery_name } = options;
    let cb_success = function(res){
      that.setData({
        result_list: res.data
      })
    }
    util.myRequest('getSceneryByKeyword.php', { keyword: scenery_name }, 'GET', cb_success);
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