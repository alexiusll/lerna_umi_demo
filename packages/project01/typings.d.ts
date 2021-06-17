/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-02-06 21:59:53
 */
declare module '*.css';
declare module '*.js';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare module '@/utils/request';

// 以下变量声明对应config.[env].ts文件内define的变量
declare const FUS_HREF: string;
declare const RBAC_HREF: string;

declare const P1_HREF: string;
declare const P2_HREF: string;
declare const P3_HREF: string;

declare const API_URL: string;
declare const API_AUTH_URL: string;
declare const P2_API_URL: string;
declare const P3_API_URL: string;
