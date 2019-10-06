Component({
  properties: {
    placeholder: {
      type: String,
      value: ''
    },
    keyPath: {
      type: String
    },
    value: {
      type: String
    },
    showSearch: {
      type: Boolean,
      value: false
    },
    showScan: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    input(e) {
      let value = e.detail.value
      let params = {
        keyPath: this.data.keyPath,
        value
      }
      this.triggerEvent('input', params)
    },
    blur() {
      this.triggerEvent('blur')
    },
    search() {
      this.triggerEvent('search')
    },
    scan() {
      let that = this
      let keyPath = this.data.keyPath
      wx.scanCode({
        success(res) {
          if (res.errMsg === 'scanCode:ok') {
            let value = res.result
            let params = {
              keyPath,
              value
            }
            that.setData({
              value
            })
            that.triggerEvent('scan', params)
          }
        },
        fail() {
          wx.showToast({
            title: '扫码失败',
            icon: "none"
          })
        }
      })
    }
  }
})