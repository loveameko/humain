<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="地区：">
        <el-select v-model="form.province" placeholder="省">
          <el-option label="教材一" value="1"></el-option>
          <el-option label="教材二" value="2"></el-option>
        </el-select>
        <el-select v-model="form.city" placeholder="市">
          <el-option label="教材一" value="1"></el-option>
          <el-option label="教材二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input v-model="form.phone" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-button type="danger" @click="search">查询</el-button>
      <el-button type="danger">高级查询</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="昵称" prop="author" align="center"></el-table-column>
      <el-table-column label="姓名" prop="author" align="center"></el-table-column>
      <el-table-column label="联系方式" prop="author" align="center"></el-table-column>
      <el-table-column label="报考级别" prop="author" align="center"></el-table-column>
      <el-table-column label="地区" prop="author" align="center"></el-table-column>
      <el-table-column label="会员分类" prop="author" align="center"></el-table-column>
      <el-table-column label="微信号" prop="author" align="center"></el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.pageviews" type="danger" size="mini" icon="el-icon-circle-check" @click="Release">启用</el-button>
          <el-button v-else type="danger" size="mini" icon="el-icon-video-pause" @click="StopRelease">停用</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>
<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      form: {
        province: '',
        city: '',
        nickname: '',
        name: '',
        phone: ''
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    Delete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    Release() {
      this.$confirm('您确定要发布这条内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '内容发布成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    StopRelease() {
      this.$confirm('您确定要停用这条内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '内容停用成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        })
      })
    },
    search() {}
  }
}
</script>
