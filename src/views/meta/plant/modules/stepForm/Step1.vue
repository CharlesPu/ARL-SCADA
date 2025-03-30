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
    <a-form style="max-width: 100%; max-height: 100%; margin: 10px auto 0;">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-upload-dragger
          name="file"
          :multiple="true"
          :action="fileUploadUrl"
          @change="handleFileChange"
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
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button
          type="primary"
          @click="nextStep"
        >下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 24 }, sm: { span: 19 } },
      // todo
      fileUploadUrl: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      fileUploadStatus: 'uploading' // uploading done error
    }
  },
  methods: {
    nextStep () {
      this.$emit('nextStep') // todo just for test
      // 先校验，通过校验后，才进入下一步
      // if (this.fileUploadStatus === 'done') {
      //   this.$emit('nextStep')
      // } else {
      //   this.$message.error('请上传正确的文件!')
      // }
    },
    downloadTemplate () {
      console.log('download template')
    },
    handleFileChange (info) {
      const status = info.file.status
      this.fileUploadStatus = status
      console.log('file changed!', status)
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
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
