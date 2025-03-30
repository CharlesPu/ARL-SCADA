import request from '@/utils/request'

const api = {
  List: '/v1/meta/area/list',
  Detail: '/v1/meta/area/detail',
  Add: '/v1/meta/area/add',
  Update: '/v1/meta/area/update',
  Delete: '/v1/meta/area/delete'
}

export function getAreaList (parameter) {
  return request({
    url: api.List,
    method: 'get',
    params: parameter
  })
}

export function getAreaDetail (parameter) {
  return request({
    url: api.Detail,
    method: 'get',
    params: parameter
  })
}

export function addArea (parameter) {
  return request({
    url: api.Add,
    method: 'post',
    data: parameter
  })
}

export function updateArea (parameter) {
  return request({
    url: api.Update,
    method: 'put',
    data: parameter
  })
}

export function deleteArea (parameter) {
  return request({
    url: api.Delete,
    method: 'delete',
    params: parameter
  })
}
