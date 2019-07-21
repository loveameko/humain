<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="会员微信号：" prop="title">
      <span>{{ form.wxnum }}</span>
    </el-form-item>
    <el-form-item label="会员昵称：" prop="title">
      <span>{{ form.wxmane }}</span>
    </el-form-item>
    <el-form-item label="反馈回复：" prop="desc">
      <el-input v-model="form.desc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
      <el-button @click="cancelMsg">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        wxnum: 'loveameko',
        wxmane: '怀念的感',
        desc: ''
      },
      rules: {
        desc: [
          { required: true, message: '请输入反馈', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            message: '反馈回复已保存成功！',
            type: 'success'
          })
        } else {
          this.$message.error('请填写反馈回复！')
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
