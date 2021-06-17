/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-03-26 16:00:59
 */
import request from '@/utils/request';

/**
 * @description: 获取标本信息
 * @Param:
 */
export async function FetchSpecimenInformation({ pid }: { pid: number }) {
  return request(`/v1/specimen_info/${pid}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加标本信息
 * @Param:
 */
export async function ModifySpecimenInformation({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/specimen_info/${pid}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除标本信息
 * @Param:
 */
export async function DeleteSpecimenInformation({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/specimen_info/${pid}`, {
    method: 'DELETE',
    data: body,
  });
}
