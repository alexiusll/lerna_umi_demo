/*
 * @Author: linkenzone
 * @Date: 2021-06-08 19:32:13
 * @Descripttion: Do not edit
 */

import request from '../utils/request';

/**
 * @description: 获取 series 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchSeries({ uuid }: { uuid: string }) {
  return request(`/series/${uuid}`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 series 下Instance 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchInstancesOfSeries({ uuid }: { uuid: string }) {
  return request(`/series/${uuid}/instances`, {
    method: 'GET',
  });
}
