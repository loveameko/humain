<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="编号：" prop="num">
      <el-input v-model="form.num"></el-input>
    </el-form-item>
    <el-form-item label="标题：" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="格式：" prop="format">
      <el-select v-model="form.format" placeholder="请选择">
        <el-option label="mp3" value="1"></el-option>
        <el-option label="mp4" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="时长：" prop="timelength">
      <el-input v-model="form.timelength"></el-input>
    </el-form-item>
    <el-form-item label="所属教材：" prop="material">
      <el-select v-model="form.material" placeholder="请选择">
        <el-option label="人力资源一级" value="1"></el-option>
        <el-option label="人力资源二级" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属章节：" prop="chapter">
      <el-select v-model="form.chapter" placeholder="请选择">
        <el-option label="第一章劳动经济学" value="1"></el-option>
        <el-option label="第二章劳动保障法" value="2"></el-option>
      </el-select>
      <el-select v-model="form.chapter" placeholder="请选择">
        <el-option label="第一章劳动经济学" value="1"></el-option>
        <el-option label="第二章劳动保障法" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { add } from '@/api/table'
export default {
  props: {
    projecform: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      resqusetdata: {},
      form: {
        num: '',
        title: this.projecform.title,
        format: this.projecform.author,
        timelength: this.projecform.timelength,
        material: this.projecform.chapter,
        chapter: this.projecform.pageviews
      },
      rules: {
        num: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        format: [
          { required: true, message: '请选择格式', trigger: 'change' }
        ],
        timelength: [
          { required: true, message: '请输入时长', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '请选择教材', trigger: 'change' }
        ],
        chapter: [
          { required: true, message: '请选择章节', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    console.log(this.projecform)
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.resqusetdata = {
            num: this.form.num, // 编号建议不要了
            title: this.form.title,
            format: this.form.format,
            timelength: this.form.timelength,
            material: this.form.material,
            chapter: this.form.chapter
          }
          add(this.resqusetdata).then(res => {
            if (res.code === 0 && res.data) {
              this.$message({
                message: '课程信息已保存成功！',
                type: 'success'
              })
              this.$emit('close')
              this.$emit('buildPro')
            } else {
              console.log(res.message)
            }
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$message.error('请填写正确的课程信息！')
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>
