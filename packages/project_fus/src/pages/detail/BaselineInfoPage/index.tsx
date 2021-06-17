import { getPid } from '@/utils/location';
import { Card, DatePicker, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch, Loading } from 'umi';
import PastMedicalHistory from '../CardContent/PastMedicalHistory';
import BaseInfoContent from '../CardContent/BaseInfo';
import OtherExamContent from '../CardContent/OtherExam';
import LaboratoryExamContent from '../CardContent/LaboratoryExam';
import ImmunohistochemistryContent from '../CardContent/Immunohistochemistry';
import FirstVisitContent from '../CardContent/FirstVisit';
import MolecularTestContent from '../CardContent/MolecularTest';
import SpecimenInformation from '../CardContent/SpecimenInformation';

interface BaseInfoProps {
  dispatch: Dispatch;
  loading: Loading;
  location: any;
}

const tabListNoTitle = [
  {
    key: 'BaseInfo',
    tab: '基本信息',
  },

  {
    key: 'PastMedicalHistory',
    tab: '既往史',
  },

  {
    key: 'FirstVisit',
    tab: '初诊过程',
  },

  {
    key: 'LaboratoryExamContent',
    tab: '实验室检查',
  },

  {
    key: 'OtherExamContent',
    tab: '其它检查',
  },

  {
    key: 'ImmunohistochemistryContent',
    tab: '免疫组化',
  },

  {
    key: 'MolecularTestContent',
    tab: '分子检测',
  },

  {
    key: 'SpecimenInformation',
    tab: '标本信息',
  },
];

const BaseInfoPage: React.FC<BaseInfoProps> = (props) => {
  const [key, setKey] = useState('BaseInfo');
  const [pid, setPid] = useState<number>(-404);

  // 地址发生变化时触发
  useEffect(() => {
    setPid(getPid());
  }, [props.location]);

  const onTabChange = (card_key: string) => {
    setKey(card_key);
  };

  const contentListNoTitle = {
    BaseInfo: <BaseInfoContent pid={pid} />,
    PastMedicalHistory: <PastMedicalHistory pid={pid} />,
    OtherExamContent: <OtherExamContent pid={pid} treNum={0} />,
    LaboratoryExamContent: <LaboratoryExamContent pid={pid} treNum={0} />,
    ImmunohistochemistryContent: <ImmunohistochemistryContent pid={pid} treNum={0} />,
    FirstVisit: <FirstVisitContent pid={pid} />,
    MolecularTestContent: <MolecularTestContent pid={pid} treNum={0} />,
    SpecimenInformation: <SpecimenInformation pid={pid} treNum={0} />,
  };

  return (
    <>
      <Card
        tabList={tabListNoTitle}
        activeTabKey={key}
        onTabChange={(card_key) => {
          onTabChange(card_key);
        }}
        // style={{ width: '100%' }}
        // className={style.custom_card_body}
      >
        {contentListNoTitle[key]}
      </Card>
    </>
  );
};

export default BaseInfoPage;
