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
    mode: {
      type: String,
      value: 'selector'
    },
    key: {
      type: String,
      value: 'key'
    },
    rangeKey: {
      type: String,
      value: 'text'
    },
    options: {
      type: Array,
      value: []
    }
  },
  data: {
    index: 0
  },
  ready() {
    let { placeholder, key, rangeKey, value, options } = this.data
    // 处理 placeholder
    if (placeholder) {
      options.unshift({
        [key]: '',
        [rangeKey]: placeholder
      })
      this.setData({ options })
    }

    // 根据 value 设置 index
    for (let i = 0; i < options.length; i++) {
      let option = options[i]
      if (option[key] === value) {
        this.setData({
          index: i
        })
        break
      }
    }
  },
  methods: {
    change(e) {
      let index = parseInt(e.detail.value)
      let { key, keyPath, placeholder, options } = this.data
      this.setData({ index })

      let value = ''
      if (index !== 0 || !placeholder) {
        value = options[index][key]
      }
      let params = {
        keyPath,
        value
      }
      this.triggerEvent('change', params)
    }
  }
})