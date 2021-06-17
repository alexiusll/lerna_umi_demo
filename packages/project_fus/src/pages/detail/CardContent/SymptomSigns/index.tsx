/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Radio, Popconfirm, Spin, Alert } from 'antd';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { StateType } from './model';
import style from '../OtherExam/form/form.less';

interface SymptomSignsContentProps {
  dispatch: Dispatch;
  treatmentInfo?: any;
  treatmentInfoLoading: boolean;
  pid: number;
  treNum: number;
}

const SymptomSignsContent: React.FC<SymptomSignsContentProps> = (props) => {
  const { pid, treNum, dispatch, treatmentInfo, treatmentInfoLoading } = props;
  const [data, setData] = useState(treatmentInfo);

  let tmpData = data;

  useEffect(() => {
    dispatch({
      type: 'treatmentInfo/fetchTreatmentInfo',
      payload: { pid, treNum },
    });
    // 销毁的时候
    return () => {};
  }, [pid]);

  useEffect(() => {
    if (treatmentInfo) {
      const _treatmentInfo = treatmentInfo;
      for (let i = 0; i < _treatmentInfo.length; i += 1) {
        _treatmentInfo[i].key = i + 1;
      }
      setData(_treatmentInfo);
      tmpData = treatmentInfo;
      for (let i = 0; i < tmpData.length; i += 1) {
        tmpData[i].begDate = tmpData[i].begDate ? moment(tmpData[i].begDate) : null;
        tmpData[i].endDate = tmpData[i].endDate ? moment(tmpData[i].endDate) : null;
      }
    }
  }, [treatmentInfo]);

  const newMember = () => {
    const newData = data?.map((item: any) => ({ ...item })) || [];
    newData.push({
      symName: null,
      begDate: null,
      isExe: null,
      endDate: null,
    });
    for (let i = 0; i < newData.length; i += 1) {
      newData[i].begDate = newData[i].begDate ? newData[i].begDate.format('YYYY-MM-DD') : null;
      newData[i].endDate = newData[i].endDate ? newData[i].endDate.format('YYYY-MM-DD') : null;
    }
    // console.log(newData);
    dispatch({
      type: 'treatmentInfo/modifyTreatmentInfo',
      payload: { pid, treNum, body: { data: newData } },
    });
  };

  const remove = (key: any) => {
    dispatch({
      type: 'treatmentInfo/deleteTreatmentInfo',
      payload: { pid, treNum, sign_id: key },
    });
  };

  const SymptomSignsCol = (colProps: { colData: any }) => {
    const { colData } = colProps;
    const [form] = Form.useForm();
    const [endUse, setEndUse] = useState(colData.isExe);

    useEffect(() => {
      if (colData) {
        form.setFieldsValue({
          ...colData,
          begDate: colData.begDate ? moment(colData.begDate) : null,
          endDate: colData.endDate ? moment(colData.endDate) : null,
        });
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
              <td style={{ width: '6.6%' }} className={style.grid}>
                {colData.key}
              </td>
              <td style={{ width: '18.7%' }} className={style.grid}>
                <Form.Item name="symName" style={{ marginBottom: 0 }}>
                  <Input style={{ width: '92%' }} maxLength={1000} />
                </Form.Item>
              </td>
              <td style={{ width: '18.7%' }} className={style.grid}>
                <Form.Item name="begDate" style={{ marginBottom: 0 }}>
                  <DatePicker />
                </Form.Item>
              </td>
              <td style={{ width: '18.6%' }} className={style.grid}>
                <Form.Item name="isExe" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    onChange={(e: any) => {
                      setEndUse(e.target.value);
                    }}
                  >
                    <Radio value={0}>否</Radio>
                    <Radio value={1}>是</Radio>
                  </Radio.Group>
                </Form.Item>
              </td>
              <td style={{ width: '18.6%' }} className={style.grid}>
                <Form.Item name="endDate" style={{ marginBottom: 0 }}>
                  <DatePicker disabled={endUse} />
                </Form.Item>
              </td>
              <td style={{ width: '18.7%' }} className={style.grid}>
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
        tmpData[i].begDate = tmpData[i].begDate
          ? tmpData[i].begDate.format('YYYY-MM-DD')
          : undefined;
        tmpData[i].endDate = tmpData[i].endDate
          ? tmpData[i].endDate.format('YYYY-MM-DD')
          : undefined;
      }
    }
    console.log(tmpData);
    dispatch({
      type: 'treatmentInfo/modifyTreatmentInfo',
      payload: { pid, treNum, body: { data: tmpData } },
    });
  };

  return (
    <Spin spinning={treatmentInfoLoading}>
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
            <th style={{ width: '6.6%' }} className={style.tHead}>
              序号
            </th>
            <th style={{ width: '18.7%' }} className={style.tHead}>
              症状描述
            </th>
            <th style={{ width: '18.7%' }} className={style.tHead}>
              开始日期
            </th>
            <th style={{ width: '18.6%' }} className={style.tHead}>
              目前是否存在
            </th>
            <th style={{ width: '18.6%' }} className={style.tHead}>
              结束日期
            </th>
            <th style={{ width: '18.7%' }} className={style.tHead}>
              常用操作
            </th>
          </tr>
        </tbody>
      </table>
      <div>
        {data?.map((item: any) => {
          // console.log(item.key);
          return item !== undefined ? <SymptomSignsCol colData={item} /> : null;
        })}
        <Button type="primary" style={{ marginTop: 20 }} onClick={save}>
          保存
        </Button>
      </div>
    </Spin>
  );
};

const mapStateToProps = ({
  treatmentInfo,
  loading,
}: {
  treatmentInfo: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  // console.log(treatmentInfo)
  return {
    treatmentInfo: treatmentInfo.treatment_info,
    treatmentInfoLoading: loading.effects['treatmentInfo/fetchTreatmentInfo'],
  };
};

export default connect(mapStateToProps)(SymptomSignsContent);
