<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="note">
        <el-input v-model="form.note" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="配置权限：" prop="permissions">
        <el-checkbox-group v-model="form.permissions">
          <el-checkbox label="账号管理" name="permissions"></el-checkbox>
          <el-checkbox label="密码修改" name="permissions"></el-checkbox>
          <el-checkbox label="题型添加" name="permissions"></el-checkbox>
          <el-checkbox label="题型修改" name="permissions"></el-checkbox>
          <el-checkbox label="章节添加" name="permissions"></el-checkbox>
          <el-checkbox label="章节修改" name="permissions"></el-checkbox>
        </el-checkbox-group>
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
        name: '',
        note: '',
        permissions: []
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        permissions: [
          { required: true, message: '请选择配置权限', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            message: '权限信息已保存成功！',
            type: 'success'
          })
        } else {
          this.$message.error('请填写权限信息！')
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
