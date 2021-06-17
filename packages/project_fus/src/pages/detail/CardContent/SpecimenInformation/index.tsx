/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-03-26 15:31:17
 */

import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';

import SiTable from './components/SI_table';

import {
  FetchSpecimenInformation,
  DeleteSpecimenInformation,
  ModifySpecimenInformation,
} from './service';

interface SpecimenInformationContentProps {
  dispatch: Dispatch;
  sideEffect?: any;
  sideEffectLoading: boolean;
  pid: number;
  treNum: number;
}

const SpecimenInformationContent: React.FC<SpecimenInformationContentProps> = (props) => {
  const { pid, treNum, dispatch, sideEffect, sideEffectLoading } = props;

  return (
    <Spin spinning={false}>
      <SiTable
        fetchData={() => {
          return FetchSpecimenInformation({ pid });
        }}
        DeleteData={(ids: number[]) => {
          return DeleteSpecimenInformation({ pid, body: { ids } });
        }}
        AddData={(values: any) => {
          return ModifySpecimenInformation({ pid, body: values });
        }}
      />
    </Spin>
  );
};

const mapStateToProps = ({ loading }: { loading: { effects: { [key: string]: boolean } } }) => {
  return {
    sideEffectLoading: loading.effects['sideEffect/fetchSideEffect'],
  };
};

export default connect(mapStateToProps)(SpecimenInformationContent);
