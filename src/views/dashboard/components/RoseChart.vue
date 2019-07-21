<template>
  <div id="myChart" :style="{width: '100%', height: '320px'}"></div>
</template>
<style lang="scss" scoped>
</style>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '320px'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 10, name: '每日一练' },
              { value: 5, name: '题目搜索' },
              { value: 15, name: '历年真题' },
              { value: 25, name: '我的笔记' },
              { value: 20, name: '人力资源' },
              { value: 35, name: '错题记录' },
              { value: 30, name: '考试咨讯' }
            ]
          }
        ]
      })
    }
  }
}
</script>
