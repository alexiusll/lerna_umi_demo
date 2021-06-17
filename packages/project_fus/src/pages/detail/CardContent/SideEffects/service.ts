/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2020-10-24 15:26:37
 */
import request from '@/utils/request';

/**
 * @description: 获取副反应
 * @Param:
 */
export async function FetchSideEffect({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/treatment_info/side_effect/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改副反应
 * @Param:
 */
export async function ModifySideEffect({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log("body", body);
  return request(`/v1/treatment_info/side_effect/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除副反应
 * @Param:
 */
export async function DeleteSideEffect({ pid, se_id }: { pid: number; se_id: number }) {
  // console.log("body", body);
  return request(`/v1/treatment_info/side_effect/${pid}/${se_id}`, {
    method: 'DELETE',
  });
}
