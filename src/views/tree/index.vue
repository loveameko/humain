<!--题库资源-->
<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="题目：">
        <el-input v-model="form.user" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="题型：">
        <el-select v-model="form.region" placeholder="请选择提型">
          <el-option label="单选" value="1"></el-option>
          <el-option label="多选" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难易程度：">
        <el-select v-model="form.leval" placeholder="请选择难易程度">
          <el-option label="难" value="1"></el-option>
          <el-option label="一般" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="danger" @click="search">查询</el-button>
      <el-button type="danger" @click="SeniorSearch">高级查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="AddCourse">新增</el-button>
      <el-button type="primary" @click="ImportVideo">批量导入</el-button>
      <el-button type="primary" @click="Release">一键发布</el-button>
      <el-button type="primary" @click="Delete">一键删除</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <!-- <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="答案" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属教材" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="所属章节" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="难易度" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="题型" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="来源" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-edit-outline">草稿</el-button>
          <el-button v-if="scope.row.pageviews" type="danger" size="mini" icon="el-icon-circle-check" @click="Release">发布</el-button>
          <el-button v-else type="danger" size="mini" icon="el-icon-video-pause" @click="StopRelease">停用</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <!--新增题库资源-->
    <el-dialog :visible.sync="dialogAdd" title="新增课程资源" width="30%">
      <add-course></add-course>
    </el-dialog>
    <!--批量导入视频-->
    <el-dialog :visible.sync="dialogVideo" title="批量导入视频" width="30%">
      <import-video></import-video>
    </el-dialog>
    <!--高级查询-->
    <el-dialog :visible.sync="dialogSearch" title="高级查询" width="30%">
      <senior-search @close="cancelMsg"></senior-search>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import AddCourse from './components/AddCourse'
import ImportVideo from './components/ImportVideo'
import SeniorSearch from './components/SeniorSearch'
export default {
  components: { Pagination, AddCourse, ImportVideo, SeniorSearch },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogAdd: false,
      dialogVideo: false,
      dialogSearch: false,
      form: {
        user: '',
        region: '',
        leval: ''
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
    AddCourse() {
      this.dialogAdd = true
    },
    ImportVideo() {
      this.dialogVideo = true
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
    search() {},
    SeniorSearch() {
      this.dialogSearch = true
    },
    cancelMsg() {
      this.dialogSearch = false
    }
  }
}
</script>
