<template>
  <page-header-wrapper>
    <div>
      <h2>生成二维码</h2>
      <input
        v-model="text"
        placeholder="输入内容"
      />
      <button @click="generateQRCode">生成二维码</button>
      <button @click="generateQRCode">批量生成二维码</button>
      <div v-if="qrCodeUrl">
        <h3>二维码图片：</h3>
        <img
          :src="qrCodeUrl"
          alt="QR Code"
        />
      </div>
      <button
        @click="downloadQRCode"
        v-if="qrCodeUrl"
      >下载二维码</button>
    </div>
  </page-header-wrapper>
</template>

<script>
import QRCode from 'qrcode'

export default {
  data () {
    return {
      text: '', // 输入的内容
      qrCodeUrl: '' // 生成的二维码图片 URL
    }
  },
  methods: {
    async generateQRCode () {
      if (!this.text) {
        alert('请输入内容')
        return
      }

      try {
        // 生成二维码并转换为 Data URL
        this.qrCodeUrl = await QRCode.toDataURL(this.text, {
          color: {
            dark: '#000', // 二维码点的颜色
            light: '#fff' // 背景颜色
          },
          width: 300 // 二维码宽度
        })
      } catch (error) {
        console.error('生成二维码失败', error)
        alert('生成二维码失败，请重试')
      }
    },
    downloadQRCode () {
      if (!this.qrCodeUrl) return
      const link = document.createElement('a')
      link.href = this.qrCodeUrl
      link.download = 'qrcode.png'
      link.click()
    }
  }
}
</script>

<style scoped>
input {
  padding: 8px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #40a9ff;
}

img {
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
