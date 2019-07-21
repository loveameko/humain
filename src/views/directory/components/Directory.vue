<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="章节标题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="级别：" prop="material">
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
      form: {
        title: '',
        material: '',
        chapter: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入章节标题', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        chapter: [
          { required: true, message: '请选择章节', trigger: 'change' }
        ]
      }
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
