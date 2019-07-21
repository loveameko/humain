<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
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
    <el-form-item label="来源：" prop="source">
      <el-select v-model="form.source" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分值范围：" prop="score">
      <el-input v-model="form.score"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
      <el-button @click="cancelMsg">关闭</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        answer: '',
        material: '',
        chapter: '',
        topic: '',
        source: '',
        score: ''
      },
      rules: {
        answer: [
          { required: true, message: '请输入答案', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '请选择教材', trigger: 'change' }
        ],
        chapter: [
          { required: true, message: '请选择章节', trigger: 'change' }
        ],
        topic: [
          { required: true, message: '请选择题型', trigger: 'change' }
        ],
        source: [
          { required: true, message: '请选择来源', trigger: 'change' }
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
    cancelMsg() {
      this.$emit('close')
    }
  }
}
</script>
