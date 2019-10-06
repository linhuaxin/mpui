import dateUtils from '../../utils/dateUtils'

let now = new Date()
let defaultMinBeginDate = new Date(now.getFullYear() - 1,
  now.getMonth(), now.getDate()) // 默认去年今天
let defaultBeginDate = new Date(now.getFullYear(),
  now.getMonth() - 1, now.getDate()) // 默认上个月今天

Component({
  properties: {
    beginDate: {
      type: String,
      value: dateUtils.formatSimpleDate(defaultBeginDate)
    },
    endDate: {
      type: String,
      value: dateUtils.formatSimpleDate(now)
    },
    minBeginDate: {
      type: String,
      value: dateUtils.formatSimpleDate(defaultMinBeginDate)
    },
    maxEndDate: {
      type: String,
      value: dateUtils.formatSimpleDate(now) // 今天
    },
    readonly: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    beginDateChange(e) {
      this.setData({
        beginDate: e.detail.value
      })
      this.triggerEvent('dateChange')
    },
    endDateChange(e) {
      this.setData({
        endDate: e.detail.value
      })
      this.triggerEvent('dateChange')
    },
    getBeginDateTimestamp() {
      return dateUtils.dateStrToDate(this.data.beginDate).getTime() + ''
    },
    getEndDateTimestamp() {
      return dateUtils.dateStrToDate(this.data.endDate).getTime() + ''
    },
    /**
     * 返回平台日期范围格式
     */
    getDateRangeTimestamp() {
      let dateRange = {
        start: this.getBeginDateTimestamp(),
        end: this.getEndDateTimestamp()
      }
      return JSON.stringify(dateRange)
    }
  }
})