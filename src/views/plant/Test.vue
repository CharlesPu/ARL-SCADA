<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <!-- 动态表单字段 -->
    <a-form-item
      v-for="(field, index) in dynamicFields"
      :key="field.key"
      :label="field.label"
    >
      <!-- 文本输入 -->
      <a-input
        v-if="field.type === 'text'"
        v-decorator="[
          `dynamicFields[${index}].value`,
          { rules: [{ required: true, message: '请输入内容' }] },
        ]"
        :placeholder="`请输入${field.label}`"
      />
      <!-- 枚举选择 -->
      <a-select
        v-else-if="field.type === 'enum'"
        v-decorator="[
          `dynamicFields[${index}].value`,
          { rules: [{ required: true, message: '请选择' }] },
        ]"
        :placeholder="`请选择${field.label}`"
      >
        <a-select-option
          v-for="option in field.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </a-select-option>
      </a-select>
      <!-- 删除按钮 -->
      <a-button
        type="danger"
        @click="removeField(index)"
        style="margin-left: 10px"
      >
        删除
      </a-button>
    </a-form-item>

    <!-- 添加属性按钮 -->
    <a-button
      type="dashed"
      @click="addField"
      style="width: 100%"
    >
      <a-icon type="plus" /> 添加属性
    </a-button>

    <!-- 提交和重置按钮 -->
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >提交</a-button>
      <a-button
        @click="handleReset"
        style="margin-left: 10px"
      >重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      dynamicFields: [], // 动态表单字段
      fieldIndex: 0 // 字段的唯一标识
    }
  },
  methods: {
    // 添加字段
    addField (type) {
      const field = {
        key: this.fieldIndex++,
        label: `属性 ${this.fieldIndex}`,
        type: type
      }
      if (type === 'enum') {
        field.options = [
          { value: 'option1', label: '选项1' },
          { value: 'option2', label: '选项2' }
        ]
      }
      this.dynamicFields.push(field)
    },
    // 删除字段
    removeField (index) {
      this.dynamicFields.splice(index, 1)
    },
    // 提交表单
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交的表单值:', values)
          alert('表单提交成功！')
        }
      })
    },
    // 重置表单
    handleReset () {
      this.form.resetFields()
      this.dynamicFields = []
      this.fieldIndex = 0
    }
  }
}
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 16px;
}
</style>
