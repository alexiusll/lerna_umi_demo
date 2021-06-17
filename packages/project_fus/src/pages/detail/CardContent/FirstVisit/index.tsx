/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-boolean-value */
/*
 * @Descripttion: 初诊过程
 * @Author: linkenzone
 * @Date: 2020-09-19 14:53:57
 */

import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
  TreeSelect,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { treeData } from '@/components/patDiaTree';
import { getMultipleChoiceGet, getMultipleChoicePost } from '@/utils/util';
import { RedoOutlined } from '@ant-design/icons';
import { StateType } from './model';
import { FirstVisitDataType } from './data';

const { Option } = Select;

const formItemLayout = {
  labelCol: { xl: { span: 4 }, md: { span: 6 } },
  wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
};

const formItemLayoutNoLable = {
  wrapperCol: {
    xl: { span: 18, offset: 4 },
    md: { span: 18, offset: 6 },
    sm: { span: 18, offset: 0 },
    xs: { span: 18, offset: 0 },
  },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 4 }, md: { span: 6, offset: 6 } },
};

interface FirstVisitContentProps {
  dispatch: Dispatch;
  firstVisitInfo?: FirstVisitDataType;
  firstVisitInfoLoading: boolean;
  pid: number;
}

const FirstVisitContent: React.FC<FirstVisitContentProps> = (props) => {
  const { firstVisitInfo, firstVisitInfoLoading, pid, dispatch } = props;
  const [form] = Form.useForm();
  // 临床表现
  const [cliniManifestOther, setCliniManifestOther] = useState(false);
  // 活检方式
  const [BioMetOther, setBioMetOther] = useState(false);
  // 转移部位
  const [traSiteOther, setTraSiteOther] = useState(false);
  // 分期情况
  const [stage, setStage] = useState<string | undefined>(undefined);
  // 病理诊断 其他
  const [patDiaOthers, setPatDiaOthers] = useState(false);

  const onPatDiaChange = (value: string[]) => {
    if (value.length !== 0) {
      let has_other = false;
      const last_node = value[value.length - 1];
      const item_list = last_node.split('-');
      const same_parent_list = [];

      if (item_list.length > 2) {
        // console.log('item_list', item_list);
        for (let i = 1; i < item_list.length - 1; i++) {
          let same_parent_str = '';
          for (let y = 0; y <= i; y++) {
            same_parent_str += `${item_list[y]}-`;
          }
          // console.log('需要删除的', same_parent_str.slice(0, -1));
          same_parent_list.push(same_parent_str.slice(0, -1));
        }
      }

      const result = [];

      // eslint-disable-next-line guard-for-in
      for (const index in value) {
        let isDel = false;
        if (value[index] === '0-5') {
          console.log('选择了其他');
          has_other = true;
        }
        for (const _index in same_parent_list) {
          // console.log('same_parent_list', same_parent_list[_index]);
          // console.log('value', value[index]);

          if (value[index] === same_parent_list[_index]) {
            console.log('需要删除', value[index]);
            // value.splice(parseInt(index, 10), 1);
            isDel = true;
            break;
          }
        }
        // console.log('value[index]', value[index]);
        const reg = new RegExp(`^${last_node}-.*$`);
        if (reg.test(value[index])) {
          console.log('需要删除', value[index]);
          // value.splice(parseInt(index, 10), 1);
          isDel = true;
        }
        if (!isDel) {
          console.log('result push', value[index]);
          result.push(value[index]);
        }
      }
      // value = result;
      console.log('result', result);
      setPatDiaOthers(has_other);
      form.setFieldsValue({ patDia: { radio: result } });
    }
  };

  useEffect(() => {
    dispatch({
      type: 'firstVisit/fetchFirstDiagnose',
      payload: { pid },
    });
    // 销毁的时候
    return () => {};
  }, []);

  useEffect(() => {
    if (firstVisitInfo) {
      firstVisitInfo.cliniManifest = getMultipleChoiceGet({
        multipleChoice: firstVisitInfo.cliniManifest,
        setOther: setCliniManifestOther,
      });

      firstVisitInfo.bioMet = getMultipleChoiceGet({
        multipleChoice: firstVisitInfo.bioMet,
        setOther: setBioMetOther,
      });

      firstVisitInfo.traSite = getMultipleChoiceGet({
        multipleChoice: firstVisitInfo.traSite,
        setOther: setTraSiteOther,
      });

      firstVisitInfo.part = getMultipleChoiceGet({
        multipleChoice: firstVisitInfo.part,
      });

      setStage(firstVisitInfo.stage ? firstVisitInfo.stage : undefined);
      if (firstVisitInfo.patDia) {
        if (firstVisitInfo.patDia.radio) {
          for (const item of firstVisitInfo.patDia.radio) {
            if (item === '0-5') {
              setPatDiaOthers(true);
            }
          }
        }
      }

      let cStage_list: string[] = [];
      if (firstVisitInfo.cStage) {
        cStage_list = firstVisitInfo.cStage.split(',');
      }

      let pStage_list: string[] = [];
      if (firstVisitInfo.pStage) {
        pStage_list = firstVisitInfo.pStage.split(',');
      }

      form.setFieldsValue({
        ...firstVisitInfo,

        firVisDate: firstVisitInfo.firVisDate ? moment(firstVisitInfo.firVisDate) : null,
        patReDate: firstVisitInfo.patReDate ? moment(firstVisitInfo.patReDate) : null,
        // patDia: firstVisitInfo.patDia ? firstVisitInfo.patDia.split(',') : [],

        C_T: cStage_list.length > 0 ? cStage_list[0] : null,
        C_N: cStage_list.length > 1 ? cStage_list[1] : null,
        C_M: cStage_list.length > 2 ? cStage_list[2] : null,

        P_T: pStage_list.length > 0 ? pStage_list[0] : null,
        P_N: pStage_list.length > 1 ? pStage_list[1] : null,
        P_M: pStage_list.length > 2 ? pStage_list[2] : null,
      });
    } else {
      form.resetFields();
      setCliniManifestOther(false);
      setBioMetOther(false);
      setTraSiteOther(false);
      setStage(undefined);
      setPatDiaOthers(false);
    }
  }, [firstVisitInfo]);

  const onFinish = (values: any) => {
    if (firstVisitInfo) {
      values.id = firstVisitInfo.id ? firstVisitInfo.id : undefined;
    }

    values.cliniManifest = getMultipleChoicePost({
      multipleChoice: values.cliniManifest,
      other: cliniManifestOther,
    });

    values.bioMet = getMultipleChoicePost({
      multipleChoice: values.bioMet,
      other: BioMetOther,
    });

    values.traSite = getMultipleChoicePost({
      multipleChoice: values.traSite,
      other: traSiteOther,
    });

    values.part = getMultipleChoicePost({
      multipleChoice: values.part,
    });

    if (values.patDia) {
      values.patDia.radio = values.patDia.radio ? values.patDia.radio : [];
      values.patDia.other = values.patDia.other ? values.patDia.other : null;
    }

    // if (values.patDia) {
    //   values.patDia = values.patDia ? values.patDia.toString() : '';
    // }

    values.firVisDate = values.firVisDate ? values.firVisDate.format('YYYY-MM-DD') : null;
    values.patReDate = values.patReDate ? values.patReDate.format('YYYY-MM-DD') : null;

    const cStage_list = ['', '', ''];
    if (values.C_T) {
      cStage_list[0] = values.C_T;
      delete values.C_T;
    }
    if (values.C_N) {
      cStage_list[1] = values.C_N;
      delete values.C_N;
    }
    if (values.C_M) {
      cStage_list[2] = values.C_M;
      delete values.C_M;
    }
    values.cStage = cStage_list.toString();

    const PStage_list = ['', '', ''];
    if (values.P_T) {
      PStage_list[0] = values.P_T;
      delete values.P_T;
    }
    if (values.P_N) {
      PStage_list[1] = values.P_N;
      delete values.P_N;
    }
    if (values.P_M) {
      PStage_list[2] = values.P_M;
      delete values.P_M;
    }
    values.pStage = PStage_list.toString();

    console.log('values', values);
    dispatch({
      type: 'firstVisit/modifyFirstDiagnose',
      payload: { pid, body: values },
    });

    // .then(() => {
    //   dispatch({
    //     type: 'firstVisit/fetchFirstDiagnose',
    //     payload: { pid },
    //   });
    // });
  };

  return (
    <>
      <Spin spinning={firstVisitInfoLoading}>
        <Form form={form} labelAlign="left" onFinish={onFinish} {...formItemLayout}>
          <Form.Item name="PSScore" label="首诊PS评分">
            <Radio.Group>
              {/* <Radio value={undefined}>无</Radio> */}
              <Radio value={0}>0</Radio>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
              <Radio value={4}>4</Radio>
              <Button
                style={{ marginRight: '8px', borderRadius: '50%' }}
                size="small"
                shape="circle"
                onClick={() => {
                  form.setFieldsValue({ PSScore: null });
                }}
              >
                <RedoOutlined />
              </Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name={['cliniManifest', 'radio']} label="临床表现">
            <Checkbox.Group>
              <Checkbox value="无" style={{ lineHeight: '32px' }}>
                无
              </Checkbox>
              <Checkbox value="颈部肿物" style={{ lineHeight: '32px' }}>
                颈部肿物
              </Checkbox>
              <Checkbox value="咳嗽" style={{ lineHeight: '32px' }}>
                咳嗽
              </Checkbox>
              <Checkbox value="咳痰" style={{ lineHeight: '32px' }}>
                咳痰
              </Checkbox>
              <Checkbox value="痰中带血" style={{ lineHeight: '32px' }}>
                痰中带血
              </Checkbox>
              <Checkbox value="咳血" style={{ lineHeight: '32px' }}>
                咳血
              </Checkbox>
              <Checkbox value="胸闷" style={{ lineHeight: '32px' }}>
                胸闷
              </Checkbox>
              <Checkbox value="胸痛" style={{ lineHeight: '32px' }}>
                胸痛
              </Checkbox>
              <Checkbox value="气促" style={{ lineHeight: '32px' }}>
                气促
              </Checkbox>
              <Checkbox value="发热" style={{ lineHeight: '32px' }}>
                发热
              </Checkbox>
              <Checkbox value="食欲不佳" style={{ lineHeight: '32px' }}>
                食欲不佳
              </Checkbox>
              <Checkbox value="体重减轻" style={{ lineHeight: '32px' }}>
                体重减轻
              </Checkbox>
              <Checkbox
                value="其他"
                style={{ lineHeight: '32px' }}
                onChange={(e) => {
                  if (e.target.checked === true) {
                    setCliniManifestOther(true);
                  } else {
                    setCliniManifestOther(false);
                  }
                }}
              >
                其他
                {cliniManifestOther ? (
                  <Form.Item name={['cliniManifest', 'other']} noStyle>
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

          <Form.Item name="videography" label="影像学">
            <Radio.Group>
              <Radio value={false}>周围型</Radio>
              <Radio value={true}>中央型</Radio>
              <Button
                style={{ marginRight: '8px', borderRadius: '50%' }}
                size="small"
                shape="circle"
                onClick={() => {
                  form.setFieldsValue({ videography: null });
                }}
              >
                <RedoOutlined />
              </Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name={['part', 'radio']} label="部位">
            <Checkbox.Group>
              <Checkbox value="左上肺" style={{ lineHeight: '32px' }}>
                左上肺
              </Checkbox>
              <Checkbox value="左下肺" style={{ lineHeight: '32px' }}>
                左下肺
              </Checkbox>
              <Checkbox value="右上肺" style={{ lineHeight: '32px' }}>
                右上肺
              </Checkbox>
              <Checkbox value="右中肺" style={{ lineHeight: '32px' }}>
                右中肺
              </Checkbox>
              <Checkbox value="右下肺" style={{ lineHeight: '32px' }}>
                右下肺
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name={['bioMet', 'radio']} label="活检方式">
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
                {BioMetOther ? (
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

          <Form.Item label="是否胸膜侵犯" name="pleInv">
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
              <Button
                style={{ marginRight: '8px', borderRadius: '50%' }}
                size="small"
                shape="circle"
                onClick={() => {
                  form.setFieldsValue({ pleInv: null });
                }}
              >
                <RedoOutlined />
              </Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="标本部位" name="speSite">
            <Input placeholder="请输入部位" style={{ maxWidth: '320px' }} />
          </Form.Item>
          <Form.Item label="初诊日期" name="firVisDate">
            <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
          </Form.Item>
          <Form.Item label="病理报告日期" name="patReDate">
            <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
          </Form.Item>
          <Form.Item label="病理号" name="patNum">
            {/* <InputNumber
              placeholder="请输入数字"
              style={{ maxWidth: '320px', width: '100%' }}
              // onChange={value => {
              //   if (!value) {
              //     const _set_value = { patNum: 0 };
              //     form.setFieldsValue({ ..._set_value });
              //   }
              // }}
            /> */}
            <Input placeholder="输入病理号" />
          </Form.Item>

          <Form.Item label="病理诊断" name={['patDia', 'radio']}>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择"
              allowClear
              multiple
              treeNodeLabelProp="path"
              treeData={treeData}
              onChange={onPatDiaChange}
            />
          </Form.Item>

          {patDiaOthers ? (
            <Form.Item label="其他(病理)" name={['patDia', 'other']}>
              <Input style={{ maxWidth: '320px' }} />
            </Form.Item>
          ) : null}

          <span style={{ display: 'block' }}>核分裂像/2mm2=个人显微镜8.3个40倍高倍视野 :</span>
          <Form.Item name="mitIma" {...formItemLayoutNoLable}>
            {/* <InputNumber
              placeholder="请输入数字"
              style={{ maxWidth: '320px', width: '100%' }}
              // onChange={value => {
              //   if (!value) {
              //     const _set_value = { mitIma: null };
              //     form.setFieldsValue({ ..._set_value });
              //   }
              // }}
            /> */}
            <Input style={{ maxWidth: '320px' }} placeholder="请输入内容" />
          </Form.Item>

          <span style={{ display: 'block' }}>复合性癌(记录非小细胞癌的类型) :</span>
          <Form.Item name="comCar" {...formItemLayoutNoLable}>
            <Input placeholder="请输入内容" style={{ maxWidth: '320px' }} />
          </Form.Item>

          <span style={{ display: 'block' }}>坏死面积(占肿瘤面积的百分比) :</span>
          <Form.Item name="necArea" {...formItemLayoutNoLable}>
            <InputNumber
              placeholder="请输入数字"
              style={{ maxWidth: '320px', width: '100%' }}
              formatter={(value) => `${value}%`}
              // onChange={value => {
              //   if (!value) {
              //     const _set_value = { necArea: 0 };
              //     form.setFieldsValue({ ..._set_value });
              //   }
              // }}
            />
          </Form.Item>

          <Form.Item label="肿块大小(mm)" name="massSize">
            {/* <InputNumber
              placeholder="请输入数字"
              style={{ maxWidth: '320px', width: '100%' }}
              onChange={value => {
                if (!value) {
                  const _set_value = { massSize: 0 };
                  form.setFieldsValue({ ..._set_value });
                }
              }}
            /> */}
            <Input placeholder="请输入肿块大小(mm)" style={{ maxWidth: '320px' }} />
          </Form.Item>

          {/* <Form.Item label="Ki67(%)" name="Ki67">
            <InputNumber
              placeholder="请输入数字"
              style={{ maxWidth: '320px', width: '100%' }}
              formatter={(value) => `${value}%`}
              // onChange={value => {
              //   if (!value) {
              //     const _set_value = { Ki67: 0 };
              //     form.setFieldsValue({ ..._set_value });
              //   }
              // }}
            />
          </Form.Item> */}

          <Form.Item name={['traSite', 'radio']} label="转移部位">
            <Checkbox.Group>
              <Checkbox value="肺内" style={{ lineHeight: '32px' }}>
                肺内（包括同侧不同叶、同侧同叶）
              </Checkbox>
              <Checkbox value="对侧肺" style={{ lineHeight: '32px' }}>
                对侧肺（仅对侧有转移结节）
              </Checkbox>
              <Checkbox value="双肺" style={{ lineHeight: '32px' }}>
                双肺（双侧肺都有转移结节）
              </Checkbox>
              <Checkbox value="脑" style={{ lineHeight: '32px' }}>
                脑
              </Checkbox>
              <Checkbox value="脊柱" style={{ lineHeight: '32px' }}>
                脊柱
              </Checkbox>
              <Checkbox value="四肢骨" style={{ lineHeight: '32px' }}>
                四肢骨
              </Checkbox>
              <Checkbox value="肝" style={{ lineHeight: '32px' }}>
                肝
              </Checkbox>
              <Checkbox value="脾" style={{ lineHeight: '32px' }}>
                脾
              </Checkbox>
              <Checkbox value="肾上腺" style={{ lineHeight: '32px' }}>
                肾上腺
              </Checkbox>
              <Checkbox value="胰腺" style={{ lineHeight: '32px' }}>
                胰腺
              </Checkbox>
              <Checkbox value="淋巴结" style={{ lineHeight: '32px' }}>
                淋巴结
              </Checkbox>
              <Checkbox value="肾脏" style={{ lineHeight: '32px' }}>
                肾脏
              </Checkbox>
              <Checkbox value="脑膜" style={{ lineHeight: '32px' }}>
                脑膜
              </Checkbox>
              <Checkbox value="其他骨" style={{ lineHeight: '32px' }}>
                其他骨
              </Checkbox>
              <Checkbox
                value="其他"
                style={{ lineHeight: '32px' }}
                onChange={(e) => {
                  setTraSiteOther(e.target.checked);
                }}
              >
                其他
                {traSiteOther ? (
                  <Form.Item name={['traSite', 'other']} noStyle>
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

          <Form.Item label="TSize" name="TSize">
            {/* <InputNumber
              placeholder="请输入数字"
              style={{ maxWidth: '320px', width: '100%' }}
              // onChange={value => {
              //   if (!value) {
              //     const _set_value = { TSize: 0 };
              //     form.setFieldsValue({ ..._set_value });
              //   }
              // }}
            /> */}
            <Input placeholder="请输入内容" style={{ maxWidth: '320px' }} />
          </Form.Item>

          <Form.Item label="分期情况" name="stage">
            <Radio.Group
              onChange={(e) => {
                setStage(e.target.value);
              }}
            >
              <Radio value="1">无=未住院</Radio>
              <Radio value="2">无法分期=C/P/S均无法分期</Radio>
              <Radio value="3">仅C分期</Radio>
              <Radio value="4">仅P分期</Radio>
              <Radio value="5">c分期和P分期</Radio>
              <Button
                style={{ marginRight: '8px', borderRadius: '50%' }}
                size="small"
                shape="circle"
                onClick={() => {
                  form.setFieldsValue({ stage: null });
                  setStage(undefined);
                }}
              >
                <RedoOutlined />
              </Button>
            </Radio.Group>
          </Form.Item>

          {stage === '3' || stage === '5' ? (
            <>
              <Divider orientation="left">C分期 :</Divider>
              <Form.Item label="C分期" style={{ marginBottom: '0' }}>
                <Row gutter={[0, 0]}>
                  <Col>
                    <Form.Item label="T" name="C_T">
                      <Select style={{ width: 60, marginRight: '16px' }}>
                        <Option value="1">1</Option>
                        <Option value="1a">1a</Option>
                        <Option value="1b">1b</Option>
                        <Option value="1c">1c</Option>
                        <Option value="2">2</Option>
                        <Option value="2a">2a</Option>
                        <Option value="2b">2b</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="N" name="C_N">
                      <Select style={{ width: 60, marginRight: '16px' }}>
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="M" name="C_M">
                      <Select style={{ width: 60, marginRight: '16px' }}>
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>
                        <Option value="1a">1a</Option>
                        <Option value="1b">1b</Option>
                        <Option value="1c">1c</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="临床分期" name="cliStage">
                      <Select style={{ width: 100 }}>
                        <Option value="I">I</Option>
                        <Option value="IA1">IA1</Option>
                        <Option value="IA2">IA2</Option>
                        <Option value="IA3">IA3</Option>
                        <Option value="IB">IB</Option>
                        <Option value="II">II</Option>
                        <Option value="IIA">IIA</Option>
                        <Option value="IIB">IIB</Option>
                        <Option value="III">III</Option>
                        <Option value="IIIA">IIIA</Option>
                        <Option value="IIIB">IIIB</Option>
                        <Option value="IIIC">IIIC</Option>
                        <Option value="IV">IV</Option>
                        <Option value="IVA">IVA</Option>
                        <Option value="IVB">IVB</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="C备注" name="cRemark">
                <Input />
              </Form.Item>
            </>
          ) : null}

          {stage === '4' || stage === '5' ? (
            <>
              <Divider orientation="left">P分期 :</Divider>
              <Form.Item label="P分期" style={{ marginBottom: '0' }}>
                <Row>
                  <Col>
                    <Form.Item label="T" name="P_T">
                      <Select style={{ width: 60, marginRight: '16px' }}>
                        T:
                        <Option value="1">1</Option>
                        <Option value="1a">1a</Option>
                        <Option value="1b">1b</Option>
                        <Option value="1c">1c</Option>
                        <Option value="2">2</Option>
                        <Option value="2a">2a</Option>
                        <Option value="2b">2b</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="N" name="P_N">
                      <Select style={{ width: 60, marginRight: '16px' }}>
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="M" name="P_M">
                      <Select style={{ width: 60, marginRight: '16px' }}>
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>
                        <Option value="1a">1a</Option>
                        <Option value="1b">1b</Option>
                        <Option value="1c">1c</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="病理分期" name="patStage">
                      <Select style={{ width: 100 }}>
                        <Option value="I">I</Option>
                        <Option value="IA1">IA1</Option>
                        <Option value="IA2">IA2</Option>
                        <Option value="IA3">IA3</Option>
                        <Option value="IB">IB</Option>
                        <Option value="II">II</Option>
                        <Option value="IIA">IIA</Option>
                        <Option value="IIB">IIB</Option>
                        <Option value="III">III</Option>
                        <Option value="IIIA">IIIA</Option>
                        <Option value="IIIB">IIIB</Option>
                        <Option value="IIIC">IIIC</Option>
                        <Option value="IV">IV</Option>
                        <Option value="IVA">IVA</Option>
                        <Option value="IVB">IVB</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="P备注" name="pRemark">
                <Input />
              </Form.Item>
            </>
          ) : null}

          <Form.Item {...tailLayout} style={{ marginTop: '20px' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

const mapStateToProps = ({
  firstVisit,
  loading,
}: {
  firstVisit: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    firstVisitInfo: firstVisit.firstVisitInfo,
    firstVisitInfoLoading: loading.effects['firstVisit/fetchFirstDiagnose'],
  };
};

export default connect(mapStateToProps)(FirstVisitContent);
