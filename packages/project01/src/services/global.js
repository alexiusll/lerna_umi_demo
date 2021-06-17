import request from '../utils/request'

// 获取用户签名
export async function FetchSignature() {
  return request('/signature', {
    method: 'GET'
  })
}

// 上传用户签名
export async function PostSignature() {
  return request('/signature', {
    method: 'POST'
  })
}

// 获取研究中心
export async function FetchResearchCenterInfo(body) {
  return request('/v1/research_centers', {
    method: 'GET',
    params: body
  })
}
