<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        v-bind="formLayout"
      >
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <!-- <a-form-item
          v-show="model && model.id > 0"
          label="主键ID"
        >
          <a-input
            v-decorator="['id', { initialValue: 0 }]"
            disabled
          />
        </a-form-item> -->
        <a-form-item
          :label="$t('arl-scada.meta.area.form.name.label')"
        >
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: $t('arl-scada.meta.area.form.name.required') }] }
            ]"
            name="name"
            :placeholder="$t('arl-scada.meta.area.form.name.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('arl-scada.meta.area.form.location.label')"
        >
          <a-input
            :placeholder="$t('arl-scada.meta.area.form.location.placeholder')"
            v-decorator="[
              'location',
              { rules: [{ required: true, message: $t('arl-scada.meta.area.form.location.required') }] }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label="$t('arl-scada.meta.area.form.remark.label')"
        >
          <a-textarea
            rows="4"
            :placeholder="$t('arl-scada.meta.area.form.remark.placeholder')"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'name', 'location']

export default {
  props: {
    title: {
      type: String,
      default: () => '新建'
    },
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        lg: { span: 7 },
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        lg: { span: 12 },
        xs: { span: 24 },
        sm: { span: 17 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    // 这里改表单初始化值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
