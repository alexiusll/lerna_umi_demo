/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:19
 */

import request from '@/utils/request';

/**
 * @description: 获取既往史
 * @Param:
 */
export async function FetchPastHistory({ pid }: { pid: number }) {
  return request(`/v1/past_history/${pid}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改既往史
 * @Param:
 */
export async function ModifyPastHistory({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/past_history/${pid}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取药物史
 * @Param:
 */
export async function FetchDrugHistory({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/past_history/drug_history/${pid}`, {
    params: body,
    method: 'GET',
  });
}

/**
 * @description: 添加或修改药物史
 * @Param:
 */
export async function ModifyDrugHistory({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/past_history/drug_history/${pid}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除药物史
 * @Param: ids:integer []
 */
export async function DeleteDrugHistory({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/past_history/drug_history/${pid}`, {
    method: 'Delete',
    data: body,
  });
}
