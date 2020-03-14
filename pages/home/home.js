import services from '../../service/home.js';
import {setWatcher} from '../../service/watch.js';
import { jpg } from '../../service/config.js';

const TOP_DISTANCE = '580';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    styles: {
      height:'390rpx',
      autoplay: true,
      interval: 3000,
      circular: true,
      displayMultipleItems: 1,
      indicatorDots: true,
      indicatorColor: 'rgba(0,0,0,.3)',
      indicatorActiveColor: "#ff5777"
    },
    banners: [],
    recommends: [],
    list: ['流行','新款','精选'],
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] }
    },
    newGoods: [],
    tabNow: 'pop',
    nowbody: [],
    promise: new Promise(()=>{}),
    scrollhidden: false,
    tabbarfixed: 'tabbarfixedhide',
  },

  watch:{
    goods: function (newVal, oldVal){
      this.data.promise.then((req)=>{
        console.log(req)
        this.setData({
          nowbody: req[this.data.tabNow].list
        })
      })
    }
  },
  
  propdetail(val){
    // 1.获取iid
    // const iid = this.data.goodsitem.iid;
    // 2.跳转到对应的路径
    wx.navigateTo({
      url: '/pages/detail/detail?iid=' + val.detail,
    })
  },

  itemclick(v) {
    switch(v.detail.title){
      case '流行':
        this.setGoodsVal('pop');
        break;
      case '新款':
        this.setGoodsVal('new');
        break;
      case '精选':
        this.setGoodsVal('sell');
        break;
      default:
        this.setGoodsVal('pop');
        break;
    }
  },
  setGoodsVal(v) {
    this.setData({
      tabNow: v
    });
    this.servicesjpg(v);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setWatcher(this);
    services.getMultiData(options).then(res=>{
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    }).catch(req=>{
      console.log(req)
    });
    this.servicesjpg(this.data.tabNow);
  },
  servicesjpg(type) {
    wx.showToast({
      title: 'loading...',
      duration: 500,
      icon: 'loading',
      mask: true,
      success: function () {
        const page = this.data.goods[type].page + 1;
        // 请求详情
        this.setData({
          promise: new Promise((resolve, reject) => {
            services.getGoodsData({ type: type, page: page }).then(res => {
              if (res.statusCode == 200) {
                const obj = this.data.goods;
                obj[type].page = page;
                obj[type].list = [...this.data.goods[type].list, ...jpg(page, type)];
                this.setData({
                  goods: obj
                });
                resolve(obj);
                console.log(this.data.goods)
              }
            }).catch(req => {
              reject('error');
              console.log(req)
            });
          })
        })
      }.bind(this),
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.log('complete')
      }
    })
  },
  

  // 回到页面顶部
  backtopf() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000,
    })
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
    this.servicesjpg(this.data.tabNow);
  },

  /**
   * 页面滚动
  */
  onPageScroll(v){
    TOP_DISTANCE < v.scrollTop && !this.data.scrollhidden?this.setData({
      scrollhidden: true
    }) : (TOP_DISTANCE > v.scrollTop && this.data.scrollhidden?this.setData({
        scrollhidden: false
    }):'');
    wx.createSelectorQuery().select('#tabClass').boundingClientRect((rect)=>{
      rect.top < 0 && this.data.tabbarfixed != 'tabbarfixed' ? this.setData({ tabbarfixed: 'tabbarfixed' }) : (rect.top > 0 && this.data.tabbarfixed == 'tabbarfixed' ? this.setData({ tabbarfixed: 'tabbarfixedhide' }):'')
    }).exec();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:"邹德敏",
      path:"/pages/home/home",
      imageUrl:""
    }
  }
})