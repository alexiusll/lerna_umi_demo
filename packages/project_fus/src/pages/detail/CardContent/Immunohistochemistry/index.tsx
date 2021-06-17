/* eslint-disable no-console */
/*
 * @Descripttion:
 * @Author: hlgdb
 * @Date: 2020-09-19 13:02:22
 */

import React, { useEffect, useState } from 'react';
import { Form, Radio, Input, Button, Spin, InputNumber, DatePicker } from 'antd';
import { connect, Dispatch } from 'umi';
import FileTable from '@/components/FileTable';
import { StateType } from './model';
import moment from 'moment';

interface ImmunohistochemistryContentProps {
  dispatch: Dispatch;
  pid: number;
  treNum: number;
  immunohisInfo?: any;
  immunohisInfoLoading: boolean;
}

const { TextArea } = Input;

const immunohistochemistry_labels = [
  'TTF1',
  'NapsinA',
  'CK7',
  'P40',
  'P63',
  'CD516', // 新增，录入方式设置为与上面这些指标一样
  'Syn',
  'CgA',
  'CD56',
  'Ki-67',

  'ALKD5F3',
  'ALKD5F3N',
  'CAIX',
  'CAM52',
  'CD10',
  'CD34',
  'CD117',
  'CDX2',
  'CEA',
  'CK',
  'CK56',
  'CK818',
  'CK19',
  'CK20',
  'Cyn',
  'DLL3',
  'EMA',
  'ERCC1',
  'LCA',
  'MCM2',
  'P16',
  'p53',
  'PAX2',
  'PAX8',
  'PCK',
  'PDL1',
  'RRM1',
  'SATB2',
  'VEGFC',
  'Villin',
  'Villinco',
];

const ImmunohistochemistryContent: React.FC<ImmunohistochemistryContentProps> = (props) => {
  const { pid, treNum, dispatch, immunohisInfo, immunohisInfoLoading } = props;
  const [form] = Form.useForm();
  const [formId, setFormId] = useState(undefined);

  useEffect(() => {
    if (pid !== -404) {
      dispatch({
        type: 'immunohis/fetchImmunohis',
        payload: { pid, treNum },
      });
    }
    // 销毁的时候
    return () => {};
  }, [pid, treNum]);

  useEffect(() => {
    console.log('immunohisInfo', immunohisInfo);
    if (immunohisInfo) {
      if (immunohisInfo.id !== -404) {
        form.setFieldsValue({
          ...immunohisInfo,
          detectTime: immunohisInfo.detectTime ? moment(immunohisInfo.detectTime) : null,
        });
        if (immunohisInfo.id >= 0) {
          setFormId(immunohisInfo.id);
        }
      } else {
        form.resetFields();
        dispatch({
          type: 'immunohis/modifyImmunohis',
          payload: {
            pid,
            treNum,
            body: {},
          },
        });
      }
    }
  }, [immunohisInfo, pid, treNum]);

  const onFinish = (values: any) => {
    if (immunohisInfo) {
      values.id = immunohisInfo.id;
    }

    values.detectTime = values.detectTime ? values.detectTime.format('YYYY-MM-DD') : null;

    dispatch({
      type: 'immunohis/modifyImmunohis',
      payload: {
        pid,
        treNum,
        body: values,
      },
    });
  };

  return (
    <Spin spinning={immunohisInfoLoading}>
      <Form
        form={form}
        name="immunohistochemistry"
        labelAlign="left"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 8 }}
        onFinish={(values) => {
          onFinish(values);
        }}
      >
        {immunohistochemistry_labels.map((item) => {
          if (item === 'Ki-67') {
            return (
              <Form.Item label="Ki67(%)" name="Ki67">
                <InputNumber
                  placeholder="请输入数字"
                  style={{ maxWidth: '320px', width: '100%' }}
                  formatter={(value) => `${value}%`}
                />
              </Form.Item>
            );
          }
          return (
            <Form.Item label={item} name={item} key={item}>
              <Radio.Group>
                <Radio value={0}>无</Radio>
                <Radio value={1}>-</Radio>
                <Radio value={2}>±</Radio>
                <Radio value={3}>+</Radio>
                <Radio value={4}>++</Radio>
                <Radio value={5}>+++</Radio>
              </Radio.Group>
            </Form.Item>
          );
        })}
        <Form.Item label="其他" name="other">
          <TextArea placeholder="请输入其他" rows={4} />
        </Form.Item>

        <Form.Item label="检测时间" name="detectTime">
          <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
        </Form.Item>

        <Form.Item label="病理号" name="patNum">
          <Input style={{ width: '240px' }} />
        </Form.Item>

        <Form.Item label="文件管理">
          <FileTable pid={pid} folder="immunohis" id={formId} />
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
  immunohis,
  loading,
}: {
  immunohis: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  // console.log("immunohis", immunohis);
  return {
    immunohisInfo: immunohis.immunohis,
    immunohisInfoLoading: loading.effects['immunohis/fetchImmunohis'],
  };
};

export default connect(mapStateToProps)(ImmunohistochemistryContent);
