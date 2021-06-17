/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-03-31 11:29:58
 */
import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/', //静态资源
  define: {
    // 前端地址
    RBAC_HREF: '/',
    FUS_HREF: '/fu',
    P1_HREF: '/p1',
    P2_HREF: '/p2',
    P3_HREF: '/p3',
    // api地址
    API_URL: 'http://27.17.30.150:40582', // 生产服务器API地址，本系统
    API_AUTH_URL: 'http://27.17.30.150:40581', // 生产服务器API地址,用户管理系统
    P2_API_URL: 'http://27.17.30.150:40583',
    P3_API_URL: 'http://27.17.30.150:40584',
  },
});
