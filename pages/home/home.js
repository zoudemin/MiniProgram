import services from '../../service/home.js';

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
      'new': { page: 0, list: [] },
      'pop': { page: 0, list: [] },
      'sell': { page: 0, list: [] }
    },
    names: ['高腰性感超短裙女款公主裙比身夏2019新款半身小短裙 红色 单裙不含模特上衣 均码 130斤内适穿',
      '朗悦女装 短裙女2020年夏季百褶裙短裙韩版学院风格子网球裙半身裙女 LWQZ192172',
      '幂缇莎背带裙连衣裙夏2019新款夏季女春秋学生韩版套装仙女超仙森系裙子',
      '丹慕妮尔裙子早春装2020年新款洋气减龄名媛气质显瘦小香风连衣裙 粉色 175/96A/XXL',
'纽曼之城背带裙女装2020韩版夏季修身V领弹力中长款开叉高腰连衣裙两件套办公室工作服 9901-背带裙 L 建议100-115斤',
'YAYA鸭鸭服饰针织连衣裙女2020年春装新款女装两件显瘦流行毛衣裙子半高领气质针织裙新款 图片色 L 【建议105-115斤】',
'YAYA鸭鸭服饰针织连衣裙女2020春季新款假两件显瘦流行打底毛衣女裙子气质针织连衣裙新款加绒',
'南极人 连衣裙2020春款女装新款民族风长袖连衣裙 中长款女士网红打底A字裙子 N5-GTAF02-021',
'目迹春季连衣裙2020年新款两件套春装新款女时尚小香风气质显瘦套装裙子潮 L 建议105~115斤',
'三彩2019冬季新款花边立领喇叭袖蕾丝裙网纱大摆仙女中长连衣裙女'
    ]
  },
  bindload() {
    console.log('bindload')
  },
  itemclick(v) {
    console.log('~~~~~~~~~~~~',v)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.servicesjpg('pop');
  },
  servicesjpg(type) {
    const page = this.data.goods[type].page+1;
    // 请求详情
    services.getGoodsData({ type: type, page: page }).then(res => {
      if (res.statusCode == 200) {
        const obj = this.data.goods;
        obj[type].page = page;
        obj[type].list = [...this.data.goods[type].list, ...this.jpg(page)];
        this.setData({
          goods: obj
        });
        console.log(this.data.goods)
      }
    }).catch(req => {
      console.log(req)
    });
  },
  jpg: function (page) {
    return [{ url: '/assets/good/' + (page % 5 != 0 ? page % 5 * 2 - 1 : 9) + '.jpg', name: this.data.names[page % 5 != 0 ? page % 5 * 2 - 2 : 8] }, { url: '/assets/good/' + (page % 5 != 0 ? page % 5 * 2 : 10) + '.jpg', name: this.data.names[page % 5 != 0 ? page % 5 * 2 - 1 : 9]}];
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
    return {
      title:"邹德敏",
      path:"/pages/home/home",
      imageUrl:""
    }
  }
})