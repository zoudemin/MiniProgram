// pages/home/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends:{
      type: Array,
      value: [],
      observer: function(v) {
        console.log(v)
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
