export default (Url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
   
    wx.request({
      url: 'http://localhost:3333' + Url,
      data,
      method,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}