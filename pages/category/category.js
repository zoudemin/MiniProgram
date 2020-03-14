// pages/category/category.js
import services from '../../service/category.js';
import {jpg} from '../../service/config.js';

Page({
  data: {
    categories: [],
    categoryData: {
    },
    currentIndex: 0
  },
  onLoad: function (options) {
    this._getData()
  },
  _getData() {
    // 1.请求分类数据
    this._getCategory()
  },
  _getCategory() {
    services.getCategory().then(res => {
      // 1.获取categories
      // let categories = res.data.category.list;
      let categories = [
        { title: '正在流行', maitKey: '正在流行', miniWallkey: '正在流行' },
        { title: '上衣', maitKey: '上衣', miniWallkey: '上衣' },
        { title: '裤子', maitKey: '裤子', miniWallkey: '裤子' },
        { title: '裙子', maitKey: '裙子', miniWallkey: '裙子' },
        { title: '内衣', maitKey: '内衣', miniWallkey: '内衣' },
        { title: '女鞋', maitKey: '女鞋', miniWallkey: '女鞋' },
        { title: '男友', maitKey: '男友', miniWallkey: '男友' },
        { title: '包包', maitKey: '包包', miniWallkey: '包包' },
        { title: '运动', maitKey: '运动', miniWallkey: '运动' },
        { title: '配饰', maitKey: '配饰', miniWallkey: '配饰' },
        { title: '美容', maitKey: '美容', miniWallkey: '美容' },
      ];

      // 2.初始化每个类别的子数据
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
          // categoryDetail: {
          //   'pop': [],
          //   'new': [],
          //   'sell': []
          // }
        }
      }

      // 3.修改data中的数据
      this.setData({
        categories,
        categoryData: categoryData
      })

      // 4.请求第一个类别的数据
      this._getSubcategory(0)

      // 5.请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的maitkey
    const maitkey = this.data.categories[currentIndex].maitKey;

    // 2.请求的数据
    services.getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      // tempCategoryData[currentIndex].subcategories = res.data.list;
      tempCategoryData[currentIndex].subcategories = [];
      for(let i=0;i<10;i++){
        tempCategoryData[currentIndex].subcategories.push(...jpg(currentIndex+i,'pop'));
      }
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的miniWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    // 2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    services.getCategoryDetail(miniWallKey, type).then(res => {
      // 1.获取categoryData
      const categoryData = this.data.categoryData;

      // 2.修改数据
      // categoryData[index].categoryDetail = res;
      categoryData[index].categoryDetail = [];
      for (let i = 0; i < 10; i++) {
        categoryData[index].categoryDetail.push(...jpg(index+i, 'pop'));
      }

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }
})