// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from '../../service/detail.js';
import { setWatcher } from '../../service/watch.js';
import { jpg } from '../../service/config.js';

const app = getApp()
const TOP_DISTANCE = '580';

Page({
  data: {
    iid: '', // 1m7c6iu
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {},
    styles: {
      height: '390rpx',
      autoplay: true,
      interval: 3000,
      circular: true,
      displayMultipleItems: 2,
      indicatorDots: true,
      indicatorColor: 'rgba(0,0,0,.3)',
      indicatorActiveColor: "#ff5777"
    },
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] }
    },
    promise: new Promise(() => { }),
    tabNow: 'pop',
    scrollhidden: false,
  },
  onLoad: function (options) {
    setWatcher(this);
    // 1.获取传入的iid
    this.setData({
      iid: options.iid
    })

    // 2.请求商品详情数据
    this._getDetailData()

    // 3.请求推荐的数据
    this._getRecommends()
    // this.servicesjpg(this.data.tabNow);
  },
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      let data = res.result;
      data = {
        itemInfo: {
          title:'高腰性感超短裙女款公主裙比身夏2019新款半身小短裙 红色 单裙不含模特上衣 均码 130斤内适穿',
          desc:'高腰性感超短裙女款公主裙比身夏2019新款半身小短裙 红色 单裙不含模特上衣 均码 130斤内适穿',
          price:'￥780 ~ ￥999',
          oldPrice:'￥1299',
          discountDesc:'活动来袭',
          lowNowPrice:'780',
          topImages: [{ image: '/assets/good/1.jpg' }, { image: '/assets/good/2.jpg' }, { image: '/assets/good/6.jpg' }]
        },
        columns:['销量10888','收藏868人','默认快递'],
        shopInfo: {
          shopLogo:'/assets/good/10.jpg',
          name:'新款半身小短裙',
          cFans:'潮范儿',
          cSells:'5992',
          score: [{ name: '描述相符', score: '4.66', isBetter: false }, { name: '价格合理', score: '5', isBetter: true }, { name: '质量满意', score: '4.65', isBetter: false }],
          cGoods:'682',
          services: [{ icon: '/assets/images/detail/selection.png', name: '延误必陪' }, { icon: '/assets/images/detail/selection.png', name: '72小时发货' }, { icon:'/assets/images/detail/selection.png',name:'退货补运费'}]
        },
        detailInfo:{desc:'高腰性感超短裙女款公主裙比身夏2019新款半身小短裙 红色 单裙不含模特上衣 均码 130斤内适穿',
          detailImage: [{ key: '穿着效果', list: ['/assets/good/1.jpg',
            '/assets/good/2.jpg','/assets/good/6.jpg',
          ]}]},
        itemParams: {
          info: {
            images: ['/assets/good/6.jpg'], set: [{key:'厚薄', value:'一般'},
              { key: '厂名', value:'长春风采贸易有限公司'},
              { key: '颜色', value:'新春艳丽红'},
              { key: '厂址', value:'长春-榆树'},
              { key: '材质', value:'其他'},
              { key: '领型', value:'其他领型'},
              { key: '风格', value: '简约' },
              { key: '款式', value:'常规款(60~62)'}]},
          rule:{tables:[[['尺码','S','M','L'],
            ['胸围','100','104','108'],
            ['腰围','64','68','72'],
            ['肩宽','39','40','41'],
            ['衣长','60','61','62'],
            ['尺码', 'M', 'L', 'XL'],
            ['季节', '春季', '夏季', '秋季'],
          ]]}
        },
        rate: {
          cRate:1,
          list: [{
            user: { uname: '邹德敏', avatar: '/assets/good/10.jpg' }, content: '帮同学买的，她穿着很丑，我很满意。', created: '2020-1-20 12:06:28', style: '尺码->L', images: ['/assets/good/1.jpg',
              '/assets/good/2.jpg', '/assets/good/6.jpg',
            ]}]
        }
      }
      // console.log(data)

      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages;

      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })
  },

  _getRecommends() {
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
            getRecommends().then(res => {
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
  watch: {
    goods: function (newVal, oldVal) {
      this.data.promise.then((req) => {
        console.log(req)
        this.setData({
          recommends: req[this.data.tabNow].list
        })
        console.log(this.data.recommends)
      })
    }
  },
  onPageScroll(v) {
    TOP_DISTANCE < v.scrollTop && !this.data.scrollhidden ? this.setData({
      scrollhidden: true
    }) : (TOP_DISTANCE > v.scrollTop && this.data.scrollhidden ? this.setData({
      scrollhidden: false
    }) : '');
  },
  // 回到页面顶部
  backtopf() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.servicesjpg(this.data.tabNow);
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid % 10;
    // obj.imageURL = this.data.topImages[0].image;
    obj.imageURL = '/assets/good/' + (obj.iid+1) + '.jpg';
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})