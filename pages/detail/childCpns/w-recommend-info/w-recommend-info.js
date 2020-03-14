// pages/detail/childCpns/w-recommend-info/w-recommend-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array
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
    propdetail(val) {
      // 1.获取iid
      // const iid = this.data.goodsitem.iid;
      // 2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + val,
      })
    },
  }
})
