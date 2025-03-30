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
        <a-form-item :label="$t('arl-scada.meta.plant.form.uuid.label')">
          <a-input
            v-decorator="[
      'uuid',
      { rules: [{ required: true, message: $t('arl-scada.meta.plant.form.uuid.required') }] }
    ]"
            name="uuid"
            :placeholder="$t('arl-scada.meta.plant.form.uuid.placeholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('arl-scada.meta.plant.form.location.label')">
          <a-select
            :placeholder="$t('arl-scada.meta.plant.form.location.placeholder')"
            v-decorator="[
      'location',
      { rules: [{ required: true, message: $t('arl-scada.meta.plant.form.location.required') }] }
    ]"
          >
            <a-select-option
              v-for="option in locationOptions"
              :key="option.key"
              :value="option.value"
            >{{ option.label }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('arl-scada.meta.plant.form.species.label')">
          <a-input
            v-decorator="[
      'species',
      { rules: [{ required: true, message: $t('arl-scada.meta.plant.form.species.required') }] }
    ]"
            name="species"
            :placeholder="$t('arl-scada.meta.plant.form.species.placeholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('arl-scada.meta.plant.form.remark.label')">
          <a-textarea
            name="remarks"
            rows="4"
            :placeholder="$t('arl-scada.meta.plant.form.remark.placeholder')"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['uuid', 'location', 'species', 'remarks']

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
      form: this.$form.createForm(this),
      locationOptions: []
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })

    // 发送请求获取选项数据
    this.fetchLocationOptions()
  },
  methods: {
    // 获取地点选项
    fetchLocationOptions () {
      // this.$http.get('/api/location').then(({ data }) => {
      //   this.locationOptions = data.map(v => ({
      //     key: v.id,
      //     value: v.id,
      //     label: v.description
      //   }))
      // })
      this.locationOptions = [
        {
          key: 1,
          value: 1,
          label: '实验室1'
        },
        {
          key: 2,
          value: 2,
          label: '实验室2'
        },
        {
          key: 3,
          value: 3,
          label: '实验室3'
        }
      ]
    }
  }
}
</script>
