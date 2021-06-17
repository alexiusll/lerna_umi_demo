/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-19 14:55:58
 */

import request from '@/utils/request';

/**
 * @description: 获取初诊过程
 * @Param:
 */
export async function FetchFirstDiagnose({ pid }: { pid: number }) {
  return request(`/v1/first_diagnose/${pid}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改初诊过程
 * @Param:
 */
export async function ModifyFirstDiagnose({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/first_diagnose/${pid}`, {
    method: 'POST',
    data: body,
  });
}
