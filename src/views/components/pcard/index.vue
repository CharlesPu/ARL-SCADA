<template>
  <a-card :bordered="false">
    <template #title>
      <div class="title-container">
        <a-button
          type="link"
          @click="handleBack"
          class="back-btn"
        >
          <a-icon type="arrow-left" />
        </a-button>
        <span>返回</span>
        <div class="action-buttons">
          <a-button
            type="primary"
            class="edit-btn"
            @click="handleEdit"
          >
            <a-icon type="edit" /> 编辑
          </a-button>
          <a-button
            type="danger"
            class="delete-btn"
            @click="handleDelete"
          >
            <a-icon type="delete" /> 删除
          </a-button>
        </div>
      </div>
    </template>
  </a-card>
</template>

<script>
export default {
  name: 'PCard',
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
.title-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

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

.action-buttons {
  display: flex;
  gap: 12px;
  margin-left: auto;

  .ant-btn {
    height: 32px;
    padding: 0 15px;

    .anticon {
      font-size: 14px;
      margin-right: 6px;
    }
  }
}
</style>
