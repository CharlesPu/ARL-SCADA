<template>
  <page-header-wrapper>
    <a-card
      title="员工档案"
      :bordered="false"
    >
      <editable-detail :fields="[
        {
          key: 'name',
          label: '姓名',
          type: 'input',
          value: '李四',
          editable: true,
          placeholder: '请输入姓名'
        },
        {
          key: 'gender',
          label: '性别',
          type: 'select',
          value: 'female',
          editable: true,
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ]
        },
        {
          key: 'birth_date',
          label: '出生日期',
          type: 'date',
          value: '1995-03-15',
          editable: true,
          format: 'YYYY年MM月DD日'
        },
        {
          key: 'employee_id',
          label: '员工编号',
          value: 'ID-2024-0357',
          editable: false
        }
      ]" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import EditableDetail from './components/EditableDetail.vue'
import moment from 'moment'

export default {
  components: { EditableDetail },
  // 在vue-antd-pro中通常会在main.js全局引入moment
  created () {
    this.$moment = moment
  }
}
</script>
