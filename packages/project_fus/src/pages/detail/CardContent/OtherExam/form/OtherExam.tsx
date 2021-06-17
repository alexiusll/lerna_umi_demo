/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Spin } from 'antd';
import { connect, Dispatch } from 'umi';
import FileTable from '@/components/FileTable';
import moment from 'moment';
import { StateType } from '../model';
import style from './form.less';

interface OtherExamsContentProps {
  dispatch: Dispatch;
  otherExam?: any;
  otherExamLoading: boolean;
  pid: number;
  treNum: number;
}

const { TextArea } = Input;

const OtherExamsContent: React.FC<OtherExamsContentProps> = (props) => {
  const { pid, treNum, otherExam, otherExamLoading, dispatch } = props;
  const [form] = Form.useForm();
  const [id, setId] = useState(undefined);

  useEffect(() => {
    dispatch({
      type: 'otherExam/fetchOtherExam',
      payload: { pid, treNum },
    });
    // 销毁的时候
    return () => {};
  }, [pid]);

  useEffect(() => {
    console.log('otherExam', otherExam);
    if (otherExam) {
      if (otherExam.id !== -404) {
        form.setFieldsValue({
          ...otherExam,
          ECGDetTime: otherExam.ECGDetTime ? moment(otherExam.ECGDetTime) : null,
          UCGDetTime: otherExam.UCGDetTime ? moment(otherExam.UCGDetTime) : null,
        });
        if (otherExam.id >= 0) {
          setId(otherExam.id);
        }
      } else {
        form.resetFields();
        dispatch({
          type: 'otherExam/modifyOtherExam',
          payload: { pid, treNum, body: {} },
        });
      }
    }
  }, [otherExam]);

  const onFinish = (values: any) => {
    if (otherExam) {
      values.id = otherExam.id;
    }
    values.ECGDetTime = values.ECGDetTime ? values.ECGDetTime.format('YYYY-MM-DD') : null;
    values.UCGDetTime = values.UCGDetTime ? values.UCGDetTime.format('YYYY-MM-DD') : null;
    dispatch({
      type: 'otherExam/modifyOtherExam',
      payload: { pid, treNum, body: values },
    });
  };

  return (
    <Spin spinning={otherExamLoading}>
      <table
        style={{ width: '100%', height: '100%', textAlign: 'center', border: '1px solid #dfe6e9' }}
      >
        <tbody>
          <tr style={{ height: '47px', backgroundColor: '#BCE7F2' }}>
            <th style={{ width: '16.6%' }}>项目</th>
            <th style={{ width: '16.7%' }}>日期</th>
            <th style={{ width: '33.3%' }}>结果描述</th>
            <th style={{ width: '16.7%' }}>操作</th>
          </tr>
        </tbody>
      </table>
      <Form
        form={form}
        name="OtherExams"
        wrapperCol={{
          span: 24,
        }}
        onFinish={(values) => {
          onFinish(values);
        }}
      >
        <table className={style.row}>
          <tbody>
            <tr style={{ minHeight: '3rem' }}>
              <td style={{ width: '16.6%' }} className={style.grid}>
                12导联心电图
              </td>
              <td style={{ width: '16.7%' }} className={style.grid}>
                <Form.Item name="ECGDetTime" style={{ marginTop: '9%' }}>
                  <DatePicker />
                </Form.Item>
              </td>

              <td style={{ width: '33.3%' }} className={style.grid}>
                <Form.Item name="ECGDesc" style={{ marginTop: '5%' }}>
                  <TextArea style={{ width: '98%' }} />
                </Form.Item>
              </td>
              <td style={{ width: '16.7%' }} className={style.grid}>
                <FileTable pid={pid} folder="12_lead_ecg" id={id} />
              </td>
            </tr>
          </tbody>
        </table>
        <table className={style.row}>
          <tbody>
            <tr style={{ minHeight: '3rem' }}>
              <td style={{ width: '16.6%' }} className={style.grid}>
                超声心动图
              </td>
              <td style={{ width: '16.7%' }} className={style.grid}>
                <Form.Item name="UCGDetTime" style={{ marginTop: '9%' }}>
                  <DatePicker />
                </Form.Item>
              </td>

              <td style={{ width: '33.3%' }} className={style.grid}>
                <Form.Item name="UCGDesc" style={{ marginTop: '5%' }}>
                  <TextArea style={{ width: '98%' }} />
                </Form.Item>
              </td>
              <td style={{ width: '16.7%' }} className={style.grid}>
                <FileTable pid={pid} folder="UCG" id={id} />
              </td>
            </tr>
          </tbody>
        </table>

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  otherExam,
  loading,
}: {
  otherExam: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  console.log(otherExam);
  return {
    otherExam: otherExam.otherExam,
    otherExamLoading: loading.effects['otherExam/fetchOtherExam'],
  };
};

export default connect(mapStateToProps)(OtherExamsContent);
