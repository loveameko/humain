<template>
  <div>
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" prop="title" label="题目"></el-table-column>
      <el-table-column align="center" prop="answer" label="答案"></el-table-column>
      <el-table-column align="center" prop="question" label="解析"></el-table-column>
    </el-table>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="margin-top: 30px;">
      <el-form-item label="题目：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="答案：" prop="title">
        <el-input v-model="form.answer"></el-input>
      </el-form-item>
      <el-form-item label="解析：" prop="title">
        <el-input v-model="form.question"></el-input>
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
      <el-form-item label="分值：" prop="title">
        <el-input v-model="form.score"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="cancelMsg">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: '员工个人层次的赔讯需求分析的内容包括哪些',
          answer: 'ABCD',
          question: '培训需求层次分为战略层次、组织层次、员工个人层次培训需求层次分为战略层次、组织层次、员工个人层次培训需求层次分为战略层次、组织层次、员工个人层次培训需求层次分为战略层次、组织层次、员工个人层次'
        }
      ],
      form: {
        title: '',
        answer: '',
        question: '',
        material: '',
        chapter: '',
        score: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入题目', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入答案', trigger: 'blur' }
        ],
        question: [
          { required: true, message: '请输入解析', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '请选择教材', trigger: 'change' }
        ],
        chapter: [
          { required: true, message: '请选择章节', trigger: 'change' }
        ],
        score: [
          { required: true, message: '请输入分值', trigger: 'blur' }
        ]
      }
      // listLoading: true
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            message: '纠正信息已保存成功！',
            type: 'success'
          })
        } else {
          this.$message.error('请填写纠正信息！')
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
