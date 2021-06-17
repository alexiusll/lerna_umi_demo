/*
 * @Descripttion:
 * @Author: HlgdB
 * @Date: 2020-09-26 15:38:36
 */

import request from '@/utils/request';


/**
 * @description: 获取免疫组化信息
 * @Param:
 */
export async function FetchMoleDetec({ pid, treNum }: { pid: number; treNum: number }) {
    return request(`/v1/mole_detec/${pid}/${treNum}`, {
      method: 'GET',
    });
  }
  
  /**
   * @description: 添加或修改免疫组化信息
   * @Param:
   */
  export async function ModifyMoleDetec({
    pid,
    treNum,
    body,
  }: {
    pid: number;
    treNum: number;
    body: any;
  }) {
    // console.log(body);
    // return 1;
    return request(`/v1/mole_detec/${pid}/${treNum}`, {
      method: 'POST',
      data: body,
    });
  }