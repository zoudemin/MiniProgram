// components/back-top/back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollhidden: {
      type: Boolean,
      value: false,
      observe: function() {
        
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
    backtop() {
      this.triggerEvent('backtopf');
    }
  }
})
