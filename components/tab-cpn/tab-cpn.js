// components/tab-cpn/tab-cpn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:['无数据'],
      observer:function(n, o) {
        console.log(n, o)
      }
    },
    viewbody: {
      type:Array,
      value:[],
      observer:function(n, o) {
        console.log(n, o)
      }
    },
  },
  externalClasses: ['itemstyle', 'tabbarfixed'],

  onPageScroll: function (e) {
    console.log(e);//{scrollTop:99}
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeItem:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickItem(val){
      this.setData({
        activeItem: val.currentTarget.dataset.index
      })
      this.triggerEvent('itemclick', { index: val.currentTarget.dataset.index, title: this.properties.list[val.currentTarget.dataset.index]})
      
      // wx.showModal({
      //   title: 'this.properties.list[val.currentTarget.dataset.index]',
      //   content: this.properties.list[val.currentTarget.dataset.index],
      // })
    }
  }
})
