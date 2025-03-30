<template>
  <!-- <page-header-wrapper
    @back="handleBack"
    :backIcon="true"
  > -->
  <page-header-wrapper>
    <a-card :bordered="false">
      <template #title>
        <div class="title-container">
          <p-back-btn :txt="areaId"></p-back-btn>
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
      <a-descriptions :column="3">
        <a-descriptions-item label="创建人">{{ creator }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ createTime }}</a-descriptions-item>
        <a-descriptions-item label="位置">{{ position }}</a-descriptions-item>
        <a-descriptions-item label="备注">{{ description }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-descriptions title="植株">
        <a-descriptions-item label="植株数量">
          {{ plantTotal }}
          <a-button
            type="primary"
            class="edit-btn"
            @click="handlePlants"
            style="margin-left: 30px;"
          >
            <a-icon type="search" />查看植株
          </a-button>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import PBackBtn from '../components/pbackbtn/index.vue'

export default {
  components: {
    PBackBtn
  },
  data () {
    return {
      creator: 'John Doe',
      createTime: '2023-12-12 10:00:00',
      position: 'North',
      description: 'This is a detailed description of the area.',
      plantTotal: 10,
      areaId: null
    }
  },
  created () {
    this.areaId = this.$route.params.id
    console.log('接收到的区域ID:', this.areaId)
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      // this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
      //   console.log('get list res', res)
      //   this.data = res.result
      //   this.loading = false
      // })
    },
    handleBack () {
      this.$router.go(-1)
    },
    handleEdit () {
      console.log('编辑操作', this.areaId)
      // this.$router.push({ name: 'AreaMetaEdit', params: { id: this.areaId } })
    },
    handleDelete () {
      console.log('删除操作', this.areaId)
    },
    handlePlants () {
      console.log('查看植株操作', this.areaId)
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

.content-container {
  padding: 24px;
  background: #fff;
  min-height: 400px;
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
