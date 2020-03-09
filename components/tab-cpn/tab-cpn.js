// components/tab-cpn/tab-cpn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:['手套'],
      observer:function(n, o) {
        console.log(n, o)
      }
    }
  },
  externalClasses: ['itemstyle'],

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
      wx.showToast({
        title: this.properties.list[val.currentTarget.dataset.index],
        duration: 500,
        icon:'loading',
        mask:true,
        success:function(){
          console.log('success')
        },
        fail:function(){
          console.log('fail')
        },
        complete:function(){
          console.log('complete')
        }
      })
      // wx.showModal({
      //   title: 'this.properties.list[val.currentTarget.dataset.index]',
      //   content: this.properties.list[val.currentTarget.dataset.index],
      // })
    }
  }
})
