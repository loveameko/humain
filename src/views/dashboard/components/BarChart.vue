<template>
  <div id="myCharta" :style="{width: '100%', height: '320px'}"></div>
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
      const myChart = this.$echarts.init(document.getElementById('myCharta'))
      // 绘制图表
      myChart.setOption({
        dataset: {
        source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, '北京'],
            [57.1, 78254, '江苏'],
            [74.4, 41032, '上海'],
            [32.7, 20112, '重庆']
          ]
        },
    grid: {containLabel: true},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    series: [
        {
            type: 'bar',
            encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
            }
        }
    ]
      })
    }
  }
}
</script>
