<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-button type="danger" @click="search">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="AddFoundation">新增</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="名称" prop="author" align="center"></el-table-column>
      <el-table-column label="备注" prop="author" align="center"></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <el-button type="danger" size="mini" icon="el-icon-edit-outline">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete">删除</el-button>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <!--权限新增-->
    <el-dialog :visible.sync="dialogFoundation" title="权限新增" width="30%">
      <add-foundation @close="cancelMsg"></add-foundation>
    </el-dialog>
    <!--权限配置-->
    <el-dialog :visible.sync="dialogAccess" title="权限配置" width="60%">
      <access @close="cancelMsg"></access>
    </el-dialog>
  </div>
</template>
<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import AddFoundation from './components/AddFoundation'
import Access from './components/Access'
export default {
  components: { Pagination, AddFoundation, Access },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFoundation: false,
      dialogAccess: false,
      form: {
        text: ''
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
    AddFoundation() {
      this.dialogFoundation = true
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
    search() {
      this.dialogAccess = true
    },
    cancelMsg() {
      this.dialogFoundation = false
      this.dialogAccess = false
    }
  }
}
</script>
