/*
 * @Author: linkenzone
 * @Date: 2021-05-29 14:50:05
 * @Descripttion: Do not edit
 */
import React from 'react';
import PropTypes from 'prop-types';
import CookieUtil from '@/utils/cookie';
// import router from 'umi/router'
import { history } from 'umi';

// 全局路由管理
const GlobalRouter = (props) => {
  if (!CookieUtil.get('token')) {
    history.replace('/login');
    return null;
  }
  return <>{props.children}</>;
};

GlobalRouter.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default GlobalRouter;
