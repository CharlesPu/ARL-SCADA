<template>
  <div>
    <a-card :bordered="false">
      <a-result
        :status="initData.status"
        :title="title"
        :sub-title="description"
      >
        <template #extra>
          <a-button
            type="primary"
            @click="finish"
          >确定</a-button>
        </template>
      </a-result>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Step3',
  props: {
    // 接收上一步数据
    initData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      title: '新建成功',
      description: '新建植株xx条'
    }
  },
  methods: {
    finish () {
      this.$emit('finish')
    }
  }
}
</script>
<style
  lang="less"
  scoped
>
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}

.money {
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
</style>
