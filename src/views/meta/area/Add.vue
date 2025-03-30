// deperecated 页面跳转模式
<template>
  <page-header-wrapper>
    <a-card
      :body-style="{ padding: '24px 32px' }"
      :bordered="false"
    >
      <template #title>
        <div class="title-container">
          <p-back-btn></p-back-btn>
          <div class="action-buttons">
            <a-button
              htmlType="submit"
              type="primary"
              @click="handleSubmit"
            >提交</a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </div>
        </div>
      </template>
      <a-form
        @submit="handleSubmit"
        :form="form"
      >
        <a-form-item
          :label="$t('arl-scada.meta.area.form.name.label')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
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
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-textarea
            rows="4"
            :placeholder="$t('arl-scada.meta.area.form.location.placeholder')"
            v-decorator="[
              'description',
              { rules: [{ required: true, message: $t('arl-scada.meta.area.form.location.required') }] }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label="$t('arl-scada.meta.area.form.remark.label')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-textarea
            rows="1"
            :placeholder="$t('arl-scada.meta.area.form.remark.placeholder')"
          />
        </a-form-item>
        <!-- <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button
            htmlType="submit"
            type="primary"
          >{{ $t('form.basic-form.form.submit') }}</a-button>
          <a-button style="margin-left: 8px">{{ $t('form.basic-form.form.save') }}</a-button>
        </a-form-item> -->
      </a-form>
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
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      console.log(this.form.getFieldsValue())
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
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
