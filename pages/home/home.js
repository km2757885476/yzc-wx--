import Promise from '../../lib/promiseEs6Fix';
import request from '../../lib/request';
import resource from '../../lib/resource';
// import serviceData from '../../data/config';
import rq from "../../util/request"

// banners

function homeSay(name) {
  console.log(`Hello ${name} !`);
}
module.exports.hSay = homeSay;
var app = getApp();

var serviceData = {};
Page({
  data: {
    shop_id: app.globalData.shop_id,
    shop_info: [],
    banners: [],
    activities: [],
    features: [],
    currentPage: 1

  },
  navigateToProduct(event) {
    var productId = event.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: '../products/products?id=' + productId
    });
  },
  navigateToActivity(event) {
    var activityType = event.currentTarget.dataset.activityType;
    var activityId = event.currentTarget.dataset.activityId;
    var activityTitle = event.currentTarget.dataset.activityTitle;
    var activityUrl;
    switch (activityType) {
      case 1:
        activityUrl = "../category-product/category-product?id=" + activityId + '&title=' + activityTitle;
        break;
      case 2:
        activityUrl = "../products/products?id=" + activityId;
        break;
      case 3:
        activityUrl = event.currentTarget.dataset.activityUrl;
        break;
      default:
        break;
    }
    console.log(activityUrl);
    wx.navigateTo({
      url: activityUrl
    });
  },
  async getInexdData() {
    const result = await rq('/getIndexData');
    serviceData = result
    console.log(serviceData)
    this.setData({
      banners: serviceData.indexData.bannerData,
      activities: serviceData.indexData.activityData,
      features: serviceData.indexData.featureData
    });
  },
  // 应用（全局）周期
  // onLaunch: 初始化小程序时触发，全局只触发一次
  // onShow: 小程序初始化完成或用户从后台切换到前台显示时触发
  // onHide: 用户从前台切换到后台隐藏时触发
  // onError: 小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  // 页面组件周期
  // onLoad：首次进入页面加载时触发，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
  // onShow：加载完成后、后台切到前台或重新进入页面时触发
  // onReady：页面首次渲染完成时触发
  // onHide：从前台切到后台或进入其他页面触发
  // onUnload： 页面卸载时触发
  onReady() {
    
  },
  onLoad() {
    this.getInexdData();
    this.setData({
      shop_info: app.globalData.shopInfo
    });
    // this.setData({
    //   banners: serviceData.bannerData,
    //   activities: serviceData.activityData,
    //   features: serviceData.featureData
    // });
    //发起多个请求
    // const requests = ['/banners?shop_id=2' + this.data.shop_id,
    //     '/activities',
    //     '/features?shop_id=' + this.data.shop_id + '&per_page=5'
    //   ]
    //   .map(path => (
    //     request({ path })
    //     .then(response => response.data)
    //     .catch(() => [])
    //   ));
    // Promise.all(requests).then(([banners, activities, features]) => {
    //   features.forEach(item => {
    //     item.goods_price = item.goods_price.toFixed(2);
    //   })
    //   this.setData({ banners, activities, features });
    //   console.log(23);
    // },([banners, activities, features]) => {
    //   console.log([banners, activities, features]);
    // },([banners, activities, features]) => {
    //   console.log([banners, activities, features]);
    // });
  },
  lower: function () {
    console.log('lower more features data');
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      var nextPageData = new Object();
      nextPageData.per_page = 5;
      nextPageData.page = this.data.currentPage + 1;
      nextPageData.shop_id = this.data.shop_id;
      var features = serviceData.featureData;
      if (features.length != 0) {
        this.setData({
          currentPage: ++this.data.currentPage
        });
        this.setData({
          features: this.data.features.concat(features)
        }); //concat 拼接在一起
      }
      // request({ path: '/features', data: nextPageData }).then(({ data: features }) => {
      //   if (features.length != 0) {
      //     this.setData({ currentPage: ++this.data.currentPage });
      //     this.setData({ features: this.data.features.concat(features) }); //concat 拼接在一起
      //   }
      // });
    }, 1000);
  }
});