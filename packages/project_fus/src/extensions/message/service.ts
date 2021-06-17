/*
 * @Author: linkenzone
 * @Date: 2021-05-17 16:31:06
 * @Descripttion: Do not edit
 */

import request from '@/utils/request';

/**
 * @description: 获取未更改的样本
 * @Param:
 */
export async function FetchUnchangedList({ body, params }: { body: any; params: any }) {
  return request('/v1/sample/unchanged', {
    method: 'POST',
    params,
    data: body,
  });
}
