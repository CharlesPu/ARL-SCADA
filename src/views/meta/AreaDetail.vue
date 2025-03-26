<template>
  <page-header-wrapper>
    <div class="content-container">
      <a-card
        title="区域详情"
        :bordered="false"
      >
        <h3>当前区域ID：{{ areaId }}</h3>
        <!-- 详情内容待补充 -->
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  data () {
    return {
      areaId: null
    }
  },
  created () {
    this.areaId = this.$route.params.id
    console.log('接收到的区域ID:', this.areaId)
  }
}
</script>

<style scoped>
.content-container {
  padding: 24px;
  background: #fff;
  min-height: 400px;
}
</style>
