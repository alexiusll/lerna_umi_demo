/*
 * @Author: linkenzone
 * @Date: 2021-06-08 18:54:24
 * @Descripttion: Do not edit
 */
import request from '../utils/request';

/**
 * @description: 获取 studies 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchStudies({ uuid }: { uuid: string }) {
  return request(`/studies/${uuid}`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 studies 下的 series 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchSeriesOfStudies({ uuid }: { uuid: string }) {
  return request(`/studies/${uuid}/series`, {
    method: 'GET',
  });
}
