// pages/my_info/my_info.js

const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick_name: '',
    role: '',
    // 传给后端时候，每个标签以 ‘,‘ 隔开
    tags: [
      { name: '魅力夜色', checked: false },
      { name: '购物', checked: false },
      { name: '最爱小镇', checked: false },
      { name: '自然', checked: false },
      { name: '新晋良铺', checked: false },
      { name: '美拍首选', checked: false },
      { name: '艺术设计', checked: false },
      { name: '歌剧话剧', checked: false },
      { name: '音乐演出', checked: false },
      { name: '市井小馆', checked: false },
    ],
    // 本页完成度
    process_step: 1,
  },


  // 自定义函数 开始

  // 角色 或 个性标签 改变时均会触发
  changeRole_Tag: function(e){
    let { tags, role } = this.data;
    // console.log(role);
    // 角色 和 标签 仅有一个被选 
    if ((!role && tags.some(item => item.checked)) || (role && !tags.some(item => item.checked))){
      this.setData({
        process_step: 2,
      })
    } else if (role && tags.some(item => item.checked)) { // 角色 和 标签 都已选 
      this.setData({
        process_step: 3
      })
    } else {
      this.setData({ // 角色 和 标签 都已选 
        process_step: 1
      })
    }
  },

  onChangeRole: function(e){
    // console.log(e.currentTarget.id);
    // 可能会取消原先选择的
    let new_role = this.data.role === e.currentTarget.id? '' : e.currentTarget.id;
    this.setData({
      role: new_role
    },this.changeRole_Tag)
  },

  onChangeMyTag: function(e){
    // console.log(e.currentTarget.id);
    let tag = e.currentTarget.id;
    let new_tags = this.data.tags.map(item => {
      return (item.name === tag) ? JSON.parse(`{ "name": "${item.name}", "checked": ${!item.checked}}`) : item
    })
    // let item = { name: '魅力夜色', checked: false };   
    // console.log(JSON.parse(`{ "name": "${ item.name }", "checked": ${!item.checked}}`));
    // console.log(new_tags);
    this.setData({
      tags: new_tags
    }, this.changeRole_Tag)
  },

  // 提交个人信息
  onCommitInfo: function(e) {
    let that = this;
    if(this.data.process_step !== 3){
      util.myShowToast('信息未填写完，提交失败！');
      return ;
    }
    // 信息填写完毕，进一步确认(因为要入库！！)
    let cb_confirm = function(){
      // 二次确认后 进库，重定位到 add_family
      let {role, tags} = that.data;
      let new_tags = tags.filter(item => item.checked).map(item => item.name).join(',');
      let cb_success = function(res){
        console.log(res);
        if(res.data === 0){
          util.myRedirectTo('../add_family/add_family')
        }
      }
      util.myRequest('updateUserTag.php', { id: wx.getStorageSync('openid'), role: role, tags: new_tags }, 'GET', cb_success)
    }

    let cb_cancel = function () {
      util.myShowToast('取消成功！', 'success');
    }
    util.myShowModal('确认提交？', '提交的资料可能会难以更改哦～', cb_confirm, cb_cancel);

    // 进入 添加家庭成员页面
    // util.myNavigateTo('../add_family/add_family')
  },
  // 自定义函数 结束

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(wx.getStorageSync('user_info')).nickName);
    this.setData({
      nick_name: JSON.parse(wx.getStorageSync('user_info')).nickName
    })
    // console.log(wx.getStorageSync('user_info'));
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