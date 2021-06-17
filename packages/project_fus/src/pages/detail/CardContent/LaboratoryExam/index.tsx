/*
 * @Descripttion:
 * @Author: hlgdb
 * @Date: 2020-09-17 22:02:18
 */

// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useState } from 'react';
// import { connect, Dispatch } from 'umi';
// import { StateType } from './model';
import BasicTableContent from './table/BasicTable';
import {
  blood_routine_para,
  blood_chemistry_para,
  thyroid_para,
  blood_clotting_para,
  myocardial_enzyme_para,
  cytokines_para,
  lymphocytes_para,
  urine_routine_para,
  tumor_para,
} from './tablePara';

interface LaboratoryExamContentProps {
  // dispatch: Dispatch;
  pid: number;
  treNum: number;
}

const LaboratoryExamContent: React.FC<LaboratoryExamContentProps> = (props) => {
  const { pid, treNum } = props;

  const [current, setCurrent] = useState(0);

  const content = {
    0: <BasicTableContent pid={pid} treNum={treNum} title="血常规" para={blood_routine_para} />,
    1: <BasicTableContent pid={pid} treNum={treNum} title="血生化" para={blood_chemistry_para} />,
    2: <BasicTableContent pid={pid} treNum={treNum} title="甲状腺功能" para={thyroid_para} />,
    3: <BasicTableContent pid={pid} treNum={treNum} title="凝血功能" para={blood_clotting_para} />,
    4: (
      <BasicTableContent pid={pid} treNum={treNum} title="心肌酶谱" para={myocardial_enzyme_para} />
    ),
    5: <BasicTableContent pid={pid} treNum={treNum} title="细胞因子" para={cytokines_para} />,
    6: <BasicTableContent pid={pid} treNum={treNum} title="淋巴细胞亚群" para={lymphocytes_para} />,
    7: <BasicTableContent pid={pid} treNum={treNum} title="尿常规" para={urine_routine_para} />,
    8: <BasicTableContent pid={pid} treNum={treNum} title="肿瘤标志物" para={tumor_para} />,
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
            <a style={{ color: current === 0 ? '#61d2e8' : '#909090' }}>血常规</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(1);
            }}
          >
            <a style={{ color: current === 1 ? '#61d2e8' : '#909090' }}>血生化</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(2);
            }}
          >
            <a style={{ color: current === 2 ? '#61d2e8' : '#909090' }}>甲状腺</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(3);
            }}
          >
            <a style={{ color: current === 3 ? '#61d2e8' : '#909090' }}>凝血</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(4);
            }}
          >
            <a style={{ color: current === 4 ? '#61d2e8' : '#909090' }}>心肌酶谱</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(5);
            }}
          >
            <a style={{ color: current === 5 ? '#61d2e8' : '#909090' }}>细胞因子</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(6);
            }}
          >
            <a style={{ color: current === 6 ? '#61d2e8' : '#909090' }}>淋巴细胞亚群</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(7);
            }}
          >
            <a style={{ color: current === 7 ? '#61d2e8' : '#909090' }}>尿常规</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              setCurrent(8);
            }}
          >
            <a style={{ color: current === 8 ? '#61d2e8' : '#909090' }}>肿瘤标志物</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {content[current]}
    </>
  );
};

export default LaboratoryExamContent;
