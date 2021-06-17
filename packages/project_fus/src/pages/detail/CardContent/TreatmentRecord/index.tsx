/*
 * @Descripttion: 治疗记录内容
 * @Author: linkenzone
 * @Date: 2020-09-23 20:11:33
 */
/* eslint-disable react/jsx-boolean-value */

import {
  Alert,
  AutoComplete,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import PatDiaFormItem from '@/components/patDiaTree';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getMultipleChoiceGet, getMultipleChoicePost } from '@/utils/util';
import type { StateType } from './model';
import { ModifyTherapyPlan } from './service';
import type { TreatmentRecordDataType, TherapyPlanDataType } from './data';

const { Option } = Select;
const { TextArea } = Input;

type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface TreatmentRecordContentProps {
  dispatch: Dispatch;
  treatmentRecord?: TreatmentRecordDataType;
  treatmentRecordLoading: boolean;
  therapyPlan?: TherapyPlanDataType;
  therapyPlanLoading: boolean;
  pid: number;
  treNum: number;
}

const formItemLayout = {
  labelCol: { xl: { span: 4 }, md: { span: 6 } },
  wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
};

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

// const formItemLayoutNoLable = {
//   wrapperCol: {
//     xl: { span: 18, offset: 4 },
//     md: { span: 18, offset: 6 },
//     sm: { span: 18, offset: 0 },
//     xs: { span: 18, offset: 0 },
//   },
// };

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 4 }, md: { span: 6, offset: 6 } },
};

// const commonDrugs = [
//   {
//     value: '紫杉醇',
//   },
//   {
//     value: '白蛋白紫杉醇',
//   },
//   {
//     value: '伊立替康',
//   },
//   {
//     value: '托泊替康',
//   },
//   {
//     value: '铂类药物',
//   },
//   {
//     value: '其他',
//   },
// ];

const treat_schedule_options = {
  Chemotherapy: [
    { value: 'EP方案（依托泊苷+奈达铂/顺铂/卡铂）' },
    { value: 'GP方案（吉西他滨+奈达铂/顺铂/卡铂）' },
    { value: 'DP方案（多西他赛+奈达铂/顺铂/卡铂）' },
    { value: 'TP方案（紫杉醇+奈达铂/顺铂/卡铂）' },
    { value: 'NP方案（长春瑞滨+奈达铂/顺铂/卡铂）' },
    { value: 'PP方案（培美曲塞+奈达铂/顺铂/卡铂）' },
  ],
};

const treat_schedule_medicine_options = {
  Chemotherapy: {
    'EP方案（依托泊苷+奈达铂/顺铂/卡铂）': [
      { value: '依托泊苷' },
      { value: '奈达铂' },
      { value: '顺铂' },
      { value: '卡铂' },
    ],
    'GP方案（吉西他滨+奈达铂/顺铂/卡铂）': [
      { value: '吉西他滨' },
      { value: '奈达铂' },
      { value: '顺铂' },
      { value: '卡铂' },
    ],
    'DP方案（多西他赛+奈达铂/顺铂/卡铂）': [
      { value: '多西他赛' },
      { value: '奈达铂/顺铂/卡铂' },
      { value: '顺铂' },
      { value: '卡铂' },
    ],
    'TP方案（紫杉醇+奈达铂/顺铂/卡铂）': [
      { value: '紫杉醇' },
      { value: '奈达铂' },
      { value: '顺铂' },
      { value: '卡铂' },
    ],
    'NP方案（长春瑞滨+奈达铂/顺铂/卡铂）': [
      { value: '长春瑞滨' },
      { value: '奈达铂' },
      { value: '顺铂' },
      { value: '卡铂' },
    ],
    'PP方案（培美曲塞+奈达铂/顺铂/卡铂）': [
      { value: '培美曲塞' },
      { value: '奈达铂' },
      { value: '顺铂' },
      { value: '卡铂' },
    ],
    commonDrugs: [],
    // 'commonDrugs': [
    //   { value: '紫杉醇' },
    //   { value: '白蛋白紫杉醇' },
    //   { value: '伊立替康' },
    //   { value: '托泊替康' },
    //   { value: '铂类药物' },
    //   { value: '其他' },
    // ],
  },
  TargetedTherapy: {
    commonDrugs: [
      { value: '吉非替尼' },
      { value: '厄洛替尼' },
      { value: '埃克替尼' },
      { value: '阿法替尼' },
      { value: '克唑替尼' },
      { value: '奥希替尼' },
      { value: '曲妥珠单抗' },
      { value: '拉帕替尼' },
      { value: '贝伐单抗' },
      { value: '依维莫司' },
      { value: '尼妥珠单抗' },
      { value: '帕妥珠单抗' },
      { value: 'TDM1' },
      { value: '不详' },
    ],
  },
  ImmunityTherapy: {
    commonDrugs: [{ value: '纳武单抗' }, { value: '帕博利珠单抗' }],
  },
  AntivascularTherapy: {
    commonDrugs: [
      { value: '重组人血管内皮抑素' },
      { value: '贝伐珠单抗' },
      { value: '安罗替尼' },
      { value: '阿帕替尼' },
    ],
  },
};

const TreatmentRecordContent: React.FC<TreatmentRecordContentProps> = (props) => {
  // #region 初始化变量
  const {
    treatmentRecordLoading,
    treatmentRecord,
    therapyPlan,
    therapyPlanLoading,
    pid,
    dispatch,
    treNum,
  } = props;
  // form
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [recordId, setRecordId] = useState<number | undefined>(undefined);
  const [trement, setTrement] = useState<string>('');
  const [recordChildId, setRecordChildId] = useState<number | undefined>(undefined);
  const [isTre, setIsTre] = useState<number | undefined>(undefined);
  // 化疗
  const [chemotherapy, setChemotherapy] = useState<boolean | undefined>(undefined);
  // 靶向治疗
  const [targetedtherapy, setTargetedtherapy] = useState<boolean | undefined>(undefined);
  // 免疫治疗
  const [immunotherapy, setImmunotherapy] = useState<boolean | undefined>(undefined);
  // 抗血管治疗
  const [antivasculartherapy, setaAntivasculartherapy] = useState<boolean | undefined>(undefined);
  // 其他治疗
  const [othertherapy, setOthertherapy] = useState<boolean | undefined>(undefined);
  // 是否重复活检
  const [isRepBio, setIsRepBio] = useState<boolean | undefined>(undefined);
  // 病理诊断其他
  const [patDiaOthers, setPatDiaOthers] = useState<boolean | undefined>(undefined);

  // 手术范围
  const [surScoOther, setSurScoOther] = useState<boolean>(false);
  // 术后辅助化疗
  const [posAdjChem, setPosAdjChem] = useState<boolean | undefined>(undefined);
  // 是否进展
  const [isPro, setIsPro] = useState<boolean | undefined>(undefined);

  // 放疗部位
  const [radSiteOther, setRadSiteOther] = useState<boolean>(false);

  // 活检方式
  const [bioMetOther, setBioMetOther] = useState<boolean>(false);

  const [currPeriodstart, setCurrPeriod_start] = useState<null | number>(null);
  const [currPeriodend, setCurrPeriod_end] = useState<null | number>(null);

  // table 相关
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>({});
  const [currentRecordType, setCurrentRecordType] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [treSche, setTreSche] = useState('');

  // #endregion

  const table_columns = [
    {
      title: '治疗名称',
      dataIndex: 'treatName',
      ellipsis: true,
    },
    {
      title: '周期',
      dataIndex: 'currPeriod',
      responsive: ['md'] as Breakpoint[],
    },
    {
      title: '药物方案',
      dataIndex: 'treSche',
      responsive: ['md'] as Breakpoint[],
      // ellipsis: true,
    },
    {
      title: '药物',
      dataIndex: 'drugs',
      responsive: ['md'] as Breakpoint[],
      // ellipsis: true,
      render: (text: any, record: any) => {
        return record.drugs
          ? record.drugs.map((item: any, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={index} style={{ marginBottom: '4px' }}>
                {item.name}:{item.dose}
              </p>
            ))
          : '';
      },
    },
    {
      title: '给药/治疗开始日期',
      dataIndex: 'begDate',
      responsive: ['lg'] as Breakpoint[],
    },
    {
      title: '给药/治疗结束日期',
      dataIndex: 'endDate',
      responsive: ['lg'] as Breakpoint[],
    },
    {
      title: '备注',
      dataIndex: 'note',
      responsive: ['lg'] as Breakpoint[],
    },
    {
      title: '操作',
      width: 140,
      render: (text: any, record: any) => (
        <Space size="small">
          <a
            className="custom_toolbar_buttom"
            onClick={() => {
              setModalVisible(true);
              setCurrentRecord({ ...record });
              setCurrentRecordType(record.treSolu);
              setTreSche(record.treSche);
              console.log('record', record);

              setCurrPeriod_start(record.currPeriod);
              setCurrPeriod_end(record.currPeriod);
              modalForm.setFieldsValue({
                ...record,
                begDate: record.begDate ? moment(record.begDate) : undefined,
                endDate: record.endDate ? moment(record.endDate) : undefined,
                currPeriod_start: record.currPeriod ? record.currPeriod : undefined,
                currPeriod_end: record.currPeriod ? record.currPeriod : undefined,
                // drugs: record.drugs ? record.drugs.split(',') : undefined,
              });
            }}
          >
            查看
          </a>
          <Popconfirm
            title="确认要删除这一条记录?"
            onConfirm={() => {
              dispatch({
                type: 'treatmentRecord/deleteTherapyPlan',
                payload: { pid, treNum, body: { ids: [record.id] } },
              }).then(() => {
                dispatch({
                  type: 'treatmentRecord/fetchTherapyPlan',
                  payload: { pid, treNum },
                });
              });
            }}
            okText="是"
            cancelText="否"
          >
            <a className="custom_toolbar_buttom_danger">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /**
   * @description: 重复活检的表达内容
   * @Param:
   */

  const RepBioFormContent = () => {
    return (
      <>
        <Form.Item label="活检方式" name={['bioMet', 'radio']}>
          <Checkbox.Group>
            <Checkbox value="手术" style={{ lineHeight: '32px' }}>
              手术
            </Checkbox>
            <Checkbox value="纵隔镜" style={{ lineHeight: '32px' }}>
              纵隔镜
            </Checkbox>
            <Checkbox value="胸腔镜" style={{ lineHeight: '32px' }}>
              胸腔镜
            </Checkbox>
            <Checkbox value="肺穿刺" style={{ lineHeight: '32px' }}>
              肺穿刺
            </Checkbox>
            <Checkbox value="纤支镜" style={{ lineHeight: '32px' }}>
              纤支镜
            </Checkbox>
            <Checkbox value="EBUS" style={{ lineHeight: '32px' }}>
              EBUS
            </Checkbox>
            <Checkbox value="EUS" style={{ lineHeight: '32px' }}>
              EUS
            </Checkbox>
            <Checkbox value="淋巴结活检" style={{ lineHeight: '32px' }}>
              淋巴结活检
            </Checkbox>
            <Checkbox
              value="其他"
              style={{ lineHeight: '32px' }}
              onChange={(e) => {
                setBioMetOther(e.target.checked);
              }}
            >
              其他
              {bioMetOther ? (
                <Form.Item name={['bioMet', 'other']} noStyle>
                  <Input
                    style={{ display: 'inline-block', marginLeft: 10, width: 240 }}
                    placeholder="输入其他"
                  />
                </Form.Item>
              ) : (
                false
              )}
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="取材部位" name="matPart">
          <Input placeholder="请输入取材部位" />
        </Form.Item>

        <Form.Item label="标本库流水号" name="specNum">
          {/* <InputNumber placeholder="请输入标本库流水号" style={{ width: '160px' }} /> */}
          <Input placeholder="请输入标本库流水号" />
        </Form.Item>

        <PatDiaFormItem form={form} setPatDiaOthers={setPatDiaOthers} name="patDia" />

        {patDiaOthers ? (
          <Form.Item label="其他(病理)" name={['patDia', 'other']}>
            <Input />
          </Form.Item>
        ) : null}
      </>
    );
  };

  const treatmentRecordTable = (dataSource: any, columns: any, type: string, label: string) => {
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ marginBottom: '24px' }}
        loading={therapyPlanLoading}
        title={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'block' }}>{label}</span>
            <Button
              type="primary"
              onClick={() => {
                setModalVisible(true);
                setCurrentRecordType(type);
                console.log('record.type', type);
                setCurrentRecord({ id: null });
                modalForm.resetFields();
                // 重置
                setCurrPeriod_end(null);
                setCurrPeriod_start(null);
              }}
            >
              新增
            </Button>
          </div>
        )}
        bordered
        rowKey="id"
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      />
    );
  };

  useEffect(() => {
    if (pid !== -404) {
      dispatch({
        type: 'treatmentRecord/fetchTherapyRecord',
        payload: { pid, treNum },
      });

      dispatch({
        type: 'treatmentRecord/fetchTherapyPlan',
        payload: { pid, treNum },
      });
    }
    // 销毁的时候
    return () => {};
  }, [treNum]);

  const resetPage = () => {
    form.resetFields();
    // 重置child id
    setRecordChildId(undefined);
    setTrement('');
    // 1
    setIsTre(0);
    setChemotherapy(false);
    setTargetedtherapy(false);
    setImmunotherapy(false);
    setaAntivasculartherapy(false);
    setOthertherapy(false);
    setIsRepBio(false);
    setPatDiaOthers(false);

    // 2
    setSurScoOther(false);
    setPosAdjChem(false);
    setIsPro(false);

    // 活检
    setBioMetOther(false);
  };

  useEffect(() => {
    console.log('useEffect treatmentRecord', treatmentRecord);

    // 重置child id
    setRecordChildId(undefined);

    localStorage.trement = treatmentRecord?.parent.trement;
    setRecordId(treatmentRecord?.parent.id);
    setTrement(treatmentRecord?.parent.trement ? treatmentRecord?.parent.trement : '');
    if (treatmentRecord) {
      let child;
      if (treatmentRecord.parent.trement === 'surgery' && treatmentRecord.childTwo) {
        child = { ...treatmentRecord.childTwo };
        setRecordChildId(treatmentRecord.childTwo.id);
        setIsPro(treatmentRecord.childTwo.isPro);
        // 手术

        treatmentRecord.childTwo.surSco = getMultipleChoiceGet({
          multipleChoice: treatmentRecord.childTwo.surSco,
          setOther: setSurScoOther,
        });

        treatmentRecord.childTwo.lymDis = getMultipleChoiceGet({
          multipleChoice: treatmentRecord.childTwo.lymDis,
        });

        child.surDate = treatmentRecord.childTwo.surDate
          ? moment(treatmentRecord.childTwo.surDate)
          : null;
        setPosAdjChem(treatmentRecord.childTwo.posAdjChem);
        child.proDate = treatmentRecord.childTwo.proDate
          ? moment(treatmentRecord.childTwo.proDate)
          : null;
        // 是否重复活检
        setIsRepBio(treatmentRecord.childTwo.isRepBio);
        treatmentRecord.childTwo.bioMet = getMultipleChoiceGet({
          multipleChoice: treatmentRecord.childTwo.bioMet,
          setOther: setBioMetOther,
        });

        setPatDiaOthers(false);
        if (child.patDia) {
          if (child.patDia.radio) {
            for (const item of child.patDia.radio) {
              if (item === '0-5') {
                setPatDiaOthers(true);
              }
            }
          }
        }
      } else if (treatmentRecord.parent.trement === 'radiotherapy' && treatmentRecord.childThree) {
        child = { ...treatmentRecord.childThree };
        setRecordChildId(treatmentRecord.childThree.id);
        child.begDate = treatmentRecord.childThree.begDate
          ? moment(treatmentRecord.childThree.begDate)
          : null;
        child.endDate = treatmentRecord.childThree.endDate
          ? moment(treatmentRecord.childThree.endDate)
          : null;

        treatmentRecord.childThree.radSite = getMultipleChoiceGet({
          multipleChoice: treatmentRecord.childThree.radSite,
          setOther: setRadSiteOther,
        });

        if (typeof treatmentRecord.childThree.dosUnit === 'boolean') {
          child.dosUnit = treatmentRecord.childThree.dosUnit ? 1 : 0;
        }
        // 是否重复活检
        setIsRepBio(treatmentRecord.childThree.isRepBio);
        treatmentRecord.childThree.bioMet = getMultipleChoiceGet({
          multipleChoice: treatmentRecord.childThree.bioMet,
          setOther: setBioMetOther,
        });

        setPatDiaOthers(false);
        if (child.patDia) {
          if (child.patDia.radio) {
            for (const item of child.patDia.radio) {
              if (item === '0-5') {
                setPatDiaOthers(true);
              }
            }
          }
        }
      } else if (treatmentRecord.childOne) {
        child = { ...treatmentRecord.childOne };
        setIsTre(treatmentRecord.childOne.isTre);
        setRecordChildId(treatmentRecord.childOne.id);
        const { treSolu } = treatmentRecord.childOne;
        // 首先清空状态
        setChemotherapy(false);
        setTargetedtherapy(false);
        setImmunotherapy(false);
        setaAntivasculartherapy(false);
        setOthertherapy(false);
        if (treSolu) {
          if (treSolu.search(/Chemotherapy/) !== -1) setChemotherapy(true);
          if (treSolu.search(/TargetedTherapy/) !== -1) setTargetedtherapy(true);
          if (treSolu.search(/ImmunityTherapy/) !== -1) setImmunotherapy(true);
          if (treSolu.search(/AntivascularTherapy/) !== -1) setaAntivasculartherapy(true);
          if (treSolu.search(/Other/) !== -1) setOthertherapy(true);
        }
        child.begDate = treatmentRecord.childOne.begDate
          ? moment(treatmentRecord.childOne.begDate)
          : null;
        child.endDate = treatmentRecord.childOne.endDate
          ? moment(treatmentRecord.childOne.endDate)
          : null;

        // 是否重复活检
        setIsRepBio(treatmentRecord.childOne.isRepBio);
        treatmentRecord.childOne.bioMet = getMultipleChoiceGet({
          multipleChoice: treatmentRecord.childOne.bioMet,
          setOther: setBioMetOther,
        });

        setPatDiaOthers(false);
        if (child.patDia) {
          if (child.patDia.radio) {
            for (const item of child.patDia.radio) {
              if (item === '0-5') {
                setPatDiaOthers(true);
              }
            }
          }
        }
      } else {
        resetPage();
        setTrement(treatmentRecord?.parent.trement ? treatmentRecord?.parent.trement : '');
        form.setFieldsValue({
          trement: treatmentRecord.parent.trement,
        });
        return;
      }
      form.setFieldsValue({
        ...child,
        trement: treatmentRecord.parent.trement,
      });
    } else {
      resetPage();
    }
  }, [treatmentRecord]);

  useEffect(() => {
    if (therapyPlan) {
      console.log('therapyPlan', therapyPlan);
    }
  }, [therapyPlan]);

  const onFinish = (values: any) => {
    const parent = { id: recordId, trement };
    delete values.trement;
    const child = { ...values, id: recordChildId };

    if (trement === 'surgery') {
      child.surSco = getMultipleChoicePost({ multipleChoice: child.surSco, other: surScoOther });
      child.lymDis = getMultipleChoicePost({ multipleChoice: child.lymDis });
      child.surDate = values.surDate ? values.surDate.format('YYYY-MM-DD') : null;
      child.proDate = values.proDate ? values.proDate.format('YYYY-MM-DD') : null;
    } else if (trement === 'radiotherapy') {
      // 转换时间
      child.begDate = values.begDate ? values.begDate.format('YYYY-MM-DD') : null;
      child.endDate = values.endDate ? values.endDate.format('YYYY-MM-DD') : null;
      child.radSite = getMultipleChoicePost({ multipleChoice: child.radSite, other: radSiteOther });
      if (typeof child.dosUnit === 'number') {
        child.dosUnit = !!child.dosUnit;
      }
    } else {
      const treSolu = [];
      if (chemotherapy) treSolu.push('Chemotherapy');
      if (targetedtherapy) treSolu.push('TargetedTherapy');
      if (immunotherapy) treSolu.push('ImmunityTherapy');
      if (antivasculartherapy) treSolu.push('AntivascularTherapy');
      if (othertherapy) treSolu.push('Other');
      child.treSolu = treSolu.toString();
      // 转换时间
      child.begDate = values.begDate ? values.begDate.format('YYYY-MM-DD') : null;
      child.endDate = values.endDate ? values.endDate.format('YYYY-MM-DD') : null;
    }

    // 处理是否活检
    if (isRepBio) {
      child.bioMet = getMultipleChoicePost({ multipleChoice: values.bioMet, other: bioMetOther });
      if (child.patDia) {
        child.patDia.radio = values.patDia.radio ? values.patDia.radio : [];
        child.patDia.other = values.patDia.other ? values.patDia.other : null;
      }
    } else {
      // 如果选了否，把数据全部清除
      // child.patDia = { radio: [], other: null };
      child.patDia = null;
      child.bioMet = null;
      child.matPart = null;
      child.specNum = null;
    }

    values = { parent, child };
    console.log('values', values);

    dispatch({
      type: 'treatmentRecord/modifyTherapyRecord',
      payload: { pid, treNum, body: values },
    });

    // .then(() => {
    //   dispatch({
    //     type: 'treatmentRecord/fetchTherapyRecord',
    //     payload: { pid, treNum },
    //   });
    // });
  };

  /**
   * @description: 模态框 表达提交
   * @Param:
   */
  const onModalFinish = async (values: any) => {
    setConfirmLoading(true);
    console.log('values', values);

    let currPeriod_start;
    let currPeriod_end;

    if (currentRecord.id ?? false) {
      values.id = currentRecord.id;
      currPeriod_start = currPeriodstart;
      currPeriod_end = currPeriodend;
    } else {
      currPeriod_start = values?.currPeriod_start;
      currPeriod_end = values?.currPeriod_end;
      delete values.currPeriod_start;
      delete values.currPeriod_end;
    }

    if (currPeriod_start === undefined || currPeriod_start === null) {
      message.error('必须输入起始周期,保存详细治疗方案失败！');
      setConfirmLoading(false);
      return;
    }

    if (currPeriod_end !== undefined && currPeriod_end !== null) {
      if (currPeriod_start > currPeriod_end) {
        message.error('起始周期必须小于结束周期,保存详细治疗方案失败！');
        setConfirmLoading(false);
        return;
      }
    } else {
      currPeriod_end = currPeriod_start;
    }

    values.begDate = values.begDate ? values.begDate.format('YYYY-MM-DD') : null;
    values.endDate = values.endDate ? values.endDate.format('YYYY-MM-DD') : null;
    // values.drugs = values.drugs ? values.drugs.toString() : undefined;
    values.treSolu = currentRecordType;

    // eslint-disable-next-line no-plusplus
    for (let i = currPeriod_start; i <= currPeriod_end; i++) {
      values.currPeriod = i;
      // eslint-disable-next-line no-await-in-loop
      const res = await ModifyTherapyPlan({ pid, treNum, body: values });
      if (!res) {
        setConfirmLoading(false);
        message.error('保存详细治疗方案失败！');
        return;
      }
    }

    setModalVisible(false);
    setConfirmLoading(false);
    message.success('保存详细治疗方案成功！');
    dispatch({
      type: 'treatmentRecord/fetchTherapyPlan',
      payload: { pid, treNum },
    });
  };

  return (
    <>
      <Spin spinning={treatmentRecordLoading}>
        <Form form={form} labelAlign="left" onFinish={onFinish} {...formItemLayout}>
          <Form.Item label="几线治疗">
            <Select
              value={trement}
              style={{ width: 120 }}
              onChange={(value) => {
                // setTrement(value.toString());
                dispatch({
                  type: 'treatmentRecord/switchTrement',
                  payload: {
                    pid,
                    treNum,
                    body: {
                      child: {},
                      // parent: { trement: value.toString() },
                      parent: { id: recordId, trement: value.toString() },
                    },
                  },
                }).then(() => {
                  dispatch({
                    type: 'treatmentRecord/fetchTherapyRecord',
                    payload: { pid, treNum },
                  });
                });
              }}
            >
              <Option value="one">1线</Option>
              <Option value="two">2线</Option>
              <Option value="three">3线</Option>
              <Option value="four">4线</Option>
              <Option value="five">5线</Option>
              <Option value="surgery">手术</Option>
              <Option value="radiotherapy">放疗</Option>
              <Option value="other">其他</Option>
            </Select>

            {/* <Button
              type="primary"
              style={{ marginLeft: '12px' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置表单
            </Button> */}
          </Form.Item>

          <Divider />

          {['one', 'two', 'three', 'four', 'five', 'other'].indexOf(trement || '') !== -1 ? (
            <>
              <Form.Item name="isTre" label="加入临床治疗">
                <Radio.Group
                  onChange={(v) => {
                    setIsTre(v.target.value);
                  }}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                  <Radio value={-1}>不详</Radio>
                </Radio.Group>
              </Form.Item>

              {isTre === 1 ? (
                <Form.Item label="临床实验名称" name="clinTri">
                  <Input />
                </Form.Item>
              ) : null}

              <Divider orientation="left">治疗方案</Divider>

              <Form.Item label="化疗">
                <Switch
                  checked={chemotherapy}
                  checkedChildren="有"
                  unCheckedChildren="无"
                  onChange={(checked) => {
                    setChemotherapy(checked);
                  }}
                />
              </Form.Item>

              {chemotherapy
                ? treatmentRecordTable(
                    therapyPlan?.Chemotherapy,
                    table_columns,
                    'Chemotherapy',
                    '化疗',
                  )
                : null}

              <Form.Item label="靶向治疗">
                <Switch
                  checked={targetedtherapy}
                  checkedChildren="有"
                  unCheckedChildren="无"
                  onChange={(checked) => {
                    setTargetedtherapy(checked);
                  }}
                />
              </Form.Item>

              {targetedtherapy
                ? treatmentRecordTable(
                    therapyPlan?.TargetedTherapy,
                    table_columns,
                    'TargetedTherapy',
                    '靶向治疗',
                  )
                : null}

              <Form.Item label="免疫治疗">
                <Switch
                  checked={immunotherapy}
                  checkedChildren="有"
                  unCheckedChildren="无"
                  onChange={(checked) => {
                    setImmunotherapy(checked);
                  }}
                />
              </Form.Item>

              {immunotherapy
                ? treatmentRecordTable(
                    therapyPlan?.ImmunityTherapy,
                    table_columns,
                    'ImmunityTherapy',
                    '免疫治疗',
                  )
                : null}

              <Form.Item label="抗血管治疗">
                <Switch
                  checked={antivasculartherapy}
                  checkedChildren="有"
                  unCheckedChildren="无"
                  onChange={(checked) => {
                    setaAntivasculartherapy(checked);
                  }}
                />
              </Form.Item>

              {antivasculartherapy
                ? treatmentRecordTable(
                    therapyPlan?.AntivascularTherapy,
                    table_columns,
                    'AntivascularTherapy',
                    '抗血管治疗',
                  )
                : null}

              <Form.Item label="其他">
                <Switch
                  checked={othertherapy}
                  checkedChildren="有"
                  unCheckedChildren="无"
                  onChange={(checked) => {
                    setOthertherapy(checked);
                  }}
                />
              </Form.Item>

              {othertherapy ? (
                <Form.Item label="备注" name="note">
                  <TextArea placeholder="输入备注" />
                </Form.Item>
              ) : null}

              <Form.Item label="开始日期" name="begDate">
                <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
              </Form.Item>

              <Form.Item label="结束日期" name="endDate">
                <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
              </Form.Item>

              <Form.Item label="是否重复活检" name="isRepBio">
                <Radio.Group
                  onChange={(e) => {
                    setIsRepBio(e.target.value);
                  }}
                >
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>

              {isRepBio ? RepBioFormContent() : null}
            </>
          ) : null}

          {trement === 'surgery' ? (
            <>
              <Form.Item label="手术范围" name={['surSco', 'radio']}>
                <Checkbox.Group>
                  <Checkbox value="肺叶">肺叶</Checkbox>
                  <Checkbox value="肺段">肺段</Checkbox>
                  <Checkbox value="楔形">楔形</Checkbox>
                  <Checkbox value="双肺叶">双肺叶</Checkbox>
                  <Checkbox value="全肺">全肺</Checkbox>
                  <Checkbox
                    value="其他"
                    style={{ lineHeight: '32px' }}
                    onChange={(e) => {
                      setSurScoOther(e.target.checked);
                    }}
                  >
                    其他
                    {surScoOther ? (
                      <Form.Item name={['surSco', 'other']} noStyle>
                        <Input
                          style={{ display: 'inline-block', marginLeft: 10, width: 180 }}
                          placeholder="输入其他"
                        />
                      </Form.Item>
                    ) : (
                      false
                    )}
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item label="淋巴清扫范围" name={['lymDis', 'radio']}>
                <Checkbox.Group>
                  <Checkbox value="系统性清扫">系统性清扫</Checkbox>
                  <Checkbox value="取样">取样</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item label="清扫组数" name="cleGro">
                <Input />
              </Form.Item>

              <Form.Item label="手术日期" name="surDate">
                <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
              </Form.Item>

              <Form.Item label="术后辅助化疗" name="posAdjChem" valuePropName="checked">
                <Switch
                  checkedChildren="有"
                  unCheckedChildren="无"
                  onChange={(checked) => {
                    setPosAdjChem(checked);
                  }}
                />
              </Form.Item>

              {posAdjChem
                ? treatmentRecordTable(
                    therapyPlan?.Chemotherapy,
                    table_columns,
                    'Chemotherapy',
                    '术后辅助化疗',
                  )
                : null}

              {/* <Form.Item label="是否进展" name="isPro" valuePropName="checked">
                <Switch
                  checkedChildren="有"
                  unCheckedChildren="无"
                  onChange={checked => {
                    setIsPro(checked);
                  }}
                />
              </Form.Item>

              {isPro ? (
                <div>
                  <Form.Item label="进展日期" name="proDate">
                    <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
                  </Form.Item>
                  <Form.Item label="进展描述" name="proDes">
                    <Input />
                  </Form.Item>
                </div>
              ) : null} */}

              <Form.Item label="是否重复活检" name="isRepBio">
                <Radio.Group
                  onChange={(e) => {
                    setIsRepBio(e.target.value);
                  }}
                >
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>

              {isRepBio ? RepBioFormContent() : null}
            </>
          ) : null}

          {trement === 'radiotherapy' ? (
            <>
              <Form.Item label="开始日期" name="begDate">
                <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
              </Form.Item>

              <Form.Item label="结束日期" name="endDate">
                <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
              </Form.Item>

              <Form.Item name={['radSite', 'radio']} label="放疗部位">
                <Checkbox.Group>
                  <Checkbox value="脑" style={{ lineHeight: '32px' }}>
                    脑
                  </Checkbox>
                  <Checkbox value="骨" style={{ lineHeight: '32px' }}>
                    骨
                  </Checkbox>
                  <Checkbox value="胸壁" style={{ lineHeight: '32px' }}>
                    胸壁
                  </Checkbox>
                  <Checkbox value="锁骨上" style={{ lineHeight: '32px' }}>
                    锁骨上
                  </Checkbox>
                  <Checkbox value="胰腺" style={{ lineHeight: '32px' }}>
                    胰腺
                  </Checkbox>
                  <Checkbox value="肝脏" style={{ lineHeight: '32px' }}>
                    肝脏
                  </Checkbox>
                  <Checkbox value="腹膜后肿块" style={{ lineHeight: '32px' }}>
                    腹膜后肿块
                  </Checkbox>
                  <Checkbox value="肺" style={{ lineHeight: '32px' }}>
                    肺
                  </Checkbox>
                  <Checkbox value="胃周及区域转移淋巴" style={{ lineHeight: '32px' }}>
                    胃周及区域转移淋巴
                  </Checkbox>
                  <Checkbox value="皮肤" style={{ lineHeight: '32px' }}>
                    皮肤
                  </Checkbox>
                  <Checkbox value="膀胱" style={{ lineHeight: '32px' }}>
                    膀胱
                  </Checkbox>
                  <Checkbox value="胆囊" style={{ lineHeight: '32px' }}>
                    胆囊
                  </Checkbox>
                  <Checkbox value="结直肠" style={{ lineHeight: '32px' }}>
                    结直肠
                  </Checkbox>
                  <Checkbox value="乳腺" style={{ lineHeight: '32px' }}>
                    乳腺
                  </Checkbox>
                  <Checkbox value="淋巴结" style={{ lineHeight: '32px' }}>
                    淋巴结
                  </Checkbox>
                  <Checkbox
                    value="其他"
                    style={{ lineHeight: '32px' }}
                    onChange={(e) => {
                      setRadSiteOther(e.target.checked);
                    }}
                  >
                    其他
                    {radSiteOther ? (
                      <Form.Item name={['radSite', 'other']} noStyle>
                        <Input
                          style={{ display: 'inline-block', marginLeft: 10, width: 180 }}
                          placeholder="输入其他"
                        />
                      </Form.Item>
                    ) : (
                      false
                    )}
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item label="放疗剂量">
                <Row>
                  <Col sm={6} xs={6} md={4} lg={4}>
                    <Form.Item name="radDose" noStyle>
                      <InputNumber
                      // onChange={value => {
                      //   if (!value) {
                      //     const _set_value = { radDose: 0 };
                      //     form.setFieldsValue({ ..._set_value });
                      //   }
                      // }}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={6} xs={6} md={4} lg={4}>
                    <Form.Item name="dosUnit" noStyle>
                      <Select>
                        <Option value={0}>Gy</Option>
                        <Option value={1}>cGy</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="分割次数">
                <Row>
                  <Col sm={6} xs={6} md={4} lg={4}>
                    <Form.Item name="splTim" noStyle>
                      <InputNumber
                      // onChange={value => {
                      //   if (!value) {
                      //     const _set_value = { splTim: 0 };
                      //     form.setFieldsValue({ ..._set_value });
                      //   }
                      // }}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={6} xs={6} md={4} lg={4}>
                    <Form.Item name="method" noStyle>
                      <Select>
                        <Option value="qd">qd</Option>
                        <Option value="bid">bid</Option>
                        <Option value="tid">tid</Option>
                        <Option value="qid">qid</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="是否重复活检" name="isRepBio">
                <Radio.Group
                  onChange={(e) => {
                    setIsRepBio(e.target.value);
                  }}
                >
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>

              {isRepBio ? RepBioFormContent() : null}
            </>
          ) : null}

          <Form.Item {...tailLayout} style={{ marginTop: '20px' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Spin>

      <Modal
        title="用药记录"
        visible={modalVisible}
        onOk={() => {
          modalForm.submit();
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
        confirmLoading={confirmLoading}
        forceRender
        width={800}
      >
        <Form onFinish={onModalFinish} form={modalForm} {...ModalFormItemLayout} labelAlign="left">
          <Form.Item name="treatName" label="治疗名称">
            <Input placeholder="请输入治疗名称" />
          </Form.Item>

          {currentRecord.id === null || currentRecord.id === undefined ? (
            <Form.Item label="周期">
              <div style={{ display: 'flex' }}>
                <span style={{ display: 'block', width: '8%', lineHeight: '32px' }}>起始:</span>
                <Form.Item
                  name="currPeriod_start"
                  noStyle
                  rules={[{ required: true, message: '请输入起始周期' }]}
                >
                  <InputNumber
                    readOnly={currentRecord.id}
                    placeholder="请输入起始周期"
                    style={{ width: '40%' }}
                    min={0}
                    onChange={(e) => {
                      setCurrPeriod_start(e);
                    }}
                  />
                </Form.Item>
                <span
                  style={{ display: 'block', width: '8%', lineHeight: '32px', marginLeft: '8px' }}
                >
                  结束:
                </span>
                <Form.Item name="currPeriod_end" noStyle>
                  <InputNumber
                    readOnly={currentRecord.id}
                    placeholder="请输入结束周期"
                    style={{ width: '40%' }}
                    max={999}
                    onChange={(e) => {
                      setCurrPeriod_end(e);
                    }}
                  />
                </Form.Item>
              </div>
            </Form.Item>
          ) : (
            <Form.Item label="周期" rules={[{ required: true, message: '请输入周期' }]}>
              <InputNumber
                defaultValue={currentRecord?.currPeriod}
                placeholder="请输入周期"
                style={{ width: '40%' }}
                min={0}
                onChange={(e) => {
                  setCurrPeriod_start(e);
                  setCurrPeriod_end(e);
                }}
              />
            </Form.Item>
          )}

          {!currentRecord.id ? (
            <Alert
              style={{ marginBottom: '24px' }}
              message="注意: 仅输入起始周期或起始和结束周期相同新增一条记录，起始和结束周期不同时增加多条记录"
              type="warning"
            />
          ) : null}

          <Form.Item name="treSche" label="药物方案">
            <AutoComplete
              options={
                treat_schedule_options[currentRecordType]
                  ? treat_schedule_options[currentRecordType]
                  : undefined
              }
              placeholder="请选择药物方案或手动输入"
              onChange={(value) => {
                setTreSche(value);
              }}
            />
          </Form.Item>

          <Form.List name="drugs">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field) => {
                    let DrugNameForm = <></>;
                    if (currentRecordType === 'Chemotherapy') {
                      DrugNameForm = (
                        <Form.Item
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          label="药物名称"
                          noStyle
                        >
                          <AutoComplete
                            style={{ display: 'inline-block', width: '100%', lineHeight: '32px' }}
                            placeholder="请选择药物名称或手动输入"
                            options={
                              treat_schedule_medicine_options[currentRecordType]
                                ? treat_schedule_medicine_options[currentRecordType][treSche]
                                : undefined
                            }
                          />
                        </Form.Item>
                      );
                    } else if (
                      ['ImmunityTherapy', 'TargetedTherapy', 'AntivascularTherapy'].indexOf(
                        currentRecordType || '',
                      ) !== -1
                    ) {
                      DrugNameForm = (
                        <Form.Item
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          label="药物名称"
                          noStyle
                        >
                          <AutoComplete
                            // mode="tags"
                            style={{ display: 'inline-block', width: '100%', lineHeight: '32px' }}
                            placeholder="请选择药物名称或手动输入"
                            options={
                              treat_schedule_medicine_options[currentRecordType]
                                ? treat_schedule_medicine_options[currentRecordType].commonDrugs
                                : undefined
                            }
                          />
                        </Form.Item>
                      );
                    }

                    return (
                      <Row gutter={[16, 16]} key={field.fieldKey} style={{ marginBottom: '12px' }}>
                        <Col sm={3} xs={8}>
                          <span style={{ lineHeight: '32px' }}>药物名称:</span>
                        </Col>
                        <Col sm={8} xs={16}>
                          {DrugNameForm}
                        </Col>
                        <Col sm={3} xs={8}>
                          <span style={{ lineHeight: '32px' }}>药物剂量:</span>
                        </Col>
                        <Col sm={8} xs={16}>
                          <Form.Item
                            name={[field.name, 'dose']}
                            fieldKey={[field.fieldKey, 'dose']}
                            label="药物剂量"
                            noStyle
                          >
                            <Input
                              placeholder="请输入药物剂量"
                              style={{ display: 'inline-block' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col sm={2} xs={11}>
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                            style={{ display: 'inline-block', lineHeight: '32px' }}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                    style={{ width: '100%', marginBottom: '24px' }}
                  >
                    <PlusOutlined /> 新增药物
                  </Button>
                </>
              );
            }}
          </Form.List>

          {currPeriodstart === null || currPeriodend !== currPeriodstart ? (
            <></>
          ) : (
            <>
              <Form.Item label="给药/治疗开始日期" name="begDate" id="modal_begDate">
                <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
              </Form.Item>

              <Form.Item label="给药/治疗结束日期" name="endDate" id="modal_endDate">
                <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
              </Form.Item>
            </>
          )}

          <Form.Item name="note" label="备注" id="modal_note">
            <Input placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  treatmentRecord,
  loading,
}: {
  treatmentRecord: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    treatmentRecord: treatmentRecord.treatmentRecordInfo,
    therapyPlan: treatmentRecord.therapyPlan,
    therapyPlanLoading: loading.effects['treatmentRecord/fetchTherapyPlan'],
    treatmentRecordLoading: loading.effects['treatmentRecord/fetchTherapyRecord'],
  };
};

export default connect(mapStateToProps)(TreatmentRecordContent);
