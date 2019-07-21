<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="所属教材：">
        <el-select v-model="form.material" placeholder="请选择教材">
          <el-option label="教材一" value="1"></el-option>
          <el-option label="教材二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="danger" @click="search">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="AddDirectory">新增</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题"></el-table-column>
      <el-table-column align="center" prop="title" label="类别"></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <el-button type="danger" size="mini" icon="el-icon-success">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-icon-document" @click="DelDirectory">删除</el-button>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <!--新增目录-->
    <el-dialog :visible.sync="dialogDirectory" title="新增目录" width="30%">
      <directory @close="cancelMsg"></directory>
    </el-dialog>
  </div>
</template>
<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import Directory from './components/Directory'
export default {
  components: { Pagination, Directory },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogDirectory: false,
      form: {
        material: ''
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
    search() {},
    AddDirectory() {
      this.dialogDirectory = true
    },
    cancelMsg() {
      this.dialogDirectory = false
    },
    DelDirectory() {
      this.$confirm('您确定要删除这条目录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '目录删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
