//index.js

const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图的列表
    carousel_list: [
      { id: '1', src: '/images/test/1.png' },
      { id: '2', src: '/images/test/1.png' },
      { id: '3', src: '/images/test/1.png' },
    ],

    // 大区列表，默认选中中国
    big_area_list: ['中国', '亚洲', '欧洲', '北美洲', '大洋洲', '其他'],
    // 小区列表
    mini_area_list: ['全部','北京','上海','成都','三亚','广州','重庆','深圳','西安','其他'],
    all_result_list: [],
    // 筛选结果列表
    result_list: [
      // { id: '0', src:'/images/test/1.png', name: '大阪', rate: '85.00', visit_time: '3' },
      // { id: '1', src:'/images/test/1.png', name: '大阪', rate: '82.40', visit_time: '3' },
      // { id: '2', src:'/images/test/1.png', name: '大阪', rate: '85.33', visit_time: '3' },
    ],
    // 默认筛选条件为 中国 - 全部
    area: {
      big: '中国',
      mini: '全部'
    }
  },


  // 自定义函数 开始
  // 点击定位
  onClickLocation: function(){
    util.myShowToast('将在后续版本中加入～');
  },

  // 点击 搜索 ， 将跳转至 搜索页面[历史记录暂时写死？]
  navigateToSearch: function(){
    util.myNavigateTo('../search/search');
  },
  // 点击轮播图中的 某张图片之后
  onClickCarousel: function(e){
    let scenery_id = e.currentTarget.id;
    util.navigateToDetail(scenery_id)
  },

  // 抽象出 改变大、小区 的公共行为函数
  onChangeBigMini: function(big, mini){
    let { all_result_list } = this.data;
    let new_result_list = (mini === '全部') ? all_result_list.filter(item => item.big_area === big) : all_result_list.filter(item => item.big_area === big).filter(item => item.mini_area===mini);
    this.setData({
      result_list: new_result_list
    })
  },

  // 改变 大区的值, 向后端发起请求并更新数据
  onChangeBigArea: function (e) {
    let that = this;
    let big_area = e.currentTarget.id;
    that.setData({
      ['area.big']: big_area
    }, function(){
      let { big, mini } = this.data.area;
      this.onChangeBigMini(big, mini);
    })
  },

  // 改变 小区的值, 向后端发起请求并更新数据
  onChangeMiniArea: function (e) {
    let that = this;
    let mini_area = e.currentTarget.id;
    that.setData({
      ['area.mini']: mini_area
    }, function () {
      let { big, mini } = this.data.area;
      this.onChangeBigMini(big, mini);
    })
  },

  // 点击 非添加／取消图标 区域
  onClickSceneryItem: function (e) {
    let scenery_id = e.currentTarget.id;
    util.navigateToDetail(scenery_id);
  },

  // 点击 添加／取消 图标， 更新 my_trip 表的信息等！！
  onClickAddIcon: function(e){
    let that = this;
    let scenery_id = e.currentTarget.id;
    let { all_result_list, result_list } = that.data;
    let new_all_result_list = all_result_list.map(item => {
      item.checked = (item.id === scenery_id && !item.checked) ? true : false;
      item.checked = (item.id === scenery_id && item.checked) ? false : true;
      return item;
    });
    let new_result_list = result_list.map(item => {
      item.checked = (item.id === scenery_id && !item.checked) ? true : false;
      item.checked = (item.id === scenery_id && item.checked) ? false : true;
      return item;
    });

    
    this.setData({
      all_result_list: new_all_result_list,
      result_list: new_result_list
    }, function(){
      console.log(this.data.all_result_list[0].checked, this.data.result_list[0].checked)
    })
  },

  //查询具体的 景点id 是否被用户添加至行程过
  isUserAddToTrip: function(scenery_id){
    let cb_success = function(res){
      return res.data !== [];
    }
    util.myRequest('isUserAddToTrip.php', { user_id: wx.getStorageSync('openid'), scenery_id: scenery_id }, 'GET', cb_success)
  },

  //自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取所有的旅游景点，有 前端去过滤？？ 在这写还是在 onShow() ??
    let that = this;
    let cb_success = function(res){
      that.setData({
        all_result_list: res.data.map(item => {
          that.isUserAddToTrip(item.id) ? item.checked = true : item.checked = false;
          item.rate = (item.rate/100).toFixed(2)
          return item;
        })
      }, function(){
        result_list: that.onChangeBigMini('中国', '全部')
      })
    };
    util.myRequest('getAllScenery.php', {}, 'GET', cb_success)
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