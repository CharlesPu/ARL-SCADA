<template>
  <page-header-wrapper>
    <a-card :bordered="false">
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
                    v-model="queryParam.metricsCount"
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

      <div class="table-operator">
        <a-button
          type="primary"
          icon="plus"
          @click="handleAdd"
        >新建</a-button>
        <a-button
          type="primary"
          icon="plus"
          @click="handleAddBatch"
        >批量新建</a-button>
        <a-button
          type="plus"
          icon="export"
          @click="handleExport"
        >全部导出</a-button>
        <a-button
          type="plus"
          icon="qrcode"
          @click="handleExportQRCode"
        >全部导出二维码</a-button>
        <a-dropdown
          v-action:edit
          v-if="selectedRowKeys.length > 0"
        >
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
            <a-menu-item key="3"><a-icon type="export" />导出</a-menu-item>
            <a-menu-item key="4"><a-icon type="qrcode" />导出二维码</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span
          slot="serial"
          slot-scope="text, record, index"
        >
          {{ index + 1 }}
        </span>
        <!-- <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span> -->
        <span
          slot="remarks"
          slot-scope="text"
        >
          <ellipsis
            :length="8"
            tooltip
          >{{ text }}</ellipsis>
        </span>

        <span
          slot="action"
          slot-scope="text, record"
        >
          <template>
            <a-tooltip title="查看"><a-icon
                type="search"
                @click="handleDetail(record)"
              /></a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip title="编辑"><a-icon
                type="edit"
                @click="handleEdit(record)"
              /></a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip title="查看采集数据"><a-icon
                type="bar-chart"
                @click="handleMetrics(record)"
              /></a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip title="删除"><a-icon
                type="delete"
                @click="handleDelete(record)"
              /></a-tooltip>
          </template>
        </span>
      </s-table>

      <plant-form
        ref="createModal"
        :visible="visible"
        :title="formTitle"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <plant-step-form
        ref="createStepModal"
        :visible="stepVisible"
        :title="stepFormTitle"
        :loading="stepConfirmLoading"
        @cancel="handleStepCancel"
        @ok="handleStepOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'

import PlantForm from './modules/Form'
import PlantStepForm from './modules/StepForm'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '植株编号',
    dataIndex: 'uuid'
  },
  {
    title: '所在区域',
    dataIndex: 'location',
    scopedSlots: { customRender: 'location' }
  },
  {
    title: '物种名称',
    dataIndex: 'species',
    scopedSlots: { customRender: 'species' }
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    scopedSlots: { customRender: 'remarks' }
  },
  {
    title: '数据条目数',
    dataIndex: 'metricsCount',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 次'
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   scopedSlots: { customRender: 'status' }
  // },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  components: {
    STable,
    Ellipsis,
    PlantForm,
    PlantStepForm
  },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      formTitle: '',
      confirmLoading: false,
      mdl: null,
      stepVisible: false,
      stepFormTitle: '',
      stepConfirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleDetail (record) {
      this.$router.push({
        path: '/meta/plant/detail',
        query: {
          id: record.id
        }
      })
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
      this.formTitle = '新增植株'
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
      this.formTitle = '编辑植株'
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    // 批量操作
    handleAddBatch () {
      this.stepVisible = true
      this.stepFormTitle = '批量新增植株'
      // 初始化步骤表单数据
      this.$nextTick(() => {
        this.$refs.createStepModal.resetFormData()
      })
    },
    handleStepOk () {
      // this.stepConfirmLoading = true // 没有用到
      console.log('step ok done!')
      this.stepVisible = false
    },
    handleStepCancel () {
      console.log('step canceled!')
      this.stepVisible = false
      this.stepConfirmLoading = false
    },
    handleExport () {
      this.$message.info('导出')
    },
    handleExportQRCode () {
      this.$message.info('导出二维码')
    },
    // others
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
