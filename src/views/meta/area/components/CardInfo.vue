<template>
  <div class="cardInfo">
    <div class="left">
      <p>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：{{ position }}</p>
      <p>创建时间：{{ createTime }}</p>
      <p><ellipsis :length="34" tooltip>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{{ remarks }}</ellipsis></p>
    </div>
    <div class="right">
      <a-statistic title="植株数量" :value="plantNum"/>
    </div>
  </div>
</template>

<script>
import { Ellipsis } from '@/components'
export default {
  name: 'CardInfo',
  components: {
    Ellipsis
  },
  props: {
    position: {
      type: [String, Number],
      default: '农生环'
    },
    createTime: {
      type: [String, Number],
      default: '2025-03-30'
    },
    remarks: {
      type: [String],
      default: '这是一个备注这是一个备注这是一个备注'
    },
    plantNum: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style
  lang="less"
  scoped
>
@import "~@/components/index.less";
@import "~@/utils/utils.less";

.cardInfo {

  .clearfix();

  margin-top: 16px;
  margin-left: 0px;

  &>div {
    position: relative;
    float: left;
    width: 50%;
    text-align: left;

    p {
      margin: 0;
      font-size: 14px;
      line-height: 24px;
    }
  }
  .left {
    width: 70%;
  }

  .right {
    width: 30%;
    .a-statistic {
      margin: 0;
      font-size: 24px;
      line-height: 32px;
    }
    /* p:first-child {
      margin-bottom: 4px;
      color: @text-color-secondary;
      font-size: 12px;
      line-height: 20px;
    } */
  }
}
</style>
