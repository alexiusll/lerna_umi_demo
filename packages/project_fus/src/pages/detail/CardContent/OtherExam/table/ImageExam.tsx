/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Popconfirm,
  Spin,
  Alert,
} from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import moment from 'moment';
import FileTable from '@/components/FileTable';
import type { StateType } from '../model';
import style from '../form/form.less';

interface ImageExamContentProps {
  dispatch: Dispatch;
  imageExam?: any;
  imageExamLoading: boolean;
  pid: number;
  treNum: number;
}

const exam_method_ops = [
  { value: 'CT' },
  { value: '增强CT' },
  { value: 'MRI' },
  { value: '增强MRI' },
  { value: 'X线' },
  { value: 'B超' },
  { value: '骨扫描' },
  { value: 'PET-CT' },
  { value: '其他' },
];

const ImageExamContent: React.FC<ImageExamContentProps> = (props) => {
  const { pid, treNum, dispatch, imageExam, imageExamLoading } = props;
  const [data, setData] = useState(imageExam);

  let tmpData = data;

  useEffect(() => {
    dispatch({
      type: 'otherExam/fetchImageExam',
      payload: { pid, treNum },
    });
    // 销毁的时候
    return () => {};
  }, [pid]);

  useEffect(() => {
    if (imageExam) {
      setData(imageExam);
      tmpData = imageExam;
      for (let i = 0; i < tmpData.length; i += 1) {
        tmpData[i].detectTime = tmpData[i].detectTime ? moment(tmpData[i].detectTime) : undefined;
      }
    }
  }, [imageExam]);

  const newMember = () => {
    const newData = data?.map((item: any) => ({ ...item })) || [];
    newData.push({
      examArea: null,
      examMethod: null,
      detectTime: null,
      tumorLD: null,
      tumorSD: null,
      tumorDesc: null,
      path: null,
    });
    if (newData) {
      for (let i = 0; i < newData.length; i += 1) {
        newData[i].detectTime = newData[i].detectTime
          ? newData[i].detectTime.format('YYYY-MM-DD')
          : undefined;
      }
    }
    dispatch({
      type: 'otherExam/modifyImageExam',
      payload: { pid, treNum, body: { data: newData } },
    });
  };

  const remove = (key: any) => {
    const ids = [key];
    dispatch({
      type: 'otherExam/deleteImageExam',
      payload: { pid, treNum, body: { ids } },
    });
  };

  const ImageExamCol = (colProps: { colData: any }) => {
    const { colData } = colProps;
    const [form] = Form.useForm();
    const [id, setId] = useState(undefined);

    useEffect(() => {
      if (colData) {
        form.setFieldsValue({
          ...colData,
          detectTime: colData.detectTime ? moment(colData.detectTime) : null,
        });
        if (colData.id) {
          setId(colData.id);
        }
      } else {
        form.resetFields();
      }
    }, [colData]);

    const confirm = () => {
      remove(colData.id);
    };

    const onFieldsChange = (e: any, allValues: [{ name: any; value: any }]) => {
      const newColData = { id: undefined };
      for (let i = 0; i < allValues.length; i += 1) {
        newColData[allValues[i].name[0]] = allValues[i].value;
      }
      if (colData.id) {
        newColData.id = colData.id;
      }
      // console.log(newColData)
      tmpData = tmpData.map((item: any) => {
        return item.id === newColData.id ? newColData : item;
      });
    };

    return (
      <Form
        form={form}
        onFieldsChange={(e, all: any) => {
          onFieldsChange(e, all);
        }}
      >
        <table className={style.row}>
          <tbody>
            <tr style={{ minHeight: '3rem' }}>
              <td style={{ width: '15%' }} className={style.grid}>
                <Form.Item name="examArea">
                  <Input style={{ width: '90%', marginTop: '12%' }} placeholder="请输入检查部位" />
                </Form.Item>
              </td>

              <td style={{ width: '15%' }} className={style.grid}>
                <Form.Item name="photoNumber">
                  <Input style={{ width: '90%', marginTop: '12%' }} placeholder="请输入影像号" />
                </Form.Item>
              </td>

              <td style={{ width: '15%' }} className={style.grid}>
                <Form.Item name="exmaMethod">
                  <Select
                    style={{ width: '90%', marginTop: '12%' }}
                    options={exam_method_ops}
                    placeholder="请选择检查方法"
                  />
                </Form.Item>
              </td>
              <td style={{ width: '10%' }} className={style.grid}>
                <Form.Item name="detectTime">
                  <DatePicker style={{ marginTop: '12%', width: '120px' }} />
                </Form.Item>
              </td>
              <td style={{ width: '15%' }} className={style.grid}>
                <Form.Item
                  name="tumorLD"
                  label="长径:"
                  labelCol={{ span: 8, offset: 1 }}
                  wrapperCol={{ span: 12 }}
                  style={{ marginTop: '12%' }}
                >
                  <InputNumber
                    formatter={(value) => `${value}cm`}
                    parser={(value) => value.replace('cm', '')}
                  />
                </Form.Item>
                <Form.Item
                  name="tumorSD"
                  label="短径:"
                  labelCol={{ span: 8, offset: 1 }}
                  wrapperCol={{ span: 12 }}
                >
                  <InputNumber
                    formatter={(value) => `${value}cm`}
                    parser={(value) => value.replace('cm', '')}
                  />
                </Form.Item>
              </td>
              <td style={{ width: '15%' }} className={style.grid}>
                <Form.Item name="tumorDesc">
                  <Input.TextArea rows={2} style={{ width: '94%', marginTop: '12%' }} />
                </Form.Item>
              </td>
              <td style={{ width: '10%' }} className={style.grid}>
                <FileTable pid={pid} folder="image_exams" id={id} />
              </td>
              <td style={{ width: '5%' }} className={style.grid}>
                <Popconfirm
                  title="确认删除?"
                  onConfirm={confirm}
                  // onCancel={cancel}
                  okText="确认"
                  cancelText="取消"
                >
                  <a href="#">删除</a>
                </Popconfirm>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    );
  };

  const save = () => {
    if (tmpData) {
      for (let i = 0; i < tmpData.length; i += 1) {
        tmpData[i].detectTime = tmpData[i].detectTime
          ? tmpData[i].detectTime.format('YYYY-MM-DD')
          : undefined;
      }
    }

    dispatch({
      type: 'otherExam/modifyImageExam',
      payload: { pid, treNum, body: { data: tmpData } },
    });
  };

  return (
    <Spin spinning={imageExamLoading}>
      <div style={{ float: 'left', marginBottom: 0, height: 50 }}>
        <Button type="primary" onClick={newMember}>
          添加
        </Button>
        <Alert
          message="注意添加下一条之前先保存上一条。"
          type="info"
          showIcon
          style={{ marginLeft: 100, marginTop: -35 }}
        />
      </div>
      <table
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          border: '1px solid #dfe6e9',
          marginTop: 20,
        }}
      >
        <tbody>
          <tr style={{ height: '47px', backgroundColor: '#BCE7F2' }}>
            <th style={{ width: '15%' }} className={style.tHead}>
              检查部位
            </th>
            <th style={{ width: '15%' }} className={style.tHead}>
              影像号
            </th>
            <th style={{ width: '15%' }} className={style.tHead}>
              检查方法
            </th>
            <th style={{ width: '10%' }} className={style.tHead}>
              日期
            </th>
            <th style={{ width: '15%' }} className={style.tHead}>
              肿瘤大小
            </th>
            <th style={{ width: '15%' }} className={style.tHead}>
              肿瘤描述
            </th>
            <th style={{ width: '15%' }} className={style.tHead}>
              操作
            </th>
          </tr>
        </tbody>
      </table>
      <div>
        {data?.map((item: any) => {
          return item !== undefined ? <ImageExamCol colData={item} /> : null;
        })}
      </div>
      <Button
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => {
          save();
        }}
      >
        保存
      </Button>
    </Spin>
  );
};

const mapStateToProps = ({
  otherExam,
  loading,
}: {
  otherExam: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  // console.log(otherExam);
  return {
    imageExam: otherExam.imageExam,
    imageExamLoading: loading.effects['otherExam/fetchImageExam'],
  };
};

export default connect(mapStateToProps)(ImageExamContent);
