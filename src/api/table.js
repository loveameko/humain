import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// 课程资源
export function getCourse(params) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/225461/getCourse',
    method: 'get',
    params
  })
}

// 新增课程资源
export function add(params) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/225461/getCourse', //
    method: 'post',
    params
  })
}

// 删除课程资源单条
export function del(id) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/225461/getCourse', //
    method: 'post',
    id
  })
}

// 删除课程资源多条
export function delMore(data) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/225461/getCourse', //
    method: 'post',
    data
  })
}

// 是否发布课程资源
export function isRelease(data) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/225461/getCourse', //
    method: 'put',
    data
  })
}

// 一键发布课程资源
export function isReleaseMore(data) {
  return request({
    url: 'http://rap2api.taobao.org/app/mock/225461/getCourse', //
    method: 'put',
    data
  })
}
