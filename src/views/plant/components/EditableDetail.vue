<template>
  <div class="editable-detail-view">
    <!-- 字段行容器 -->
    <div
      v-for="(field, index) in processedFields"
      :key="field.key + index"
      class="detail-row"
      :class="{ 'editable-field': field.editable }"
    >
      <!-- 标签区域 -->
      <div class="label-column">
        <span class="field-label">{{ field.label }}：</span>
      </div>

      <!-- 内容区域 -->
      <div class="content-column">
        <!-- 可编辑字段 -->
        <template v-if="field.editable">
          <!-- 输入框模式 -->
          <a-input
            v-if="field.type === 'input' && field.editing"
            v-model="editedValues[field.key]"
            :placeholder="field.placeholder"
            class="editable-control"
            @blur="handleBlur(field)"
            @keyup.enter="handleBlur(field)"
          />

          <!-- 选择框模式 -->
          <a-select
            v-else-if="field.type === 'select' && field.editing"
            v-model="editedValues[field.key]"
            class="editable-control"
            @blur="handleBlur(field)"
          >
            <a-select-option
              v-for="option in field.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>

          <!-- 日期选择模式 -->
          <a-date-picker
            v-else-if="field.type === 'date' && field.editing"
            v-model="editedValues[field.key]"
            class="editable-control"
            :format="field.format || 'YYYY-MM-DD'"
            @blur="handleBlur(field)"
          />

          <!-- 展示模式 -->
          <div
            v-else
            class="display-container"
            @click="handleEdit(field)"
          >
            <span class="display-value">{{ field.value ? formatDisplayValue(field) : null }}</span>
            <a-icon
              type="edit"
              class="edit-icon"
            />
          </div>
        </template>

        <!-- 不可编辑字段 -->
        <span
          v-else
          class="static-text"
        >
          {{ formatStaticValue(field) }}
        </span>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="action-bar">
      <a-button
        type="primary"
        :loading="submitting"
        :disabled="!hasChanges"
        @click="handleSubmit"
      >
        <a-icon type="save" /> 保存所有修改
      </a-button>
    </div>
  </div>
</template>

<script>
// 按需引入旧版组件
import {
  Icon,
  Button,
  Input,
  Select,
  DatePicker
} from 'ant-design-vue'

export default {
  components: {
    'a-icon': Icon,
    'a-button': Button,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker
  },
  props: {
    // 字段配置规范
    fields: {
      type: Array,
      required: true,
      validator: fields => fields.every(f => {
        const valid = f.key && f.label !== undefined
        if (f.type === 'select') return valid && Array.isArray(f.options)
        if (f.type === 'date') return valid && (f.value || f.placeholder)
        return valid
      })
    }
  },
  data () {
    return {
      editedValues: {}, // 编辑值缓存
      submitting: false, // 提交状态
      localFields: [] // 本地字段副本
    }
  },
  computed: {
    // 处理后的字段数据
    processedFields () {
      return this.localFields.map(f => ({
        ...f,
        editing: this.editedValues.hasOwnProperty(f.key)
      }))
    },

    // 是否有未保存的修改
    hasChanges () {
      return Object.keys(this.editedValues).length > 0
    }
  },
  watch: {
    // 深度监听字段配置变化
    fields: {
      immediate: true,
      deep: true,
      handler (newVal) {
        this.localFields = newVal.map(f => ({
          type: 'input', // 默认类型
          editable: false, // 默认不可编辑
          ...f,
          // 日期字段初始化处理
          value: f.type === 'date' && f.value ? this.$moment(f.value) : f.value
        }))
      }
    }
  },
  methods: {
    // 进入编辑模式
    handleEdit (field) {
      if (!field.editable || this.submitting) return
      this.$set(this.editedValues, field.key, field.value)
    },

    // 退出编辑模式
    handleBlur (field) {
      if (field.type === 'date' && this.editedValues[field.key]) {
        // 日期类型转换处理
        this.editedValues[field.key] = this.editedValues[field.key].format(
          field.format || 'YYYY-MM-DD'
        )
      }
      if (!this.editedValues[field.key]) {
        this.$delete(this.editedValues, field.key)
      }
    },

    // 格式化显示值
    formatDisplayValue (field) {
      if (field.displayFormatter) {
        return field.displayFormatter(field.value)
      }
      if (field.type === 'select') {
        const option = (field.options || []).find(opt => opt.value === field.value)
        return option ? option.label : field.value
      }
      if (field.type === 'date') {
        return field.value && field.value.isValid()
          ? field.value.format(field.format || 'YYYY-MM-DD')
          : '请选择日期'
      }
      return field.value
    },

    // 格式化静态值
    formatStaticValue (field) {
      return field.displayValue || this.formatDisplayValue(field)
    },

    // 提交修改
    async handleSubmit () {
      try {
        this.submitting = true
        const payload = Object.keys(this.editedValues).reduce((acc, key) => {
          const field = this.localFields.find(f => f.key === key)
          acc[key] = this.editedValues[key]
          // 日期字段转换回字符串
          if (field.type === 'date') {
            acc[key] = this.$moment(acc[key]).format(field.format || 'YYYY-MM-DD')
          }
          return acc
        }, {})

        // 调用保存接口
        await this.$http.post('/api/save-details', payload)

        // 更新本地数据
        this.localFields = this.localFields.map(f => {
          if (payload.hasOwnProperty(f.key)) {
            return {
              ...f,
              value: f.type === 'date' ? this.$moment(payload[f.key]) : payload[f.key]
            }
          }
          return f
        })

        this.editedValues = {}
        this.$message.success('数据保存成功')
      } catch (error) {
        this.$message.error(`保存失败: ${error.message}`)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';

.editable-detail-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;

  .detail-row {
    display: flex;
    margin-bottom: 16px;
    min-height: 40px;

    // 标签列
    .label-column {
      width: 140px;
      padding-right: 24px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .field-label {
        color: @heading-color;
        font-weight: 500;
        font-size: 14px;
      }
    }

    // 内容列
    .content-column {
      flex: 1;
      min-width: 0;

      // 可编辑容器
      .display-container {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        background: #fff;
        transition: all 0.3s;

        &:hover {
          border-color: @primary-5;

          .edit-icon {
            color: @primary-5;
          }
        }

        .display-value {
          color: @text-color;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .edit-icon {
          color: @disabled-color;
          margin-left: 8px;
          transition: color 0.3s;
        }
      }

      // 统一控件样式
      .editable-control {
        width: 100%;

        /deep/ .ant-input,
        /deep/ .ant-select-selection,
        /deep/ .ant-calendar-picker-input {
          height: 32px;
          padding: 4px 11px;
          border-radius: 4px;
        }
      }

      // 静态文本
      .static-text {
        color: @text-color;
        line-height: 32px;
        padding: 0 12px;
        display: block;
      }
    }

    // 可编辑字段外框
    &.editable-field {
      .content-column {
        .display-container {
          border: 1px solid #d9d9d9;
        }
      }
    }
  }

  // 操作栏
  .action-bar {
    margin-top: 32px;
    padding-left: 164px;
    text-align: left;

    /deep/ .ant-btn {
      min-width: 120px;
      height: 36px;
    }
  }
}
</style>
