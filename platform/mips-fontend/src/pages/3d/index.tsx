/*
 * @Author: linkenzone
 * @Date: 2021-06-08 21:47:27
 * @Descripttion: Do not edit
 */
import { Button, Result, Select } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';

import VolumeDemo from './VolumeDemo';
import SurfaceDemo from './SurfaceDemo';
import SliceDemo from './SliceDemo';
import VTKBasicExample from './basic';
import VTKVolumeExample from './volume';
import BaseVtkDemo from './BaseVtkDemo';
import FiltersDemo from './FiltersDemo';
import VtkVolumeSlice from './VtkVolumeSlice';
import VtkProxyManager from './vtkProxyManager';
import VtkViewDemo from './vtkViewDemo';

const { Option } = Select;

const Page: React.FC<{}> = () => {
  const [curCom, setCurCom] = useState('BaseVtkDemo');

  const comList = {
    VolumeDemo: <VolumeDemo />,
    SurfaceDemo: <SurfaceDemo />,
    SliceDemo: <SliceDemo />,
    VTKBasicExample: <VTKBasicExample />,
    VTKVolumeExample: <VTKVolumeExample />,
    BaseVtkDemo: <BaseVtkDemo />,
    FiltersDemo: <FiltersDemo />,
    VtkVolumeSlice: <VtkVolumeSlice />,
    VtkProxyManager: <VtkProxyManager />,
    vtkViewDemo: <VtkViewDemo />,
  };

  return (
    <>
      <Select
        defaultValue="BaseVtkDemo"
        style={{ width: 480 }}
        onChange={(e) => {
          setCurCom(e);
        }}
      >
        <Option value="VolumeDemo">VolumeDemo</Option>
        <Option value="SurfaceDemo">SurfaceDemo</Option>
        <Option value="SliceDemo">SliceDemo</Option>
        <Option value="VTKBasicExample">VTKBasicExample</Option>
        <Option value="VTKVolumeExample">VTKVolumeExample</Option>
        <Option value="BaseVtkDemo">BaseVtkDemo</Option>
        <Option value="FiltersDemo">FiltersDemo</Option>
        <Option value="VtkVolumeSlice">VtkVolumeSlice</Option>
        <Option value="VtkProxyManager">VtkProxyManager</Option>
        <Option value="vtkViewDemo">vtkViewDemo</Option>
      </Select>

      <div style={{ margin: '24px', padding: '12px', border: '1px #dedede solid' }}>
        {comList[curCom]}
      </div>
    </>
  );
};

export default Page;
