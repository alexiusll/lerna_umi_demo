/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-03-31 11:29:58
 */
import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/fu/', //静态资源

  define: {
    RBAC_URL: '/#/applications',
    API_URL: 'http://27.17.30.150:40585', // 生产服务器API地址，本系统
    API_AUTH_URL: 'http://27.17.30.150:40581', // 生产服务器API地址,用户管理系统
    API_SECRET_KEY: 'XXXXXXXXXXXXXXXX', // API调用密钥
  },
});
