Component({
  properties: {
    checkable: {
      type: Boolean,
      value: false
    },
    columns: {
      type: Array,
      value: []
    },
    list: {
      type: Array,
      value: []
    },
    isAllChecked: {
      type: Boolean,
      value: false
    },
    readonly: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    /**
     * 获取所有行数据
     */
    getAllRows() {
      return this.data.list
    },
    /**
     * 获取被勾选的行数据
     */
    getCheckedRows() {
      return this.data.list.filter(row => {
        return row.isChecked
      })
    },
    /**
     * 获取没有被勾选的行数据
     */
    getUncheckedRows() {
      return this.data.list.filter(row => {
        return !row.isChecked
      })
    },
    /**
     * 事件 -> 数字框值变化
     */
    numberChange(e) {
      let value = e.detail.value
      let list = this.data.list
      let { index, name } = e.target.dataset

      list[index][name] = value
      this.setData({ list })
      this.triggerEvent('dataChange')
    },
    /**
     * 事件 -> 行勾选
     */
    checkChange(e) {
      let index = e.target.dataset.index
      let list = this.data.list
      let row = list[index]

      row.isChecked = !row.isChecked
      let isAllChecked = list.every(row => {
        return row.isChecked
      })

      this.setData({ isAllChecked, list })
      this.triggerEvent('checkChange')
    },
    /**
     * 事件 -> 全选
     */
    allCheckChange(e) {
      let isAllChecked = !this.data.isAllChecked
      let list = this.data.list

      list.forEach(row => {
        row.isChecked = isAllChecked
      })

      this.setData({ isAllChecked, list })
      this.triggerEvent('checkChange')
    }
  }
})