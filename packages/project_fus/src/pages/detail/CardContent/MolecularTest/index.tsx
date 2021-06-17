/* eslint-disable no-console */
/*
 * @Descripttion:
 * @Author: hlgdb
 * @Date: 2020-09-19 13:45:01
 */

import React, { useState, useEffect } from 'react';
import { Form, Radio, Input, Switch, Button, InputNumber, Select, Spin, DatePicker } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import FileTable from '@/components/FileTable';
import type { FormInstance } from 'antd/lib/form';
import type { StateType } from './model';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

interface MolecularTestContentProps {
  dispatch: Dispatch;
  pid: number;
  treNum: number;
  mole_detec?: any;
  mole_detecLoading?: boolean;
}

const MolecularRadios = (radioProps: { name: string; moleDetec: any; form: FormInstance<any> }) => {
  const { name, moleDetec, form } = radioProps;
  const [state, SetState] = useState(-1);

  useEffect(() => {
    if (moleDetec) {
      SetState(moleDetec[name]);
    }
  }, [moleDetec]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const onChange = (e: any) => {
    SetState(e.target.value);
  };

  return (
    <>
      <Form.Item name={name} label={name}>
        <Radio.Group value={state} onChange={onChange}>
          <Radio value={2}>无</Radio>
          <Radio value={0}>阴性</Radio>
          <Radio value={1}>阳性</Radio>
        </Radio.Group>
      </Form.Item>
      {state !== 1 ? null : (
        <div style={{ marginLeft: name === 'OtherMole' ? 0 : 115 }}>
          <Form.Item label="检测样本" name={`${name}Sam`}>
            <Input />
          </Form.Item>
          <Form.Item label="检测方法" name={`${name}DetMed`}>
            <Select
              style={{ width: 120 }}
              allowClear
              onChange={(value) => {
                console.log(value);
                if (value === undefined) {
                  form.setFieldsValue({ [`${name}DetMed`]: null });
                }
              }}
              // onClear={() => {
              //   console.log(`清除:${name}DetMed`);
              //   form.setFieldsValue({ [`${name}DetMed`]: 0 });
              // }}
            >
              <Option value={1}>ARMS</Option>
              <Option value={2}>FISH</Option>
              <Option value={3}>NGS</Option>
            </Select>
          </Form.Item>
          <Form.Item label="检测描述" name={`${name}Desc`}>
            <Input />
          </Form.Item>
        </div>
      )}
    </>
  );
};

const MolecularTestContent: React.FC<MolecularTestContentProps> = (props) => {
  const { pid, treNum, dispatch, mole_detec, mole_detecLoading } = props;
  const [form] = Form.useForm();

  const [TMBchecked, SetTMBchecked] = useState(false);
  const [PD_L1checked, SetPD_L1checked] = useState(false);
  const [PD_1checked, SetPD_1checked] = useState(false);
  const [id, setId] = useState(undefined);

  useEffect(() => {
    if (pid !== -404) {
      dispatch({
        type: 'moleDetec/fetchMoleDetec',
        payload: { pid, treNum },
      });
    }
    // 销毁的时候
    return () => {};
  }, [pid, treNum]);

  useEffect(() => {
    if (mole_detec) {
      if (mole_detec.id !== -404) {
        form.setFieldsValue({
          ...mole_detec,
          detectTime: mole_detec.detectTime ? moment(mole_detec.detectTime) : null,
        });
        if (
          (mole_detec.PDL1 !== null && mole_detec.PDL1 !== undefined) ||
          (mole_detec.PDL1KT !== null && mole_detec.PDL1KT !== undefined)
        ) {
          SetPD_L1checked(true);
        } else {
          SetPD_L1checked(false);
        }

        if (
          (mole_detec.PD1 !== null && mole_detec.PD1 !== undefined) ||
          (mole_detec.PD1KT !== null && mole_detec.PD1KT !== undefined)
        ) {
          SetPD_1checked(true);
        } else {
          SetPD_1checked(false);
        }

        if (mole_detec.TMB !== null && mole_detec.TMB !== undefined) {
          SetTMBchecked(true);
        } else {
          SetTMBchecked(false);
        }
        if (mole_detec.id >= 0) {
          setId(mole_detec.id);
        }
        console.log(PD_L1checked, TMBchecked);
      } else {
        form.resetFields();
        dispatch({
          type: 'moleDetec/modifyMoleDetec',
          payload: {
            pid,
            treNum,
            body: {},
          },
        });
      }
    }
  }, [mole_detec, pid, treNum]);

  const onFinish = (values: any) => {
    if (mole_detec) {
      values.id = mole_detec.id;
    }

    values.detectTime = values.detectTime ? values.detectTime.format('YYYY-MM-DD') : null;

    dispatch({
      type: 'moleDetec/modifyMoleDetec',
      payload: {
        pid,
        treNum,
        body: values,
      },
    });
  };

  const radio_props = [
    'EGFR',
    'ALK',
    'ROS1',
    'HER_2',
    'BRAF',
    'cMET',
    'RET',
    'NTRK', // 新增
    'KRAS',
    // 'PD-1', // 新增

    'BIM',
    'PIK3CA',
    'UGT1A1',
  ];

  return (
    <Spin spinning={mole_detecLoading}>
      <Form
        form={form}
        name="molecularTest"
        labelAlign="left"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 8 }}
        onFinish={(values) => {
          onFinish(values);
        }}
      >
        {radio_props.map((item) => {
          return <MolecularRadios name={item} moleDetec={mole_detec} form={form} />;
        })}

        <Form.Item name="MSI" label="MSI">
          <Radio.Group>
            <Radio value={0}>MSS</Radio>
            <Radio value={1}>MSIH</Radio>
            <Radio value={2}>MSIL</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="PD-1表达">
          <Switch
            checkedChildren="已检测"
            unCheckedChildren="未检测"
            checked={PD_1checked}
            onChange={(checked) => {
              SetPD_1checked(checked);
              if (checked === false) {
                form.setFieldsValue({ PD1: null, PD1KT: null });
                console.log(form.getFieldsValue());
              }
            }}
          />
          <Form.Item name="PD1">
            <InputNumber
              style={{ width: '100%', textAlign: 'center', marginTop: 15 }}
              placeholder="请输入数值"
              disabled={!PD_1checked}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
          <Form.Item name="PD1KT" label="抗体">
            <Input disabled={!PD_1checked} />
          </Form.Item>
        </Form.Item>

        <Form.Item label="PD-L1表达">
          <Switch
            checkedChildren="已检测"
            unCheckedChildren="未检测"
            checked={PD_L1checked}
            onChange={(checked) => {
              SetPD_L1checked(checked);
              // console.log('checked', checked);
              if (checked === false) {
                form.setFieldsValue({ PDL1: null, PDL1KT: null });
                console.log(form.getFieldsValue());
              }
            }}
          />
          <Form.Item name="PDL1">
            <InputNumber
              style={{ width: '100%', textAlign: 'center', marginTop: 15 }}
              placeholder="请输入数值"
              disabled={!PD_L1checked}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
          <Form.Item name="PDL1KT" label="抗体">
            <Input disabled={!PD_L1checked} />
          </Form.Item>
        </Form.Item>

        <Form.Item label="TMB(个/Mb)" style={{ marginTop: -15 }}>
          <Switch
            checkedChildren="已检测"
            unCheckedChildren="未检测"
            checked={TMBchecked}
            onChange={(checked) => {
              SetTMBchecked(checked);
              if (checked === false) {
                form.setFieldsValue({ TMB: null });
                console.log(form.getFieldsValue());
              }
            }}
          />
          <Form.Item name="TMB">
            <InputNumber
              min={0}
              style={{ width: '100%', textAlign: 'center', marginTop: 10 }}
              placeholder="请输入数值"
              disabled={!TMBchecked}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item name="other" label="其他">
          <TextArea placeholder="请输入其他分子信息" rows={4} />
        </Form.Item>

        <Form.Item label="检测时间" name="detectTime">
          <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
        </Form.Item>

        <Form.Item label="样本类型" name="sampleType">
          <Input style={{ width: '320px' }} />
        </Form.Item>

        <Form.Item label="文件管理" style={{ marginTop: -15 }}>
          <FileTable pid={pid} folder="moleDetec" id={id} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  moleDetec,
  loading,
}: {
  moleDetec: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  console.log('moleDetec', moleDetec);
  return {
    mole_detec: moleDetec.mole_detec,
    mole_detecLoading: loading.effects['moleDetec/fetchMoleDetec'],
  };
};

export default connect(mapStateToProps)(MolecularTestContent);
