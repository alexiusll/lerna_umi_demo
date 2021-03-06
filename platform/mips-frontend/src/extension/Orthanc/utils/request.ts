/*
 * @Descripttion: request 网络请求工具
 * @Author: linkenzone
 * @Date: 2021-06-01 15:00:19
 * @Descripttion: Do not edit
 */

import { extend } from 'umi-request';
import type { ResponseError } from 'umi-request';
import { notification, message } from 'antd';
import Cookies from 'js-cookie';
import config from '../config/config';

// #region 设置
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
});

function custom_request<T>(url: string, { method = 'GET', params = {}, data = {} }) {
  const prefix = config.API_URL;

  return new Promise((resolve) => {
    request<T>(prefix + url, {
      method,
      params,
      data,
      credentials: 'omit',
      // headers: {
      //   'Content-Type': 'application/json',
      //   // Authorization: `Bearer ${Cookies.get('token')}`,
      // },
    }).then((res) => {
      if (res) {
        resolve(res);
      }
      resolve(null); // 错误不能reject 会导致generator call函数出错
    });
  });
}

export default custom_request;
