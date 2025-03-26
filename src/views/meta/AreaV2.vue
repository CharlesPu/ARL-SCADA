<template>
  <page-header-wrapper>
    <a-card hoverable>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col
              :md="8"
              :sm="24"
            >
              <a-form-item label="规则编号">
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
              <a-form-item label="使用状态">
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
            <template v-if="advanced">
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="调用次数">
                  <a-input-number
                    v-model="queryParam.callNo"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="更新日期">
                  <a-date-picker
                    v-model="queryParam.date"
                    style="width: 100%"
                    placeholder="请输入更新日期"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="使用状态">
                  <a-select
                    v-model="queryParam.useStatus"
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
                :md="8"
                :sm="24"
              >
                <a-form-item label="使用状态">
                  <a-select
                    placeholder="请选择"
                    default-value="0"
                  >
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col
              :md="!advanced && 8 || 24"
              :sm="24"
            >
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {}"
              >
                <a-button
                  type="primary"
                  @click="$refs.table.refresh(true)"
                >查询</a-button>
                <a-button
                  style="margin-left: 8px"
                  @click="() => this.queryParam = {}"
                >重置</a-button>
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
    </a-card>
    <a-card
      :bordered="false"
      style="margin-top: 24px"
    >
      <div class="table-operator">
        <a-button
          type="primary"
          icon="plus"
          @click="handleAdd"
        >新建</a-button>
        <a-button
          type="plus"
          icon="export"
          @click="handleExport"
        >导出</a-button>
      </div>
      <div class="ant-pro-pages-list-applications-filterCardList">
        <a-list
          :loading="loading"
          :data-source="data"
          :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
          style="margin-top: 24px;"
        >
          <a-list-item
            slot="renderItem"
            slot-scope="item"
          >
            <a-card
              :body-style="{ paddingBottom: 20 }"
              hoverable
              @click="handleCardClick(item)"
            >
              <a-card-meta :title="item.title">
                <template slot="avatar">
                  <a-avatar
                    size="small"
                    :src="item.avatar"
                  />
                </template>
              </a-card-meta>
              <template slot="actions">
                <!-- <a-tooltip title="下载" >
                  <a-icon type="download" />
                </a-tooltip> -->
                <a-tooltip
                  title="编辑"
                  @click.stop="handleCardEdit(item)"
                >
                  <a-icon type="edit" />
                </a-tooltip>
                <a-tooltip
                  title="删除"
                  @click.stop="handleCardDelete(item)"
                >
                  <a-icon type="delete" />
                </a-tooltip>
                <a-dropdown>
                  <a class="ant-dropdown-link">
                    <a-icon type="ellipsis" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;">1st menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">2nd menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">3rd menu item</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
              <div class="">
                <card-info
                  :active-user="item.activeUser"
                  :new-user="item.newUser"
                ></card-info>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CardInfo from './components/CardInfo'

export default {
  components: {
    STable,
    Ellipsis,
    CardInfo
  },
  data () {
    return {
      data: [],
      queryParam: {
        id: '',
        status: '0',
        callNo: undefined,
        date: undefined,
        useStatus: '0'
      },
      advanced: false,
      loading: true
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleAdd () {
    },
    handleExport () {
    },
    getList () {
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        console.log('get list res', res)
        this.data = res.result
        this.loading = false
      })
    },
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
    handleCardEdit (item) {
      // 编辑操作逻辑
      console.log('编辑:', item)
    },
    handleCardDelete (item) {
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
.table-page-search-wrapper {
  .ant-form-item {
    margin-bottom: 12px;
  }
}

.table-page-search-submitButtons {
  margin-bottom: 12px;
}
</style>
