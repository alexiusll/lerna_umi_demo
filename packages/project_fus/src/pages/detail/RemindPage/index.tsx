/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2020-10-01 12:44:04
 */
import { getPid } from '@/utils/location';
import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form } from 'antd';
import { Dispatch, connect } from 'umi';
import moment from 'moment';

import { StateType } from '../CardContent/BaseInfo/model';

interface RemindProps {
  dispatch: Dispatch;
  patientInfo: any;
  patientInfoLoading: boolean;
  location: any;
}

const RemindPage: React.FC<RemindProps> = (props) => {
  const { dispatch, patientInfo, patientInfoLoading } = props;
  const [pid, setPid] = useState<number>(-404);
  const [form] = Form.useForm();

  useEffect(() => {
    if (patientInfo) {
      form.setFieldsValue({
        ...patientInfo,
        nextFollowupTime: patientInfo.nextFollowupTime
          ? moment(patientInfo.nextFollowupTime)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [patientInfo]);

  useEffect(() => {
    if (pid !== -404) {
      dispatch({
        type: 'patient/fetchPatient',
        payload: { pid },
      });
    }
  }, [pid]);

  // 地址发生变化时触发
  useEffect(() => {
    setPid(getPid());
  }, [props.location]);

  const onFinsh = (values: any) => {
    // console.log(values);
    values.nextFollowupTime = values.nextFollowupTime
      ? values.nextFollowupTime.format('YYYY-MM-DD')
      : undefined;
    dispatch({
      type: 'follInfo/modifyRemind',
      payload: {
        pid,
        body: values,
      },
    }).then(() => {
      dispatch({
        type: 'patient/fetchPatient',
        payload: { pid },
      });
    });
  };

  return (
    <>
      <Form name="remind" style={{ marginLeft: 30 }} onFinish={onFinsh} form={form}>
        <Form.Item name="nextFollowupTime" label="计划下次随访时间">
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            确认
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = ({ follInfo, patient, loading }: { follInfo: any; patient: StateType }) => {
  // console.log(follInfo)
  return {
    // follInfo: follInfo.foll_info,
    patientInfo: patient.patientInfo,
    patientInfoLoading: loading.effects['patient/fetchPatient'],
  };
};

export default connect(mapStateToProps)(RemindPage);
