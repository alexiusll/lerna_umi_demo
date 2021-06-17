import { getPidAndTreNum } from '@/utils/location';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { Dispatch, Loading } from 'umi';
import OtherExamContent from '../CardContent/OtherExam';
import LaboratoryExamContent from '../CardContent/LaboratoryExam';
import ImmunohistochemistryContent from '../CardContent/Immunohistochemistry';
import MolecularTestContent from '../CardContent/MolecularTest';
import TreatmentRecordContent from '../CardContent/TreatmentRecord';
import EfficacyEvaluationContent from '../CardContent/EfficacyEvaluation';
import SymptomSignsContent from '../CardContent/SymptomSigns';
import SideEffectsContent from '../CardContent/SideEffects';

interface TreatmentInfoProps {
  dispatch: Dispatch;
  loading: Loading;
  location: any;
}

const tabListNoTitle = [
  {
    key: 'TreatmentRecord',
    tab: '治疗记录',
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
    key: 'EfficacyEvaluationContent',
    tab: '疗效评估',
  },

  {
    key: 'SymptomSignsContent',
    tab: '症状体征',
  },

  {
    key: 'SideEffectsContent',
    tab: '副反应',
  },
];

const TreatmentInfoPage: React.FC<TreatmentInfoProps> = props => {
  const [key, setKey] = useState('TreatmentRecord');
  const [pid, setPid] = useState<number>(-404);
  const [treNum, setTreNum] = useState<number>(-404);

  // 地址发生变化时触发
  useEffect(() => {
    const { pid: _pid, treNum: _treNum } = getPidAndTreNum();
    console.log(`pid:${_pid} , treNum:${_treNum}`);
    setPid(_pid);
    setTreNum(_treNum);
    setKey('TreatmentRecord');
  }, [props.location]);

  const onTabChange = (card_key: string) => {
    setKey(card_key);
  };

  const contentListNoTitle = {
    OtherExamContent: <OtherExamContent pid={pid} treNum={treNum} />,
    LaboratoryExamContent: <LaboratoryExamContent pid={pid} treNum={treNum} />,
    ImmunohistochemistryContent: <ImmunohistochemistryContent pid={pid} treNum={treNum} />,
    MolecularTestContent: <MolecularTestContent pid={pid} treNum={treNum} />,
    TreatmentRecord: <TreatmentRecordContent pid={pid} treNum={treNum} />,
    EfficacyEvaluationContent: <EfficacyEvaluationContent pid={pid} treNum={treNum} />,
    SymptomSignsContent: <SymptomSignsContent pid={pid} treNum={treNum} />,
    SideEffectsContent: <SideEffectsContent pid={pid} treNum={treNum} />,
  };

  return (
    <>
      <Card
        tabList={tabListNoTitle}
        activeTabKey={key}
        onTabChange={card_key => {
          onTabChange(card_key);
        }}
      >
        {contentListNoTitle[key]}
      </Card>
    </>
  );
};

export default TreatmentInfoPage;
