import request from '@/utils/request';

/**
 * @description: 获取症状体征
 * @Param:
 */
export async function FetchTreatmentInfo({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/treatment_info/signs/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改症状体征
 * @Param:
 */
export async function ModifyTreatmentInfo({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log("body", body);
  return request(`/v1/treatment_info/signs/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除症状体征
 * @Param:
 */
export async function DeleteTreatmentInfo({ pid, sign_id }: { pid: Number; sign_id: number }) {
  // console.log("body", body);
  return request(`/v1/treatment_info/signs/${pid}/${sign_id}`, {
    method: 'DELETE',
  });
}
