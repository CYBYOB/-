// pages/authorization/authorization.js

const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // 自定义函数 开始
  getUserInfo: function (e) {
    if (e.detail.userInfo == undefined) {
      util.myShowToast('授权方能更好的体验哦～')
      return;
    }

    // 用户允许授权，将 userInfo 数据存放到 storage 和 全局变量 中。
    let userInfo = e.detail.userInfo;
    app.data.userInfo = userInfo;
    wx.setStorageSync('user_info', JSON.stringify(userInfo));

    // 通过 login 获取到 openid ,并存放到 storage 和 全局变量 中
    wx.login({
      success(res) {
        console.log('不含openid的res:', res)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx468a8bf22a59ac97',
            secret: '4372cd69f4f0bdf39961de437e7c089a',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          // 通过 code 获取到 openid , 然后将 openid 存放到 全局变量和 Storage 中。
          // 并且插入到数据库中，方便以后 只要通过 openid 就能获取到相关的信息
          success(res) {
            console.log('含openid的res:', res)
            app.data.openid = res.data.openid;
            wx.setStorageSync('openid', res.data.openid);
            // wx.setStorageSync('openid', '0');

            // 将用户数据插入到 数据库中。
            let callbackSuccess = function (res) {
              // console.log('将用户数据插入到数据库中,结果:', res)
              console.log(typeof res.data);
              if(res.data === 0){
                util.myShowToast('授权成功！', 'success');
              } else {
                util.myShowToast('授权失败！');
              }
            }

            let data = {
              id: res.data.openid,
              nick_name: userInfo.nickName,
              src: userInfo.avatarUrl
            }
            util.myRequest('authorization.php', data, 'GET', callbackSuccess);

            // 所需的 user_info 、oprnid 都存放好了，跳转到小程序的首页
            wx.redirectTo({
              url: '../my_info/my_info',
            })
          }
        })
      }
    });
  },
  // 自定义函数 结束


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let cb_success = function(res) {
    //   console.log(res);
    // }

    // util.myRequest('getAllScenery.php', {keyword: '八达岭,sscad,想死啊和 i,阿松从啊还是词汇'}, 'GET', cb_success);
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