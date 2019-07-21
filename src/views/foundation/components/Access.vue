<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">角色树目标</el-menu-item>
          </el-menu>
          <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[1,2]" :default-checked-keys="[5]" :props="defaultProps" style="margin-top:20px;">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light check">
          <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">权限组配置</el-menu-item>
          </el-menu>
          <el-checkbox-group v-model="checkList" style="margin-top:20px;">
            <el-checkbox label="账号管理"></el-checkbox>
            <el-checkbox label="密码修改"></el-checkbox>
            <el-checkbox label="题型添加"></el-checkbox>
            <el-checkbox label="题型修改"></el-checkbox>
            <el-checkbox label="章节添加"></el-checkbox>
            <el-checkbox label="章节修改"></el-checkbox>
          </el-checkbox-group>
          <el-button type="danger">确定</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
</style>
<style lang="scss">
  .check {
    .el-checkbox {
      width: 33.333333%;
      margin-bottom: 15px;
    }
  }
</style>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex1: '1',
      checkList: [],
      data: [{
        id: 1,
        label: '超级管理员',
        children: [{
          id: 2,
          label: '题库管理员',
          children: [{
            id: 4,
            label: '信息员'
          }]
        },
        {
          id: 3,
          label: '章节理员'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>
