/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2021-03-02 11:12:47
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

// 以下变量声明对应config.[env].ts文件内define的变量
declare const API_URL: string;
declare const API_AUTH_URL: string;
declare const API_SECRET_KEY: string;

// 避免ts文件中报错
// declare module 'vtk.js/*';
// declare module '@kitware/vtk.js/*';
declare module '@kitware/vtk.js/IO/Core/HttpDataSetReader';
declare module '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
declare module '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps';

declare module 'react-vtk-js';

declare module '@ohif/ui';

declare module '@ohif/viewer';

declare module 'cornerstone-core';
declare module 'cornerstone-tools';
declare module 'cornerstone-web-image-loader';
declare module 'cornerstone-wado-image-loader';
declare module 'hammerjs';
declare module 'cornerstone-math';

declare module 'react-grid-layout';
declare module 'lodash';

declare module 'react-cornerstone-viewport';

declare module 'dicomweb-client';

declare module 'itk/*';
