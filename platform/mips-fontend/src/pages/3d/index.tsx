/*
 * @Author: linkenzone
 * @Date: 2021-06-08 21:47:27
 * @Descripttion: Do not edit
 */
import { Button, Result } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';

import VolumeDemo from './VolumeDemo';
import SurfaceDemo from './SurfaceDemo';
import SliceDemo from './SliceDemo';
import VTKBasicExample from './basic';
import VTKFusionExample from './volume';

const Page: React.FC<{}> = () => {
  const [curCom, setCurCom] = useState('VTKBasicExample');

  const comList = {
    VolumeDemo: <VolumeDemo />,
    SurfaceDemo: <SurfaceDemo />,
    SliceDemo: <SliceDemo />,
    VTKBasicExample: <VTKBasicExample />,
    VTKFusionExample: <VTKFusionExample />,
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setCurCom('VolumeDemo');
        }}
      >
        VolumeDemo
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setCurCom('SurfaceDemo');
        }}
      >
        SurfaceDemo
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setCurCom('SliceDemo');
        }}
      >
        SliceDemo
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setCurCom('VTKBasicExample');
        }}
      >
        VTKBasicExample
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setCurCom('VTKFusionExample');
        }}
      >
        VTKFusionExample
      </Button>

      <div style={{ margin: '24px', padding: '12px', border: '1px #dedede solid' }}>
        {comList[curCom]}
      </div>
    </>
  );
};

export default Page;
