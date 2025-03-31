<template>
  <div>
    <a-card
      title="上传结果"
      style="margin-top: 24px"
      hoverable
    >
      <s-table
        style="margin-bottom: 24px"
        row-key="id"
        :columns="goodsColumns"
        :data="loadGoodsData"
      >
      </s-table>
      <div style="text-align: center; margin-top: 16px">
        <a-button
          type="plus"
          @click="prevStep"
          style="margin-right: 24px;"
        >上一步</a-button>
        <a-button
          :loading="loading"
          type="primary"
          @click="nextStep"
        >确认导入</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'

export default {
  name: 'Step2',
  components: {
    STable
  },
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
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      loading: false,
      timer: 0,

      goodsColumns: [
        {
          title: '商品编号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '商品条码',
          dataIndex: 'barcode',
          key: 'barcode'
        },
        {
          title: '单价',
          dataIndex: 'price',
          key: 'price',
          align: 'right'
        },
        {
          title: '数量（件）',
          dataIndex: 'num',
          key: 'num',
          align: 'right'
        },
        {
          title: '金额',
          dataIndex: 'amount',
          key: 'amount',
          align: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                id: '1234561',
                name: '矿泉水 550ml',
                barcode: '12421432143214321',
                price: '2.00',
                num: '1',
                amount: '2.00'
              },
              {
                id: '1234562',
                name: '凉茶 300ml',
                barcode: '12421432143214322',
                price: '3.00',
                num: '2',
                amount: '6.00'
              },
              {
                id: '1234563',
                name: '好吃的薯片',
                barcode: '12421432143214323',
                price: '7.00',
                num: '4',
                amount: '28.00'
              },
              {
                id: '1234564',
                name: '特别好吃的蛋卷',
                barcode: '12421432143214324',
                price: '8.50',
                num: '3',
                amount: '25.50'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      }
    }
  },
  methods: {
    nextStep () {
      this.loading = true
      const that = this // note!!!
      const err = false // todo validateFields

      var stepResult = {}
      stepResult = { result: 'step2 success', status: 'success' } // todo just for test
      console.log('step2 nextStep', this.initData, stepResult)
      if (!err) {
        // todo 这里要调用后端接口：confirmed
        that.timer = setTimeout(function () {
          that.loading = false
          that.$emit('nextStep', stepResult)
        }, 1500)
      } else {
        that.loading = false
      }
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style
  lang="less"
  scoped
></style>
