<template>
  <div class="homePage">
    <!-- <area-com></area-com> -->
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
// import areaCom from "@/components/areaCom"
export default {
  name: 'homePage',
  data() {
    return {
      params: {
        type: 2, // 2：年月；3：年月日；4：年月日时；5：年月日时分
        showChinese: false, // 默认false，不显示中文格式
        value: [2018, 10, 9], // 默认选择显示的日期，是一个数组
        quarter: false, // 时间是否以刻度形式显示，默认false
        min: [], // 设置日期的下限
        max: [], // 设置日期的上限
      }
    }
  },
  created() {
    this.showDatePicker()
  },
  methods: {
    sel(val) {
      console.log(val)
    },
    showDatePicker() {
      this.$datePicker(this.params).then((e) => {
        console.log(e)
      }).catch((e) => {
          // console.log(e)
      })
    },
  },
  components: {
    // Group,
    // Cell,
    // areaCom
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~@/assets/less/webapp';
.homePage {
  background: #0000;
  .asd {
    width: 20px;
    height: 20px;
    background: red;
  }
}
</style>
