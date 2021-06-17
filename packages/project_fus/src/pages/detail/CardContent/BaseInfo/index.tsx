/* eslint-disable react/jsx-boolean-value */
/*
 * @Descripttion: 基本信息
 * @Author: linkenzone
 * @Date: 2020-09-15 21:56:48
 */

import { Button, Form, Input, Radio, DatePicker, Spin, message } from 'antd';
import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
// import moment from 'moment';
import { getBirthDay } from '@/utils/util';
import { StateType } from './model';
import { PatientDataType } from './data';

interface BaseInfoContentProps {
  dispatch: Dispatch;
  patientInfo?: PatientDataType;
  patientInfoLoading: boolean;
  pid: number;
}

const formItemLayout = {
  labelCol: { xl: { span: 4 }, md: { span: 6 } },
  wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 4 }, md: { span: 6, offset: 6 } },
};

const BaseInfoContent: React.FC<BaseInfoContentProps> = (props) => {
  const { patientInfo, patientInfoLoading, pid, dispatch } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (pid !== -404) {
      dispatch({
        type: 'patient/fetchPatient',
        payload: { pid },
      });
    }
    // 销毁的时候
    return () => {};
  }, [pid]);

  useEffect(() => {
    if (patientInfo) {
      form.setFieldsValue({
        ...patientInfo,
        // birthday: patientInfo.birthday ? moment(patientInfo.birthday) : null,
      });
    } else {
      form.resetFields();
    }
  }, [patientInfo]);

  const onFinish = async (values: any) => {
    // values.birthday = values.birthday ? values.birthday.format('YYYY-MM-DD') : null;
    // 是否为新增
    if (patientInfo) {
      values.id = patientInfo.id ? patientInfo.id : undefined;
    }
    if (!values.idNumber || values.idNumber === '') {
      values.idNumber = undefined;
    }
    if (!values.hospitalNumber || values.hospitalNumber === '') {
      values.hospitalNumber = undefined;
    }
    if (!values.patientName || values.patientName === '') {
      values.patientName = undefined;
    }
    if (!values.idNumber && !values.hospitalNumber && !values.patientName) {
      message.error('“身份证号” “住院号/就诊号” “姓名” 三项必须填一项');
      return;
    }
    // 处理数字输入
    values.phoneNumber1 = values.phoneNumber1 ? values.phoneNumber1 : '';
    values.phoneNumber2 = values.phoneNumber2 ? values.phoneNumber2 : '';
    console.log('values', values);
    dispatch({
      type: 'patient/modifyPatient',
      payload: { pid, body: values },
    });
  };

  return (
    <Spin spinning={patientInfoLoading}>
      <Form form={form} labelAlign="left" onFinish={onFinish} {...formItemLayout}>
        <Form.Item
          label="身份证号"
          name="idNumber"
          rules={[
            { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号(18位)' },
          ]}
        >
          <Input
            maxLength={18}
            onChange={(e) => {
              form.setFieldsValue({ birthday: getBirthDay(e.target.value) });
              form.validateFields();
            }}
          />
        </Form.Item>
        <Form.Item label="住院号/就诊号" name="hospitalNumber">
          <Input />
        </Form.Item>
        <Form.Item label="姓名" name="patientName">
          <Input />
        </Form.Item>
        <Form.Item label="编号" name="patNumber">
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="birthday"
          label="出生日期"
          rules={[{ type: 'date', message: '身份证号中的出生日期不正确' }]}
        >
          {/* <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" /> */}
          <Input readOnly bordered={false} />
        </Form.Item>
        <Form.Item
          label="电话号码"
          name="phoneNumber1"
          required
          rules={[
            { required: true, message: '请输入电话号码' },
            { pattern: /^\d+$/, message: '请输入数字' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="电话号码（选填）"
          name="phoneNumber2"
          rules={[{ pattern: /^\d+$/, message: '请输入数字' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout} style={{ marginTop: '20px' }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  patient,
  loading,
}: {
  patient: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    patientInfo: patient.patientInfo,
    patientInfoLoading: loading.effects['patient/fetchPatient'],
  };
};

export default connect(mapStateToProps)(BaseInfoContent);
