/*
 * @Descripttion: 路由配置
 * @Author: linkenzone
 * @Date: 2020-09-04 00:20:59
 * 路由配置 : https://umijs.org/zh-CN/docs/routing
 */

export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: '../pages/Login/index',
  },
  {
    path: '/',
    component: '../layouts/GlobalRouter',
    routes: [
      {
        path: '/',
        component: '../layouts/PageHeader',
        routes: [
          {
            path: '/project',
            component: '../pages/ProjectList/index',
          },
          {
            path: '/applications',
            component: '../pages/ApplicationsList/index',
          },
          {
            path: '/auth',
            component: '../pages/Auth/index',
          },
        ],
      },
    ],
  },
];
