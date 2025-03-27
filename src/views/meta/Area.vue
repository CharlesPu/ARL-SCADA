<template>
  <page-header-wrapper>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item label="区域编号">
              <a-input
                v-model="queryParam.id"
                placeholder=""
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item label="状态">
              <a-select
                v-model="queryParam.status"
                placeholder="请选择"
                default-value="0"
              >
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="!advanced && 8 || 24"
            :sm="24"
          >
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
              <a
                @click="toggleAdvanced"
                style="margin-left: 8px"
              >
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="content-container">
      <div class="table-operator">
        <a-row :gutter="16">
          <a-col
            :span="24"
            style="text-align: left"
          >
            <a-button
              type="primary"
              icon="plus"
              style="margin-right: 8px; width: 100px"
              @click="handleAdd()"
            >新建区域</a-button>
            <a-button
              icon="export"
              style="margin-right: 8px; width: 100px"
            >导出</a-button>
          </a-col>
        </a-row>
      </div>
      <div class="ant-pro-pages-list-applications-filterCardList">
        <a-list
          :grid="{ gutter: 32, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
          style="margin-top: 8px;"
        >
          <a-list-item
            v-for="item in 8"
            :key="item"
          >
            <a-card
              :body-style="{ paddingBottom: 20 }"
              hoverable
              @click="handleCardClick(item)"
            >
              <a-card-meta title="区域名称">
                <template slot="avatar">
                  <a-avatar
                    size="small"
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
                  />
                </template>
              </a-card-meta>
              <template slot="actions">
                <a-tooltip title="编辑">
                  <a-icon
                    type="edit"
                    @click.stop="handleEdit(item)"
                  />
                </a-tooltip>
                <a-tooltip title="删除">
                  <a-icon
                    type="delete"
                    @click.stop="handleDelete(item)"
                  />
                </a-tooltip>
              </template>
              <div class="">
                <div style="margin-bottom: 3px; color: rgba(0, 0, 0, 0.85)">区域编号：R{{ item }}</div>
                <div style="color: rgba(0, 0, 0, 0.45)">最后更新时间：2023-12-12</div>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  data () {
    return {
      queryParam: {
        id: '',
        status: '0',
        callNo: undefined,
        date: undefined,
        useStatus: '0'
      },
      advanced: false
    }
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        id: '',
        status: '0',
        callNo: undefined,
        date: undefined,
        useStatus: '0'
      }
    },
    handleCardClick (item) {
      this.$router.push({ name: 'AreaMetaDetail', params: { id: item.id } })
    },
    handleAdd () {
      this.$router.push({ name: 'AreaMetaAdd' })
    },
    handleEdit (item) {
      // 编辑操作逻辑
      console.log('编辑:', item)
      this.$router.push({ name: 'AreaMetaEdit', params: { id: item.id } })
    },
    handleDelete (item) {
      // 删除操作逻辑
      console.log('删除:', item)
    }
  }
}
</script>

<style
  lang="less"
  scoped
>
.content-container {
  background: #f0f2f5;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .ant-pro-pages-list-applications-filterCardList {
    flex: 1;
    padding: 24px;
    background: #fff;
    /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09); */
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: center;

    ::v-deep .ant-list-item {
      padding: 0 16px;
      margin-bottom: 32px;
    }
  }
}

.table-page-search-wrapper {
  background: #fff;
  padding: 24px;
  padding-bottom: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
}

.table-operator {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  padding: 24px;
  padding-bottom: 0;
  margin-bottom: 0px;
  width: 100%;
}
</style>
