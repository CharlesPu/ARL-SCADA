<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="loading"
    :footer="null"
    :maskClosable="false"
    :destroyOnClose="true"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-card :bordered="false">
        <a-steps
          class="steps"
          :current="currentTab"
        >
          <a-step title="填写信息" />
          <a-step title="确认信息" />
          <a-step title="完成" />
        </a-steps>
        <div class="content">
          <step1
            v-if="currentTab === 0"
            :initData="formResultData[0]"
            @nextStep="nextStep"
          />
          <step2
            v-if="currentTab === 1"
            :initData="formResultData[1]"
            @nextStep="nextStep"
            @prevStep="prevStep"
          />
          <step3
            v-if="currentTab === 2"
            :initData="formResultData[2]"
            @prevStep="prevStep"
            @finish="finish"
          />
        </div>
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script>
import Step1 from './stepForm/Step1'
import Step2 from './stepForm/Step2'
import Step3 from './stepForm/Step3'

export default {
  components: {
    Step1,
    Step2,
    Step3
  },
  props: {
    title: { type: String, default: '标题' },
    visible: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
      currentTab: 0,
      // 按步骤顺序存储数据，0暂时不用
      // 0 \ 1 \ 2
      // stepInit\step1\step2
      formResultData: [{ result: 'stepInit' }, null, null]
    }
  },
  // created () {
  //   this.formResultData[0] = { result: 'stepInit' }
  //   console.log('step form created', this.formResultData)
  // },
  methods: {
    // handler
    nextStep (stepData) {
      var stepNow = this.currentTab + 1
      this.formResultData[stepNow] = stepData
      console.log('stepForm nextStep: step' + stepNow + ' result', stepData)
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep () {
      var stepNow = this.currentTab + 1
      this.formResultData[stepNow] = null
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      // this.currentTab = 0
      console.log('step form finish')
      this.$emit('ok')
    },
    // 供父级调用
    resetFormData () {
      console.log('step form resetFormData')
      this.currentTab = 0 // 统一收口到本函数进行重置
      // 如果表单中有其他数据，也在这里进行重置
      this.formResultData = [{ result: 'stepInit' }, null, null]
    }
  }
}
</script>
