/*
 * @Descripttion: 全局的后台请求
 * @Author: linkenzone
 * @Date: 2020-09-07 21:38:41
 */
import request from '@/utils/request';

/**
 * @description: 获取nav导航
 * @Param:
 */
export async function FetchNav({ pid }: { pid: number }) {
  return request(`/v1/record_info/nav/${pid}`, {
    method: 'GET',
  });
}

/**
 * @description: 新增治疗信息
 * @Param:
 */
export async function AddRecordInfo({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/record_info/${pid}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除治疗信息
 * @Param:
 */
export async function DeleteRecordInfo({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/record_info/${pid}`, {
    method: 'Delete',
    data: body,
  });
}

/**
 * @description: 获取研究中心
 * @Param:
 */
export async function FetchResearchCentersList({ body }: { body: any }) {
  return request('/rbac/v1/research_centers', {
    method: 'GET',
    params: body,
  });
}

/**
 * @description: 获取用户的权限
 * @Param:
 */
export async function FetchUserAuths({ body }: { body: any }) {
  return request('/rbac/v1/user/auths', {
    method: 'GET',
    params: body,
  });
}
