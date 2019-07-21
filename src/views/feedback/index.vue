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
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="错题题目"></el-table-column>
      <el-table-column align="center" prop="title" label="错题所在题库中题库的编号"></el-table-column>
      <el-table-column align="center" prop="title" label="错题的原因"></el-table-column>
      <el-table-column align="center" prop="title" label="反馈说明"></el-table-column>
      <el-table-column align="center" prop="title" label="会员手机号"></el-table-column>
      <el-table-column align="center" prop="title" label="会员微信号"></el-table-column>
      <el-table-column align="center" prop="title" label="会员昵称"></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <el-button type="danger" size="mini" icon="el-icon-success" @click="Correct">纠正</el-button>
        <el-button type="danger" size="mini" icon="el-icon-document" @click="Reply">回复</el-button>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <!--纠正-->
    <el-dialog :visible.sync="dialogCorrect" title="纠正" width="30%">
      <correct @close="cancelMsg"></correct>
    </el-dialog>
    <!--错题回复-->
    <el-dialog :visible.sync="dialogReply" title="反馈回复" width="30%">
      <reply @close="cancelMsg"></reply>
    </el-dialog>
  </div>
</template>
<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import Reply from './components/Reply'
import Correct from './components/Correct'
export default {
  components: { Pagination, Reply, Correct },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogReply: false,
      dialogCorrect: false,
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
    // 回复
    Reply() {
      this.dialogReply = true
    },
    // 纠正
    Correct() {
      this.dialogCorrect = true
    },
    search() {},
    cancelMsg() {
      this.dialogReply = false
      this.dialogCorrect = false
    }
  }
}
</script>
