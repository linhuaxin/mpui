import dateUtils from '../../utils/dateUtils'

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
    dateValue: {
      type: String
    },
    valueType: {
      type: String,
      value: 'normal' // normal or timestamp
    },
    mode: {
      type: String,
      value: 'date'
    },
    fields: {
      type: String,
      value: 'day'
    },
    readonly: {
      type: Boolean,
      value: false
    }
  },
  ready() {
    let { value, valueType, fields } = this.data
    let dateValue = value

    console.log('传入的日期', value)

    if (valueType === 'timestamp') {
      if (typeof value === 'string') {
        value = parseInt(value)
      }
      let date = new Date(value)

      switch (fields) {
        case 'day':
          dateValue = dateUtils.format(date, 'yyyy-MM-dd')
          break
        case 'month':
          dateValue = dateUtils.format(date, 'yyyy-MM')
          break
        case 'year':
          dateValue = dateUtils.format(date, 'yyyy')
          break
      }
    }

    console.log('处理后的日期', dateValue)

    this.setData({
      dateValue
    })
  },
  methods: {
    change(e) {
      let dateValue = e.detail.value
      this.setData({
        dateValue
      })

      let { valueType } = this.data
      let value = dateValue
      if (valueType === 'timestamp') {
        value = dateUtils.dateStrToDate(dateValue).getTime()
      }
      let params = {
        keyPath: this.data.keyPath,
        value
      }
      this.triggerEvent('change', params)
    }
  }
})