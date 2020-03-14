import request from './network.js';

export default {
  getCategory() {
    return request({
      url: '/category'
    })
  },
  getSubcategory(maitKey) {
    return request({
      url: '/subcategory',
      data: {
        maitKey
      }
    })
  },
  getCategoryDetail(miniWallkey, type) {
    return request({
      url: '/subcategory/detail',
      data: {
        miniWallkey,
        type
      }
    })
  }
}