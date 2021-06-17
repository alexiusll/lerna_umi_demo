import request from '@/utils/request';

/**
 * @description: 获取随访提醒表单
 * @Param:
 */
export async function FetchRemindInfo() {
  return request("/v1/treatment_info/patient/follInfo", {
    method: 'GET',
  });
}

/**
 * @description: 关闭某个随访提醒
 * @Param:
 */
export async function CloseRemind({ id, nextFollowupTime}: { id: number; nextFollowupTime: string; }) {
  return request(`/v1/treatment_info/patient/follInfo/${id}/${nextFollowupTime}`, {
    method: 'PUT',
  });
}