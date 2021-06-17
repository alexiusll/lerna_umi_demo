/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:19
 */

import request from '@/utils/request';

/**
 * @description: 获取病人信息
 * @Param:
 */
export async function FetchPatient({ pid }: { pid: number }) {
  return request(`/v1/patient/${pid}`, {
    method: 'GET',
  });
}

/**
 * @description: 新增或修改病人信息
 * @Param:
 */
export async function ModifyPatient({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/patient/${pid}`, {
    method: 'POST',
    data: body,
  });
}
