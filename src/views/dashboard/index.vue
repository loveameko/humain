<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="30" style="margin-bottom:30px;">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple border">
            <el-row>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <div class="title">
                  <h1>平台每个板块</h1>
                  <h2>访问量对比</h2>
                  <b></b>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <rose-chart/>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple border">
            <el-row>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <div class="title">
                  <h2>地区排行榜</h2>
                  <b></b>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <bar-chart/>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple border">
            <el-row>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <div class="title">
                  <h2>平均访问量</h2>
                  <b></b>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <catdouble-chart/>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple border">
            <el-row>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <div class="title">
                  <h2>用户增长分析</h2>
                  <b></b>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <catsingel-chart/>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RoseChart from './components/RoseChart'
import BarChart from './components/BarChart'
import CatdoubleChart from './components/CatdoubleChart'
import CatsingelChart from './components/CatsingelChart'
export default {
  name: 'Dashboard',
  components: {
    RoseChart,
    BarChart,
    CatdoubleChart,
    CatsingelChart
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    .border {
      border: 1px solid #e0e0e0;
      background: #ffffff;
      padding: 20px;
    }
    .mr24 {
      margin-right: 24px;
    }
    .title {
      h1 {
        font-size: 18px;
        color: #0b1323;
        font-weight: 600px;
        margin: 0;
        padding: 0;
        line-height: 24px;
      }
      h2 {
        font-size: 26px;
        color: #0b1323;
        font-weight: 600px;
        margin: 0;
        padding: 0;
        line-height: 32px;
      }
      b {
        width: 100%;
        height: 4px;
        background: #ad0e0a;
        display: block;
        margin-top: 8px;
      }
    }
  }
}
</style>
