<template>
  <div>
    <a-button
      type="link"
      @click="handleBack"
      class="back-btn"
    >
      <a-icon type="arrow-left" />
    </a-button>
    <span style="margin-left: 4px;">{{ txt }}</span>
  </div>
</template>

<script>
export default {
  name: 'PBackBtn',
  props: {
    txt: {
      type: String,
      default: '返回'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.back-btn {
  padding: 0;
  height: 24px;
  margin-right: 8px;
  /* 调整间距方向 */
}

.back-btn .anticon {
  font-size: 16px;
  /* 直接控制图标大小 */
}
</style>
