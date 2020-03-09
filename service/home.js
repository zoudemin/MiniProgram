import request from './network.js';

export default {
  getMultiData(obj) {
    return request({url: '/home/multidata'})
  },
  getGoodsData(obj) {
    return request({ url: '/home/data', data:obj })
  }
}