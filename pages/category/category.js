import request from '../../lib/request';
import serviceData from '../../data/config';
import gets from "../../util/gets"

Page({
  data: {
    categories: []
  },
  navigateToCategoryProduct(event) {
    var categoryId = event.currentTarget.dataset.cateId;
    wx.navigateTo({
      url: '../category-product/category-product?id=' + categoryId,
    })
  },
  async onLoad() {
   const result = await gets();
   this.setData({ categories: result.indexData.cateData});

  }
});
