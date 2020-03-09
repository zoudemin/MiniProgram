// components/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners: {
      type: Array,
      value: [],
      observer: function(v) {
        console.log(v)
      }
    },
    styles: {
      type: Object,
      value: {
        height:'390rpx',
        autoplay:true,
        interval:3000,
        circular:true,
        displayMultipleItems:1,
        indicatorDots:true,
        indicatorColor:'rgba(0,0,0,.3)',
        indicatorActiveColor:"#000"
      },
      observer: function() {

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
