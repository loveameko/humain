<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="题目：" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="答案：" prop="answer">
      <el-input v-model="form.answer"></el-input>
    </el-form-item>
    <el-form-item label="所属教材：" prop="material">
      <el-select v-model="form.material" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属章节：" prop="chapter">
      <el-select v-model="form.chapter" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="form.chapter" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="难易度：" prop="level">
      <el-select v-model="form.level" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="题型：" prop="topic">
      <el-select v-model="form.topic" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="来源：" prop="source">
      <el-select v-model="form.source" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="答案解析：" prop="pars">
      <el-input v-model="form.pars" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="分值：" prop="score">
      <el-input v-model="form.score"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: '',
        answer: '',
        material: '',
        chapter: '',
        level: '',
        topic: '',
        source: '',
        pars: '',
        score: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入题目', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入答案', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '请选择教材', trigger: 'change' }
        ],
        chapter: [
          { required: true, message: '请选择章节', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择难易度', trigger: 'change' }
        ],
        topic: [
          { required: true, message: '请选择题型', trigger: 'change' }
        ],
        source: [
          { required: true, message: '请选择来源', trigger: 'change' }
        ],
        pars: [
          { required: true, message: '请输入答案解析', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入分值', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            message: '课程信息已保存成功！',
            type: 'success'
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
