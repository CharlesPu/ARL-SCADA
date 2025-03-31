<template>
  <div>
    <a-button
      type="link"
      @click="downloadTemplate"
      style="margin-top: 10px;margin-bottom: 10px;"
    >
      下载模板
    </a-button>
    <!-- <a-divider/> -->
    <!-- <a-form style="max-width: 100%; max-height: 100%; margin: 10px auto 0;">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      > -->
    <a-upload-dragger
      name="file"
      :multiple="true"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>
    <!-- </a-form-item> -->
    <!-- <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      > -->
    <div style="text-align: center; margin-top: 16px">
      <a-button
        type="primary"
        :disabled="fileList.length === 0"
        :loading="uploading"
        @click="nextStep"
      >上传</a-button>
    </div>
    <!-- </a-form-item> -->
    <!-- </a-form> -->
  </div>
</template>

<script>
export default {
  name: 'Step1',
  props: {
    // 接收上一步数据
    initData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 24 }, sm: { span: 19 } },
      // todo
      fileUploadUrl: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      fileList: [],
      uploading: false
    }
  },
  methods: {
    nextStep () {
      var stepResult = {}
      stepResult = { result: 'step1 success' } // todo just for test
      console.log('step1 nextStep', this.initData, stepResult)
      // todo just for test
      this.$emit('nextStep', stepResult)
      // 先校验，通过校验后，才进入下一步
      // this.handleUpload()
    },
    downloadTemplate () {
      console.log('download template')
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload () {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files[]', file)
      })
      this.uploading = true

      // todo 这里要调用后端接口：process-and-prase
      // You can use any AJAX library you like
      // reqwest({
      //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      //   method: 'post',
      //   processData: false,
      //   data: formData,
      //   success: () => {
      //     this.fileList = [];
      //     this.uploading = false;
      //     this.$message.success('upload successfully.');
      //   },
      //   error: () => {
      //     this.uploading = false;
      //     this.$message.error('upload failed.');
      //   },
      // });
    }
  }
}
</script>

<style
  lang="less"
  scoped
>
a-upload-dragger {
  height: 200px;
}
</style>
