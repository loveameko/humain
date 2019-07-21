<!--课程资源-->
<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="标题：">
        <el-input v-model="form.user" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="所属章节：">
        <el-select v-model="form.region" placeholder="请选择所属章节">
          <el-option label="第一章劳动经济学" value="1"></el-option>
          <el-option label="第二章劳动保障法" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属教材：">
        <el-select v-model="form.leval" placeholder="请选择所属教材">
          <el-option label="人力资源一级" value="1"></el-option>
          <el-option label="人力资源二级" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="danger" @click="fetchData">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="AddCourse('new')">新增</el-button>
      <el-button type="primary" @click="ImportVideo">批量导入视频</el-button>
      <el-button type="primary" @click="releaseMore">一键发布</el-button>
      <el-button type="primary" @click="DeleteMore">一键删除</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="格式" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属教材" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" prop="chapter" label="所属章节" width="200" align="center">
      </el-table-column>
      <el-table-column align="center" prop="timelength" label="时长" width="100">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-edit-outline" @click="AddCourse('edito', scope.$index)">草稿</el-button>
          <el-button v-if="scope.row.status == 0" type="danger" size="mini" icon="el-icon-circle-check" @click="Release(scope.row.status)">发布</el-button>
          <el-button v-else type="danger" size="mini" icon="el-icon-video-pause" @click="Release(scope.row.status)">停用</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <!--新增课程资源-->
    <el-dialog :visible.sync="dialogAdd" :title="titleCourse" width="30%">
      <add-course :projecform="formchild" @fetchData="fetchData" @close="cancelMsg"></add-course>
    </el-dialog>
    <!--批量导入视频-->
    <el-dialog :visible.sync="dialogVideo" title="批量导入视频" width="30%">
      <import-video @fetchData="fetchData" @close="cancelMsg"></import-video>
    </el-dialog>
  </div>
</template>

<script>
import { getCourse, del, isRelease, delMore, isReleaseMore } from '@/api/table'
import Pagination from '@/components/Pagination'
import AddCourse from './components/AddCourse'
import ImportVideo from './components/ImportVideo'
export default {
  components: { Pagination, AddCourse, ImportVideo },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogAdd: false,
      dialogVideo: false,
      titleCourse: '',
      form: {
        user: '',
        region: '',
        leval: ''
      },
      multipleSelection: [],
      requestData: {},
      formchild: {},
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
      this.requestData.pageNo = this.listQuery.page
      this.requestData.pageSize = this.listQuery.limit
      // 标题搜索
      if (this.form.user) {
        this.requestData['params[title]'] = this.form.user
      }
      // 所属章节
      if (this.form.region) {
        this.requestData['params[chapter]'] = this.form.region
      }
      // 所属教材
      if (this.form.leval) {
        this.requestData['params[pageviews]'] = this.form.leval
      }
      getCourse(this.requestData).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    AddCourse(name, index) {
      this.dialogAdd = true
      if (name === 'new') {
        this.titleCourse = '新增课程资源'
      } else if (name === 'edito') {
        this.titleCourse = '编辑课程资源'
        this.formchild = this.list[index]
      }
    },
    ImportVideo() {
      this.dialogVideo = true
    },
    Delete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '正在删除该条数据...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        del(id).then(res => {
          loading.close()
          if (res.code === 0 && res.data) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          } else {
            console.log(res.message)
          }
        })
          .catch(error => {
            loading.close()
            console.log(error)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 一键删除
    DeleteMore() {
      const loading = this.$loading({
        lock: true,
        text: '删除中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const idArr = this.multipleSelection
      if (this.multipleSelection.length > 0) {
        delMore(idArr).then(res => {
          loading.close()
          if (res.code === 0 && res.data) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          } else {
            loading.close()
            console.log(res.message)
          }
        })
          .catch(error => {
            loading.close()
            console.log(error)
          })
      } else {
        loading.close()
        this.$message({
          type: 'error',
          message: '请选择您要删除的内容!'
        })
      }
    },

    // 发布单条
    Release(num) {
      console.log(num)
      if (num === '0') {
        this.$confirm('您确定要发布这条内容吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          isRelease(num).then(res => {
            if (res.code === 0 && res.data) {
              this.fetchData()
              this.$message({
                type: 'success',
                message: '内容发布成功!'
              })
            } else {
              console.log(res.message)
            }
          })
            .catch(error => {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      } else if (num === '1') {
        this.$confirm('您确定要停用这条内容吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          isRelease(this.request).then(res => {
            if (res.code === 0 && res.data) {
              this.request = num
              this.fetchData()
              this.$message({
                type: 'success',
                message: '内容停用成功!'
              })
            } else {
              console.log(res.message)
            }
          })
            .catch(error => {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          })
        })
      }
    },
    // 一键发布
    releaseMore() {
      const loading = this.$loading({
        lock: true,
        text: '发布中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // debugger
      const idArr = this.multipleSelection
      if (this.multipleSelection.length > 0) {
        isReleaseMore(idArr).then(res => {
          loading.close()
          if (res.code === 0 && res.data) {
            this.$message({
              type: 'success',
              message: '发布成功!'
            })
            this.fetchData()
          } else {
            console.log(res.message)
          }
        })
          .catch(error => {
            loading.close()
            console.log(error)
          })
      } else {
        loading.close()
        this.$message({
          type: 'error',
          message: '请选择您要发布的内容!'
        })
      }
    },
    // 子组件的取消
    cancelMsg() {
      this.dialogAdd = false
      this.dialogVideo = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = this.$tools.getArrayId(val)
    }
  }
}
</script>
