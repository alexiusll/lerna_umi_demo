/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-16 19:50:03
 */

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, DatePicker, Spin, Breadcrumb, PageHeader, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import LungFunctionContent from './form/LungFunction';
import OtherExamsContent from './form/OtherExam';
import ImageExamContent from './table/ImageExam';

interface OtherExamContentProps {
  // dispatch: Dispatch;
  pid: number;
  treNum: number;
}

const OtherExamContent: React.FC<OtherExamContentProps> = props => {
  const { pid, treNum } = props;

  const [current, setCurrent] = useState(0);

  const content = {
    0: <LungFunctionContent pid={pid} treNum={treNum} />,
    1: <OtherExamsContent pid={pid} treNum={treNum} />,
    2: <ImageExamContent pid={pid} treNum={treNum} />,
  };

  return (
    <>
      <div style={{ border: '1px solid #ebedf0', padding: '1rem', marginBottom: '1rem' }}>
        <Breadcrumb style={{ fontSize: '14px', fontWeight: 'bold' }}>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(0);
            }}
          >
            <a style={{ color: current === 0 ? '#61d2e8' : '#909090' }}>肺功能</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(1);
            }}
          >
            <a style={{ color: current === 1 ? '#61d2e8' : '#909090' }}>其他检查</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(2);
            }}
          >
            <a style={{ color: current === 2 ? '#61d2e8' : '#909090' }}>影像学检查</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <div style={{ border: '1px solid #ebedf0' }}>{content[current]}</div> */}
      {content[current]}
    </>
  );
};

// const mapStateToProps = ({ loading }: { loading: { effects: { [key: string]: boolean } } }) => {
//   return {
//     patientInfo: patient.patientInfo,
//     patientInfoLoading: loading.effects['patient/fetchPatient'],
//   };
// };

export default OtherExamContent;
