/**
  * api接口的统一出口
  */

// 账号权限管理模块，基础信息管理
import table from '@/api/table'
// 工勤人员信息
import user from '@/api/user'
// 历史报名记录

// 导出接口
export default {
  table,
  user

}
