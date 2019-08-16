// pages/search/search.js

const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history_list: [],
    all_scenery_name: [],
    scenery_name: [],
    keyword: '',
  },

  // 自定义函数 开始
  // 更新关键字
  onChangeKeyword: function (e) {
    let keyword = e.detail.value;
    let { all_scenery_name } = this.data;

    this.setData({
      keyword,
      scenery_name: all_scenery_name.filter(item => {
        return keyword && item.name.includes(keyword)
        // return item.name.includes(keyword)
      }).slice(0, 5) // 最多只取5条
    })
  },

  // 点击候选景点中的 或者 搜索历史中的 一个，都会调用同一个函数！！
  navigateTodetail(e){

  },

  // 点击候选景点中的 一个，直接 携带scenery_id 跳转至 detail页面。并添加至历史记录缓存中，与 按下回车键一致
  onClickSceneryItem: function (e) {
    // 存入历史搜索缓存 并 发起搜索请求
    let new_history_list = JSON.parse(wx.getStorageSync('history_list'));
    new_history_list.unshift(e.currentTarget.dataset.name);
    wx.setStorageSync('history_list', JSON.stringify([...new Set(new_history_list)]));
    console.log(wx.getStorageSync('history_list'))

    let scenery_id = e.currentTarget.id;
    util.myNavigateTo('../detail/detail?scenery_id=' + scenery_id);
  },

  // 点击清空历史缓存记录
  onClickDelete: function(){
    let that = this;
    let cb_success = function(){
      wx.setStorageSync('history_list', JSON.stringify([]))
      util.myShowToast('清空成功！', 'success');
      that.onShow();
    }
    let cb_cancel = function () {
      util.myShowToast('取消成功！');
    }
    util.myShowModal('清除','确定清空历史？', cb_success, cb_cancel);
  },

  // 点击 回车等搜索键 或 搜索历史中的某一个,均携带 景点名字 触发 getSceneryByKeyword 函数
  getSceneryByKeyword: function (scenery_name){
    util.myNavigateTo('../search_result/search_result?scenery_name=' + scenery_name);
  },
  onClickHistoryItem: function (e){
    let scenery_name = e.currentTarget.id;
    this.getSceneryByKeyword(scenery_name)
  },
  onConfirmSearch: function(){
    let { keyword } = this.data;
    if (!keyword){
      util.myShowToast('搜索关键字不能为空哦～');
      return ;
    }
    // 存入历史搜索缓存 并 发起搜索请求
    let new_history_list = JSON.parse(wx.getStorageSync('history_list'));
    new_history_list.unshift(keyword);
    wx.setStorageSync('history_list', JSON.stringify([...new Set(new_history_list)]));
    console.log(wx.getStorageSync('history_list'))
    this.getSceneryByKeyword(keyword);
  },

  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload!!');
    let that = this;
    // 载入缓存中的 搜索记录
    wx.setStorageSync('history_list', JSON.stringify(['八达岭', '恭王府', '颐和园', '故宫', '东方明珠', '日本环球影城', 'storage']));

    // 获取所有的 景点的名字、id 并存放至缓存
    let cb_success = function(res){
      wx.setStorageSync('all_scenery_name', res.data)
      that.setData({
        all_scenery_name: res.data
      })
    }
    util.myRequest('getAllSceneryName.php', {}, 'GET', cb_success);
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
    this.setData({
      history_list: JSON.parse(wx.getStorageSync('history_list')).slice(0, 8)
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
})