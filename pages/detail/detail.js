// pages/detail/detail.js

const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scenery_id: '',
    scenery: {
      id: '0',
      src: '/images/test/1.png',
      name: '八达岭长城',
      like_num: 188,
      collect_num: 100,
      visit_time: 3,
      price: 1000,
      open_time: '平日-11:00～22:30<br/>节假日-10:30～22:30',
      location: '北京市延庆县军都山关沟古道北口216省道',
      score: 4.9,
      desc_detail: '八达岭长城史称天下九塞之一，是万里长城的精华，在明长城中，独具代表性，八达岭景区以八达岭长城为主，兴建了八达岭饭店、全周影院和由江泽民主席亲笔题名的中国长城博物馆等功能齐全的现代化旅游服务设施。八达岭景区以其宏伟的景观、完善的设施和深厚的文化历史内涵而著称于世，古称“居庸之险不在关而在八达岭”。该段长城地势险峻，居高临下，集巍峨险峻、秀丽苍翠于一体。八达岭是历史上许多重大事件的见证，从八达岭取道大同，再驾返咸阳；肖太后巡幸、元太祖入关、元代皇帝每年两次往返北京和上都之间、明代帝王北伐、李自成攻陷北京、清代天子亲征……八达岭都是必经之地。近代史上，慈禧西逃泪洒八达岭——京张铁路、孙中山先生登临八达岭长城等，都留下了许多历史典故和珍贵的历史回忆。八达岭长城驰名中外，誉满全球。“不到长城非好汉”。迄今。八达岭已接待中外游人一亿三千万，先后有尼克松、里根、撒切尔、戈尔巴乔夫、伊丽莎白、希思等372位外国首脑和众多的世界风云人物，登上八达岭观光游览。'
    },
    like_collect: {
      like: false,
      collect: false
    }
  },

  // 自定义函数 开始
  // 查询当前景点是否被当前用户收藏过
  isUserCollected: function(){
    let cb_success = function(res){
      // console.log(res);
      return res.data !== [];
    }
    util.myRequest('isUserCollected.php', { user_id: wx.getStorageSync('openid'), scenery_id: this.data.scenery.id}, 'GET', cb_success);
  },
  // 点击 like
  onClickLike: function(e) {
    let { like } = this.data.like_collect;
    this.setData({
      ['like_collect.like']: !like,
    }, function(){
      let { like } = this.data.like_collect;
      let { like_num } = this.data.scenery;
      this.setData({
        ['scenery.like_num']: like ? (parseInt(like_num)+1) : parseInt(like_num)-1
      })
    })
  },

  // 点击 collect
  // add_delete: -1减， 1加。添加、取消收藏均会触发！！
  editToMyCollect: function(add_delete, user_id, scenery_id){
    let cb_success = function(res){

    }
    util.myRequest('editToMyCollect.php', { add_delete: add_delete, user_id: wx.getStorageSync('openid'), scenery_id: scenery_id }, cb_success);
  },
  // 添加、取消收藏均有可能。
  onClickCollect: function (e) {
    let { collect } = this.data.like_collect;
    this.setData({
      ['like_collect.collect']: !collect,
    }, function () {
      let { collect } = this.data.like_collect;
      let { collect_num } = this.data.scenery;
      this.setData({
        ['scenery.collect_num']: collect ? (parseInt(collect_num) + 1) : parseInt(collect_num) - 1
      })
      // 入库并提示收藏成功
      if(collect){
        this.editToMyCollect
        util.myShowToast('收藏成功！', 'success');
      }else {
        util.myShowToast('取消收藏！');
      }
    })
  },
  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let { scenery_id } = options;
    console.log(scenery_id);
    // 向后端发起请求，获取 当前scenery_id 对应的景点信息
    let cb_success = function (res) {
      if (!res.data[0]) {
        util.myShowToast('暂无该景点信息～');
        return;
      }
      that.setData({
        scenery: res.data[0],
        ['res.like_collect.collect']: that.isUserCollected()
      })
    }
    util.myRequest('getDetailBySceneryId.php', { scenery_id: scenery_id }, 'GET', cb_success);
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